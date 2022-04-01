const discord = require('discord.js')
const Client = require("../index").Client
const config = require("../config.json");
Client.on('messageCreate', async message => {
    if(message.author.bot || message.channel.type == 'DM') return

    let prefix = config.prefix
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(0)


    let commands = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));
    if(commands) {
        if(!message.content.startsWith(prefix)) return
        commands.run(Client, message, args, prefix);
    }
    {   if (message.mentions.users.first()) {
                if (message.mentions.users.first().tag == `${Client.user.tag}`) {
                    const sxhools = new discord.MessageEmbed()
                    .setAuthor(`${message.guild.name}`)
                    .setColor(config.embedcolor)
                    .addField("Hello! " + message.member.user.tag,  "My name is " + Client.user.tag + " And My Prefix Is " + "** " +config.prefix + " **" + " !")
                    message.reply({ embeds: [sxhools] });
            }
        }
}})