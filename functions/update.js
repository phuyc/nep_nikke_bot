const Database = require("better-sqlite3");
const fetch = require("node-fetch");
const db = new Database("./nikke.db");

async function autoUpdate() {
    // Employees
    let characters = await fetch("https://www.prydwen.gg/page-data/nikke/characters/page-data.json");
    let json2 = await characters.json();
    json2 = json2.result.data.allCharacters.nodes;

    for (let i = 0; i < json2.length; i++) {
        db.prepare("INSERT OR IGNORE INTO characters (name, slug, rarity) VALUES (?, ?, ?);").run(json2[i].name, json2[i].slug, json2[i].rarity);
    }
}

autoUpdate()
module.exports = { autoUpdate }