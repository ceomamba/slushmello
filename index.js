const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./file.json');
const chalk = require('chalk');
const fs = require('fs');
client.commands = new Discord.Collection();

const TOKEN = process.env.TOKEN;
const PREFIX = '!';

client.on('ready', () => {
    console.log(chalk.red('You have sucesfully launched ' + client.user.username + ' in your terminal'));
    client.user.setActivity('over www.djmamba.tk', { type:'WATCHING' });
});

client.on("message", async message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let prefix = PREFIX;

    if(message.content === prefix + 'site') {
        let embed = new Discord.RichEmbed()
            .setColor("PURPLE")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTitle('http://www.djmamba.tk');
        message.channel.send(embed);
    }
});
client.login(TOKEN);
