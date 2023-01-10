const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('relic')
        .setDescription('Returns the locations of the lost relics in a chapter')
        .addStringOption(option =>
            option.setName('chapter')
                .setRequired(true)
                .setDescription('Choose the desired chapter')
                .addChoices(
                    { name: 'Chapter 1', value: 'chapter_1' },
                    { name: 'Chapter 2', value: 'chapter_2' },
                    { name: 'Chapter 3', value: 'chapter_3' },
                    { name: 'Chapter 4', value: 'chapter_4' },
                    { name: 'Chapter 5', value: 'chapter_5' },
                    { name: 'Chapter 6', value: 'chapter_6' },
                    { name: 'Chapter 7', value: 'chapter_7' },
                    { name: 'Chapter 8', value: 'chapter_8' },
                    { name: 'Chapter 9', value: 'chapter_9' },
        )),
    execute(interaction) {
        const chapter = interaction.options.getString('chapter').toLowerCase().trim();
        interaction.editReply({ components: [CHAPTERS[chapter]] });
    }
}


const CHAPTERS = {
    "chapter_1": new ActionRowBuilder().addComponents(
        new SelectMenuBuilder().setCustomId('0').setOptions([
                { label: 'Outline for Round 1 of Recruitment', value: '0'},
                { label: 'Outline for Round 2 of Recruitment', value: '1'},
                { label: 'Outline for Round 3 of Recruitment', value: '2'},
            ])),
    "chapter_2": new ActionRowBuilder().addComponents(
        new SelectMenuBuilder().setCustomId('1').setOptions([
                { label: '100 Gems', value: '0'},
                { label: 'February 7, XX (Relic)', value: '1'},
                { label: '11:05 AM', value: '2'},
                { label: 'August 21, XX (Relic)', value: '3'},
                { label: 'December 5, XX (Relic)', value: '4'},
            ])),
    "chapter_3": new ActionRowBuilder().addComponents(
        new SelectMenuBuilder().setCustomId('2').setOptions([
                { label: 'Observatory (Blueprint)', value: '0'},
                { label: 'The Godness Fall (Music)', value: '1'},
                { label: 'Police Station (Blueprint)', value: '2'},
                { label: '200 Credits', value: '3'},
                { label: 'Hotel (Blueprint)', value: '4'},
                { label: 'Maid Cafe (Blueprint)', value: '5'},
                { label: '400 Credits', value: '6'},
                { label: 'RISK (Music)', value: '7'},
                { label: 'Toy Shop (Blueprint)', value: '8'},
                { label: 'Train Station (Blueprint)', value: '9'},
                { label: 'Train Station (Blueprint)', value: '10' }
            ])),
    "chapter_4": new ActionRowBuilder().addComponents(
        new SelectMenuBuilder().setCustomId('3').setOptions([
                { label: '08:05 PM (Relic)', value: '0'},
                { label: '500 Credits', value: '1'},
                { label: 'Workshop (Blueprint)', value: '2'},
                { label: 'Armory (Blueprint)', value: '3'},
                { label: 'Floral Tribute (Music)', value: '4'},
                { label: 'incoming rapture (Music)', value: '5'},
                { label: 'Generator (Blueprint)', value: '6'},
                { label: 'Good Day Commander (Music)', value: '7'},
                { label: '09:55 AM (Relic)', value: '8'},
                { label: '12:01 AM (Relic)', value: '9'},
                { label: '05:37 PM (Relic)', value: '10'},
            ])),
    "chapter_5": new ActionRowBuilder().addComponents(
        new SelectMenuBuilder().setCustomId('4').setOptions([
                { label: 'Trendy Bar (Blueprint)', value: '0'},
                { label: '2:01 PM (Relic)', value: '1'},
                { label: 'Second Hand (Music)', value: '2'},
                { label: '50 Gems', value: '3'},
                { label: 'Library (Blueprint)', value: '4'},
                { label: 'Silver Mane (Music)', value: '5'},
                { label: 'How to Sleep (Relic)', value: '6'},
                { label: 'Hospital (Blueprint)', value: '7'},
                { label: 'Outline for Round 2 of Recruitment (Relic)', value: '8'},
                { label: 'the Ark (Music)', value: '9'},
                { label: '4:17 PM (Relic)', value: '10'},
            ])),
    "chapter_6": new ActionRowBuilder().addComponents(
        new SelectMenuBuilder().setCustomId('5').setOptions([
                { label: '03:42 (Relic)', value: '0'},
                { label: 'Cafe (Blueprint)', value: '1'},
                { label: 'Frost Pillar (Music)', value: '2'},
                { label: '1000 Credits', value: '3'},
                { label: 'How To Keep Your Humanity (Relic)', value: '4'},
                { label: 'Theater (Blueprint)', value: '5'},
                { label: 'Labyrinth (Music)', value: '6'},
                { label: 'Seedy Club (Blueprint)', value: '7'},
                { label: 'How To Avoid Raptures (Relic)', value: '8'},
                { label: 'ShowCase (Music)', value: '9'},
                { label: '6:08 PM (Relic)', value: '10'},
            ])),
    "chapter_7": new ActionRowBuilder().addComponents(
        new SelectMenuBuilder().setCustomId('6').setOptions([
                { label: '10:01 AM (Relic)', value: '0'},
                { label: 'Courthouse (Blueprint)', value: '1'},
                { label: 'How To Secure Food (Relic)', value: '2'},
                { label: 'Outline for Round 1 of Recruitment (Relic)', value: '3'},
                { label: 'below zero [Scenario Ver.] (Music)', value: '4'},
                { label: 'How To Deal With Strangers (Relic)', value: '5'},
                { label: 'Church (Blueprint)', value: '6'},
                { label: 'Artificial Shangri-La (Music)', value: '7'},
                { label: '50 Gems', value: '8'},
                { label: '2200 Credits', value: '9'},
            ])),
    "chapter_8": new ActionRowBuilder().addComponents(
        new SelectMenuBuilder().setCustomId('7').setOptions([
                { label: 'July 23, XX at 3:00 PM [Rainy] (Relic)', value: '0'},
                { label: 'Clothing Store (Blueprint)', value: '1'},
                { label: 'The Ruined City (Music)', value: '2'},
                { label: 'Outline for Round 3 of Recruitment (Relic)', value: '3'},
                { label: 'chromosome (Music)', value: '4'},
                { label: 'Shopping Mall (Blueprint)', value: '5'},
                { label: 'July 25, XX [Sunny] (Relic)', value: '6'},
                { label: '1 (Relic)', value: '7'},
                { label: '1600 Credits', value: '8'},
                { label: 'The Clue (Music)', value: '9'},
                { label: 'July 26, XX [Sunny] (Relic)', value: '10'},
                { label: '3200 Credits', value: '11'},
            ])),
    "chapter_9": new ActionRowBuilder().addComponents(
        new SelectMenuBuilder().setCustomId('8').setOptions([
                { label: 'Self-Defense Training (Relic)', value: '0'},
                { label: 'Radio Tower (Blueprint)', value: '1'},
                { label: 'July 25, XX [Cloudy] (Relic)', value: '2'},
                { label: 'Heart Destroyer (Music)', value: '3'},
                { label: '2 (Relic)', value: '4'},
                { label: '2000 Credits', value: '5'},
                { label: '50 Gems', value: '6'},
                { label: 'Goddess of Victory (Blueprint)', value: '7'},
                { label: 'July 27, XX [Cloudy] (Relic)', value: '8'},
                { label: 'STANDALONE (Music)', value: '9'},
                { label: 'Standin\' by (Music)', value: '10'},
                { label: '3 (Relic)', value: '11'},
            ])),
}

