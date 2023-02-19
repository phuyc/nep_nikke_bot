const fetch = require("node-fetch");
const fs = require('fs')
const Database = require("better-sqlite3");
const db = new Database("./nikke.db");

async function autoUpdate() {
    // Employees
    const CurrentChar = db.prepare("SELECT name FROM characters;").all();
    console.log(CurrentChar);

    let characters = await fetch("https://www.prydwen.gg/page-data/nikke/characters/page-data.json");
    let json2 = await characters.json();
    json2 = json2.result.data.allCharacters.nodes;

    for (let i = 0; i < json2.length; i++) {
        if (!CurrentChar.some(char => char.name === json2[i].name)) {

            // Add to DB
            db.prepare("INSERT OR IGNORE INTO characters (name, slug, rarity) VALUES (?, ?, ?);").run(json2[i].name, json2[i].slug, json2[i].rarity);
            
            // Download image
            let cardImage = await fetch(`https://www.prydwen.gg/page-data/nikke/characters/${json2[i].slug}/page-data.json`);
            let cardJson = await cardImage.json();
            cardJson = cardJson.result.data.currentUnit.nodes[0].cardImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src;
            let res = await fetch(`https://www.prydwen.gg${cardJson}`);
	        res.body.pipe(fs.createWriteStream(`./images/${json2[i].name}.png`));

            // TODO: Create full Image
        }
    }
}

(async () => { await autoUpdate() })();
module.exports = { autoUpdate }