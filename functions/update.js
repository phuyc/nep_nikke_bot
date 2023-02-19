const fetch = require("node-fetch");
const fs = require('fs')
const Database = require("better-sqlite3");
const db = new Database("./nikke.db");

async function autoUpdate() {
    // Employees
    const CurrentChar = db.prepare("SELECT name FROM characters;").all();

    let characters = await fetch("https://www.prydwen.gg/page-data/nikke/characters/page-data.json");
    let json2 = await characters.json();
    json2 = json2.result.data.allCharacters.nodes;

    for (let i = 0; i < json2.length; i++) {
        // Add character to db
        if (!CurrentChar.some(char => char.name === json2[i].name)) {

            // Prepare SQL
            let update = db.prepare("INSERT OR IGNORE INTO characters (name, slug, rarity, hideSkills) VALUES (?, ?, ?, ?);");
            
            // Download image
            let cardImage = await fetch(`https://www.prydwen.gg/page-data/nikke/characters/${json2[i].slug}/page-data.json`);
            let cardJson = await cardImage.json();
            cardJson = cardJson.result.data.currentUnit.nodes[0];

            let hideSkills = cardJson.hideSkills ? 'true' : null;

            // Add to DB
            update.run(json2[i].name, json2[i].slug, json2[i].rarity, hideSkills);
            
            let res = await fetch(`https://www.prydwen.gg${cardJson.cardImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src}`);
	        res.body.pipe(fs.createWriteStream(`./images/${json2[i].name}.png`));

            // TODO: Create full Image
        }

        // Update hideSkills 
        CurrentChar.filter(char => char.hideSkills).forEach(async char => {
            let hs = await fetch(`https://www.prydwen.gg/page-data/nikke/characters/${char.slug}/page-data.json`);
            let hsJson = await hs.json();
            let check = hsJson.result.data.currentUnit.nodes[0].hideSkills;

            if (!check) db.prepare("UPDATE characters SET hideSkills=? WHERE name=?;").run(null, json2[i].name);
        })
    }
}

(async () => { await autoUpdate() })();
module.exports = { autoUpdate }