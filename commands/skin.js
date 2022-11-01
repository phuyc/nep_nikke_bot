const { SlashCommandBuilder } = require("discord.js");
const { createSkinEmbed } = require("../functions/createSkinEmbed");
const { suggestMessage } = require("../functions/suggest");
const { timeout } = require("./character");

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
                // Send suggestion and reply with returned values
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
    }
}