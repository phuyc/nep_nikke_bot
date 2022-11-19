const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const { randomColor } = require("./randomColor");


async function createCharacterSkillEmbed(name) {
    const response = await fetch(`https://www.prydwen.gg/page-data/nikke/characters/${name.replace(/ /g, "-")}/page-data.json`);
    
    // Send suggestion if can't find the character
    if (response.status != 200) return false;

    // JSONify
    let json = await response.json();
    json = json.result.data.currentUnit.nodes[0];

    // basic attack's description
    let basicAttack = JSON.parse(json.basicAttack.raw);
    let basicAttackDescription = '';

    for (let i = 0; i < basicAttack.content.length; i++) {
        basicAttackDescription += '\n' + basicAttack.content[i].content[0].value;
    }

    // Create embed
    let profile = new EmbedBuilder()
    .setTitle(`[${json.rarity}] ${json.name}`)
    .setDescription(`[Check out our detailed ratings and reviews](https://www.prydwen.gg/nikke/characters/${name.trim().replace(/ /g, "-").toLowerCase()})`)
    .setThumbnail(`https://prydwen.gg${json.smallImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src}`)
    .setColor(randomColor())
    .setTimestamp()
    .setFooter({ text: 'nepnep#1358', iconURL: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/BE/nl/19/EP0031-CUSA03124_00-AV00000000000037/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000' })
    .addFields(

        // Field 1.1 (Details left)
        { name: 'DETAILS', value: `**Class**: ${CLASSES[json.class] ?? json.class}\n**Weapon**: ${WEAPON[json.weapon] ?? json.weapon}`, inline: true },        
        
        // Field 1.2 (Details right)                            
        { name: '\u200b', value: `**Element**: ${ELEMENTS[json.element] ?? json.element}\n**Burst type**: ${BURSTTYPES[json.burstType] ?? json.burstType}`, inline: true },
        
        // ! Field 2 (Ratings) Temporarily hide pve and pvp ratings                  
        { name: 'RATINGS', value: `**Overall**: ${RATINGS[json.ratings.overall] ?? '?'} **Bugged**: ${RATINGS[json.ratings.bugged] ?? '?'}`}, // + ' ' + `**PVE**: ${RATINGS[json.ratings.pve] ?? '?'}` + ' ' + `**PVP**: ${RATINGS[json.ratings.pvp] ?? '?'}` },

        // Normal Attack
        { name: 'SKILLS', value: `**${SIGHTS[json.weapon] ?? ''}Normal Attack [<:icon_control:1035953548111904768>${json.controlMode}] [<:icon_ammo:1035953602839203942>${json.ammoCapacity} ammo] [<:icon_reload:1035953550150352936> ${json.reloadTime} seconds]:**${basicAttackDescription}`}
    );
    
    // Skills
    for (let i = 0; i < json.skills.length; i++) {
        let skillEmbed = '';
        let skillDescriptionLevel10 = '';
        let skillLevel10;
        // Add skill's type and name
        skillEmbed += `**${SLOTS[json.skills[i].slot] ?? json.skills[i].slot}: ${json.skills[i].name}`;
        
        // Check for cooldown
        if (json.skills[i].cooldown) {
            skillEmbed += ` [${json.skills[i].cooldown} seconds]`;
        };
        
        skillEmbed += '**\n';
        
        // Add skill description 
        skillLevel10 = JSON.parse(json.skills[i].descriptionLevel10.raw);
        // Loop through descripton
        for (let j = 0; j < skillLevel10.content.length; j++) {
            for (let k = 0; k < skillLevel10.content[j].content.length; k++) {
                if (skillLevel10.content[j].content[k].value.length > 5) {
                    skillDescriptionLevel10 += skillLevel10.content[j].content[k].value + '\n';
                } else {
                    skillDescriptionLevel10 += skillLevel10.content[j].content[k].value + ' ';
                }
            }
        }
        
        skillEmbed += skillDescriptionLevel10.trim();
        profile.addFields({ name: '\u200b', value: skillEmbed });
    }

    return profile;
}


module.exports = { createCharacterSkillEmbed };


const RATINGS = {
    "4": "<:F_:1037311733833928704>",
    "5": "<:D_:1024285330217640038>",
    "6": "<:C_:1024285328246313041>",
    "7": "<:B_:1024285326270808094>",
    "8": "<:A_:1024285324345622529>",
    "9": "<:S_:1024285317643108383>",
    "10": "<:SS:1024285320268746762>",
    "11": "<:SSS:1024285322433015858>"
};

const BURSTTYPES = {
    '1': '<:type_1:1035953567883853904> Burst I',
    '2': '<:type_2:1035953569712578562> Burst II',
    '3': '<:type_3:1035953571637776414> Burst III'
};

const WEAPON = {
    'Assault Rifle': '<:weapon_ar:1035953573512630362> Assault Rifle',
    'Minigun': '<:weapon_minigun:1035953575098077206> Minigun',
    'Rocket Launcher': '<:weapon_rocket:1035953576989704272> Rocket Launcher',
    'Shotgun': '<:weapon_shotgun:1035953578675798046> Shotgun',
    'SMG': '<:weapon_smg:1035953580512919682> SMG',
    'Sniper Rifle': '<:weapon_sniper:1035953585495740556> Sniper Rifle'
};

const CLASSES = {
    'Attacker': '<:class_attacker:1035953587597086741> Attacker',
    'Defender': '<:class_defender:1035953589799100496> Defender',
    'Supporter': '<:class_support:1035953591179030590> Supporter'
}

const ELEMENTS = {
    'Electric': '<:element_electric:1035953593745936394> Electric',
    'Fire': '<:element_fire:1035953595671138365> Fire',
    'Iron': '<:element_iron:1035953597583736922> Iron',
    'Water': '<:element_water:1035953599269830666> Water',
    'Wind': '<:element_wind:1035953601006272532> Wind'
}

const SLOTS = {
    'Skill 1': '<:icon_skill1:1035953551937118250> Skill 1',
    'Skill 2': '<:icon_skill2:1035953554285936670> Skill 2',
    'Burst': '<:icon_burst:1035953604378505379> Burst'
}

const SIGHTS = {
    'Assault Rifle': '<:sight_assault:1035953556118847528>',
    'Minigun': '<:sight_minigun:1035953557918191646>',
    'Rocket Launcher': '<:sight_rocket:1035953559692378223>',
    'Shotgun': '<:sight_shotgun:1035953561437220895>',
    'SMG': '<:sight_smg:1035953563215601675>',
    'Sniper Rifle': '<:sight_sniper:1035953565006569533>'
}