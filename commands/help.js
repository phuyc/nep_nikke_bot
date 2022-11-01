const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");
const { randomColor } = require("../functions/randomColor");

const help = new EmbedBuilder()
.setTitle('List of commands')
.setDescription('/help')
.setThumbnail('https://img-10.stickers.cloud/packs/977bc206-85d3-4882-bd71-a8ab12956a4e/webp/c8bf8419-c2e4-4810-ab71-862dfb67614e.webp')
.addFields(
    { name: '/character', value: 'Looks up an character\'s profile **Example: /character volume**.' },
    { name: '/skin (coming soon)', value: 'Displays character\'s skin (default excluded).' },
    { name: '/list (coming soon)', value: 'Displays lists of characters or skins.'},
    { name: '/ping', value: 'Return latency.' },
    { name: ' /help', value: 'Displays this message' },
    { name: ' /info', value: 'Displays bot info.\n[Source](https://www.pixiv.net/en/artworks/97233960)' }
)
.setImage('https://preview.redd.it/a7nuvufkx4w81.jpg?auto=webp&s=dd2a125315afd3f03d4fd38b1e54b0782990fae1')
.setTimestamp()
.setFooter({ text: 'nepnep#1358', iconURL: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/BE/nl/19/EP0031-CUSA03124_00-AV00000000000037/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000' });


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays list of commands'),
    async execute(interaction) {
        await interaction.reply({ embeds: [help.setColor(randomColor())] });
    }
}