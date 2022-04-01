const { Permissions } = require("discord.js");

async function createCmd(Client, guildId) {
    const data = [
        // Slash Commands
        {
            name: "ticketpanel",
            description:" Create a ticket panel."
        }
    ]



    await Client.guilds.cache.get(guildId)?.commands.set(data);
}


module.exports = { createCmd }