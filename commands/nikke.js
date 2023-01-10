const { SlashCommandBuilder } = require("discord.js");
const { createCharacterSkillEmbed } = require("../functions/createCharacterSkillEmbed");
const { bestMatch } = require('../functions/bestMatch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nikke')
        .setDescription('Displays the information of a nikke')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('name of the character')
                .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name').toLowerCase().trim();
        let profile = await createCharacterSkillEmbed(name);
        if (profile) {
            await interaction.editReply({ embeds: [profile] });
            return;
        } else {
            let match = bestMatch(name, 'character');
            if (match) {
                profile = await createCharacterSkillEmbed(match);
                await interaction.editReply({ embeds: [profile]});
                return;
            } else {
                await interaction.editReply({ content: "Couldn't find the character!", ephemeral: true });
                return;
            }
        }
    }
}