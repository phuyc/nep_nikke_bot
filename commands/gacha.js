const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const sharp = require('sharp');
const Database = require("better-sqlite3");
const db = Database("./nikke.db");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gacha')
        .setDescription('Simulate a 10-pull on the standard banner'),
    async execute(interaction) {

        // Gacha
        let results = gacha();
        
        // Declare the array of images to composite
        const images = [];
        
        // Get a random nikke from the database for each result that has the matching rarity returned by gacha
        for (let i = 0; i < results.length; i++) {

            let name = db.prepare('SELECT name FROM characters WHERE rarity=? ORDER BY RANDOM() LIMIT 1').get(results[i]);
        
            // Throw Error if can't find any character in the database
            if (!name) throw new Error('Character not in the database.');
            
            // Push images to array
            images.push(

                // Card Background
                {
                    input: `./images/white.png`,
                    top: 150 + (410 * Math.floor(i / 5)),
                    left: 461 + 168 * (i % 5),
                },           
                
                // Top
                {
                    input:`./images/${results[i]}_top.png`,
                    top: TOP[results[i]] + (410 * Math.floor(i / 5)),
                    left: 461 + 168 * (i % 5),
                },
        
                // Card
                {
                    input: `./images/${name.name}.png`,
                    top: 150 + (410 * Math.floor(i / 5)),
                    left: 461 + 168 * (i % 5),
                },           
        
                // Bottom
                {
                    input: `./images/${results[i]}_bottom.png`,
                    top: 350 + (410 * Math.floor(i / 5)),
                    left: 461 + 168 * (i % 5),
                },
            )
        };
        
        // Composite the images into bg.png and return gacha.png
        await sharp("./images/bg.png")
            .composite(images)
            .toFile('gacha.png');
        
        const file = new AttachmentBuilder('./gacha.png');

        // Send the image
        await interaction.editReply({ files: [file] });
    }
}


// Helpers
function gacha() {

    let rng;
    const results = [];

    for (let i = 0; i < 10; i++) {
        if (i == 9 && !results.includes('SR')) {
            results.push('SR');
            break;
        } 

        rng = Math.floor(Math.random() * 100);

        // R
        if (rng >= 0 && rng < rarities['R']) results.push('R');

        // SR
        if (rng >= rarities['R'] && rng < rarities['SR']) results.push('SR');

        // SSR
        if (rng >= rarities['SR'] && rng < rarities['SSR']) results.push('SSR');
    }

    return results;
}

const rarities = {
    R: 53,
    SR: 96,
    SSR: 100,
}

const TOP = {
    R: 66,
    SR: 33,
    SSR: 40,
};