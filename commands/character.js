const { SlashCommandBuilder } = require("discord.js");
const { createCharacterSkillEmbed } = require("../functions/createCharacterSkillEmbed");
const { suggestMessage } = require('../functions/suggest')

const timeout = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('character')
        .setDescription('Displays the information of a character')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('name of the character')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const name = interaction.options.getString('name').toLowerCase().trim();
            let profile = await createCharacterSkillEmbed(name);
    
            if (profile) {
                await interaction.reply({ embeds: [profile] });
            } else {
                let suggestion = suggestMessage(name, 'character');
                await interaction.reply({ 
                    content: suggestion.content,
                    components: [suggestion.actionRow]
                })
    
                let reply = await interaction.fetchReply();
    
                // Delete suggestion after 8 seconds
                timeout[reply.id] = setTimeout(() => {interaction.deleteReply(); delete timeout[reply.id]}, 8000);
            }
        } catch (error) {
            console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

    },
    timeout,
}