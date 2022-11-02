const { Events } = require('discord.js');
const Mutex = require('async-mutex').Mutex;
const Database = require("better-sqlite3");
const { timeout } = require('../commands/character');
const { createCharacterSkillEmbed } = require('../functions/createCharacterSkillEmbed');
const { createSkinEmbed } = require('../functions/createSkinEmbed');
const db = Database("./nikke.db");

// Mutex
const mutex = new Mutex();

// Get slug
function getSlug(name, type) {
    // Find slug in DB
    if (type === 'skin') type = 'character';
    let slug = db.prepare(`SELECT slug FROM ${type}s WHERE name=?;`).get(name);
    
    // Return slug if found and the default if not found
    return slug ?? name.trim().replace(" ", "-").toLowerCase();
}

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        await mutex.runExclusive(async () => {
            if (!interaction.isButton()) return;

            if (['1', '2', '3'].includes(interaction.customId)) {
                try {
                    let messages = interaction.message.content.match(/^(.*)$/gm);
                    let type = messages[0].slice(17, -1).trim();
    
                    // Get the part that matters
                    let name = messages[interaction.customId].slice(3);
    
                    // Delete
                    if (timeout[interaction.message.id]) {
                        clearTimeout(timeout[interaction.message.id]);
                        interaction.message.delete();
                        delete timeout[interaction.message.id];
                    }
                    let embed = {};
    
                    // Get slug and type
                    let slug = getSlug(name, type);
                    if (type === 'character') {
                        embed = await createCharacterSkillEmbed(slug['slug']);
                    } else if (type == 'skin') {
                        embed = await createSkinEmbed(slug['slug']);
                    }
    
                    // Send embed
                    interaction.channel.send({ embeds: [embed] });
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while handling this button!', ephemeral: true });
                }

            }
        })
	},
};