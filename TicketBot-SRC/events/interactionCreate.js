const Client = require("../index").Client

Client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()) {
        let SlashCmds = Client.SlashCmds.get(interaction.commandName)
        if(SlashCmds)  SlashCmds.run(Client, interaction)
    }

    if(interaction.isContextMenu()) {
        let SlashCmds = Client.SlashCmds.get(interaction.commandName)
        if(SlashCmds)  SlashCmds.run(Client, interaction)
    }
})