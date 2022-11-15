const { GatewayIntentBits } = require("discord.js");
const Discord = require("discord.js")
const fs = require('node:fs');
const path = require('node:path');
const { autoUpdate } = require("./functions/update");

require("dotenv").config();

// ? Fixed a bug that occurs when bot doesn't have enough permission (./events/interactionCreateButton)
// ? Fixed a bug where bot crashes while handling buttons in dm (./events/interactionCreateButton)
// TODO Fix a bug where bot will shutdown if the suggestion get deleted before the bot delete it (./events/interactionCreateButton)
// TODO Make bot online again after crash
// TODO Fix a bug where bot will shutdown (something with deleting msg again)

const client = new Discord.Client({
	intents: [GatewayIntentBits.Guilds, 		
			  GatewayIntentBits.GuildMessages,
			  GatewayIntentBits.MessageContent
		]});

// Read all commands
client.commands = new Discord.Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Read all events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(process.env.TOKEN);

setInterval(() => {
	try {
		autoUpdate();
	} catch (error) {
	console.error(error);	
	}
}, 180000);