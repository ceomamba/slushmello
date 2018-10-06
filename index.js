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

fs.readdir("./src/commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }
  
    jsfile.forEach((f, i) =>{
      let props = require(`./src/commands/${f}`);
      console.log(`${f} loaded!`);
      client.commands.set(props.help.name, props);
    });
  });

client.on("message", async message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let prefix = PREFIX;

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
});
client.login(TOKEN);