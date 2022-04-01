const config = require("./../config.json")
const chalk = require("chalk")
const Client = require("../index.js").Client
const { createCmd } = require("../dataHandler")
Client.on("ready", async () => {
    console.log(chalk.yellow("[Logging in as:] - " + Client.user.tag, "!"))
    Client.user.setActivity("STATUS HERE",{type: 'WATCHING'})
    //Client.user.setStatus('invisible');

    createCmd(Client, config.serverid)
})