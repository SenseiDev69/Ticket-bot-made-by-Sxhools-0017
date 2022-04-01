const client = require('../../index').Client
const config = require('../../config.json')
const discord = require('discord.js')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
module.exports.run = async (Client, interaction) => {
    if(!interaction.member.permissions.has(discord.Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply("You dont have enough permissions")
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('test')
                .setEmoji('<:report:912828035772841984>')
                .setStyle('SECONDARY')
        );
    const embed = new MessageEmbed()
            .setColor(config.embedcolor)
            .setTitle('Create a ticket!')
            .setDescription('Press the button to create a ticket.')
    await interaction.reply({ephemeral: false, embeds: [embed], components: [row]});

    client.on('interactionCreate', interaction => {
        if (!interaction.isButton()) return;
    })
}

module.exports.help = {
    name: 'ticketpanel',
}