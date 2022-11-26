const { Events, PermissionsBitField } = require('discord.js');
const Mutex = require('async-mutex').Mutex;
const Database = require("better-sqlite3");
const { timeout } = require('../commands/nikke');
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
        if (!interaction.isButton()) return;
        if (![PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.UseExternalEmojis]) {
            await interaction.reply("nep does not have permission to send messages here.");
            return;
        }

        await mutex.runExclusive(async () => {
            if (['1', '2', '3'].includes(interaction.customId)) {
                    let messages = interaction.message.content.match(/^(.*)$/gm);
                    let type = messages[0].slice(17, -1).trim();
    
                    // Get the part that matters
                    let name = messages[interaction.customId].slice(3);
                    
                    // Delete
                    if (!interaction.message.deletable) {
                        await interaction.reply({ content: 'Nep does not have permission to delete this ', ephemeral: true });
                        return;
                    }
                        clearTimeout(timeout[interaction.message.id]);
                        delete timeout[interaction.message.id];
                        interaction.message.delete();

                    let embed = {};
    
                    // Get slug and type
                    let slug = getSlug(name, type);
                    if (type === 'character') {
                        embed = await createCharacterSkillEmbed(slug['slug']);
                    } else if (type == 'skin') {
                        embed = await createSkinEmbed(slug['slug']);
                    }
    
                    // Send embed
                    interaction.channel ? await interaction.channel.send({ embeds: [embed] }) : await interaction.reply({ embeds: [embed]});
            }
        }).catch()
	},
};