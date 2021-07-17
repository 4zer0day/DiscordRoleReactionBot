module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = 'INSERT CHANNEL ID HERE';
        const hackerTeamRole = message.guild.roles.cache.find(role => role.name === "Hacker");
    
        const devTeamRole = message.guild.roles.cache.find(role => role.name === "Developer");
  
        const hackerTeamEmoji = '☠️';
        const devTeamEmoji = '🌌';

        let embed = new Discord.MessageEmbed()
        .setColor('#327EA7')
        .setTitle('Choose a team for your roles')
        .setDescription('Choosing a team will allow you to interact with each others!\n\n'
        + `${hackerTeamEmoji} for hacker team\n\n`
        + `${devTeamEmoji} for developer team`);
        
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(hackerTeamEmoji);
        messageEmbed.react(devTeamEmoji);
    
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                if (reaction.emoji.name === hackerTeamEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(hackerTeamRole);

                }
                if (reaction.emoji.name === devTeamEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(devTeamRole);
                }
            }else{
                return;
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                if (reaction.emoji.name === hackerTeamEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(hackerTeamRole);

                }
                if (reaction.emoji.name === devTeamEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(devTeamRole);
                }
            }else{
                return;
            }
        });
    }

       
}