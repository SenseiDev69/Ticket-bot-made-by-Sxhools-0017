console.clear()

const discord = require('discord.js');
const config = require("./config.json");
const fs = require("fs")
const chalk = require('chalk')
const Client = new discord.Client({
    intents: [discord.Intents.FLAGS.DIRECT_MESSAGES,discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,discord.Intents.FLAGS.GUILDS,discord.Intents.FLAGS.GUILD_BANS,discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,discord.Intents.FLAGS.GUILD_INTEGRATIONS,discord.Intents.FLAGS.GUILD_INVITES,discord.Intents.FLAGS.GUILD_MEMBERS,discord.Intents.FLAGS.GUILD_MESSAGES,discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,discord.Intents.FLAGS.GUILD_PRESENCES,discord.Intents.FLAGS.GUILD_VOICE_STATES,discord.Intents.FLAGS.GUILD_WEBHOOKS,discord.Intents.FLAGS.GUILD_MEMBERS,discord.Intents.FLAGS.GUILD_VOICE_STATES],
    allowedmentions: { parse: ['users', 'roles'], repliedUser: true}
});
Client.events = new discord.Collection();
Client.SlashCmds = new discord.Collection();
Client.commands = new discord.Collection();
Client.aliases = new discord.Collection();
module.exports.Client = Client
console.log(chalk.blue("[Bot Is Loading Please Wait!] - ( Coded By Sxhools#1111 Dm If Any Problems )"))

fs.readdir('./events/', (err, files) => {
    const evFiles = files.filter(f => f.split(".").pop() === "js");
    if(evFiles.length === 0) {
        return console.log(chalk.red('[EVENT HANDLER] - No events were found'));
    };
    evFiles.forEach(event => {
        const eventGet = require(`./events/${event}`);
        console.log(chalk.magenta(`[EVENT HANDLER] - File ${event} was loaded !`))

        try {
            Client.events.set(eventGet.name, eventGet);
        } catch(err) {
            return console.log(err);
        };
    });
});


fs.readdirSync('./SlashCmds/').forEach(dir => {
    fs.readdir(`./SlashCmds/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) return console.log(chalk.red("[ / Command Handler] - Can't find any commands :( !"));

        jsFiles.forEach(file => {
            var fileget = require(`./SlashCmds/${dir}/${file}`);
            console.log(chalk.green(`[/ Command handler] - File ${file} was loaded :) !`))

            try {
                Client.SlashCmds.set(fileget.help.name, fileget);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});


Client.on('messageCreate', async message =>{
    if(message.author.bot || message.channel.type == 'DM') return
})

Client.login(config.token)
