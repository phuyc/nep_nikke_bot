const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Database = require("better-sqlite3");
const { randomColor } = require("../functions/randomColor");
const db = Database("./nikke.db");

function createList(type, rarity) {
    let characters = db.prepare(`SELECT name FROM ${type} WHERE rarity=? ORDER BY rarity, name;`);
    let field = '';
    for (let character of characters.iterate(rarity)) {
        field += character.name + ', ';
    }
    return field.slice(0, -2);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Returns a list of your choice')
        .addStringOption(option => 
            option.setName('type')
                .setDescription('Choose which kind of list')
                .setRequired(true)
                .addChoices(
                    { name: 'Character', value: 'characters' },
                    { name: 'Skin', value: 'skins' },
                )),
        /* // TODO add order
        .addStringOption(option => 
            option.setName('filter')
                .setDescription('Filter the list')
                .addChoices(
                    { name: 'SR', value: 'SR'},
                    { name: 'SSR', value: 'SSR' },
                    { name: 'Burst Type I', value: 'Burst Type I'}
                    { name: 'Burst Type II', value: 'Burst Type II'}
                    { name: 'Burst Type III', value: 'Burst Type III'}
                    ))
        */
    execute(interaction) {
        // TODO: handle list
        const type = interaction.options.getString('type');
        if (type === 'skins') {
            interaction.editReply({ content: 'This command is not available at the moment.', ephemeral: true });
            return;
        }

        // List embed
        let list = new EmbedBuilder()
            .setTitle(`${type.charAt(0).toUpperCase() + type.slice(1, -1)} list`)
            .setColor(randomColor())
            .setThumbnail('https://i.pinimg.com/originals/89/9a/1d/899a1d0225823422518cdb38a81bd290.png')
            .setTimestamp()
            .setFooter({ text: 'nepnep#1358', iconURL: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/BE/nl/19/EP0031-CUSA03124_00-AV00000000000037/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000' })
        

        // Create field for each rarity
        let rarities = db.prepare(`SELECT DISTINCT rarity FROM ${type} ORDER BY rarity;`);
        for (let rarity of rarities.iterate()) {
            let field = createList(type, rarity.rarity);
            list.addFields({ name: `[${rarity.rarity}]`, value: field });
        }

        interaction.editReply({ embeds: [list] });
    }
}