const { SlashCommandBuilder } = require("discord.js");
const { createSkinEmbed } = require("../functions/createSkinEmbed");
const { bestMatch } = require("../functions/bestMatch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skin')
        .setDescription("Returns the character's skin (default included)")
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Name of character')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            // Parse + create skin
            const name = interaction.options.getString('name').toLowerCase().trim();
            let embed = await createSkinEmbed(name);
            if (embed) {
                interaction.reply({ embeds: [embed] });
            } else {
                let match = bestMatch(name, 'character');
                if (match) {
                    embed = await createSkinEmbed(match);
                    await interaction.reply({ embeds: [embed]});
                } else {
                    await interaction.reply({ content: "Couldn't find the character!", ephemeral: true });
                    return;
                }
            }
        } catch (error) {
            console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}