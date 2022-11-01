const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const { randomColor } = require("./randomColor");

async function createSkinEmbed(name) {
    // TODO: handle skin
    let response = await fetch(`https://www.prydwen.gg/page-data/nikke/characters/${name.replace(/ /g, "-")}/page-data.json`);

    if (response.status != 200) return false;

    // JSONify
    let json = await response.json();
    json = json.result.data.currentUnit.nodes[0];
    let src = json.fullImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src;

    // Create embed
    let skin = new EmbedBuilder()
        .setTitle(name.charAt(0).toUpperCase() + name.slice(1))
        .setColor(randomColor())
        .setImage(`https://prydwen.gg${src}`)
        .setTimestamp()
        .setFooter({ text: 'nepnep#1358', iconURL: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/BE/nl/19/EP0031-CUSA03124_00-AV00000000000037/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000' });;
    
        return skin
}

module.exports = { createSkinEmbed };