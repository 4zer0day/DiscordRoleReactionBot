require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '!';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () =>{
    console.log('Hiro Bot is activated!');
});

client.on('guildMemberAdd', GuildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('856438060627263498').send(`Welcome <@${guildMember.user.id}> to our server`)
});

client.on('message', message  =>{

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command =  args.shift().toLowerCase();
    if (command === 'reactionrole'){
        client.commands.get('reactionrole').execute(message, args, Discord, client);
    }
});

//RPCforBot
client.on('ready', () => {
    console.log('I am ready!');
    // client.user.setActivity('Over Server', { type: 'WATCHING' })
    // .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    // .catch(console.error);
    client.user.setPresence({ activity: { name: 'For Roles', type: 'WATCHING'},status: 'idle', })
    .then(console.log)
    .catch(console.error);
  
  });
  
client.login(`${process.env.TOKEN}`);
