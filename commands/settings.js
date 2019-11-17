exports.run = (client, message, args) => {
      //ignore dm's
  if (message.channel.type === 'dm')
  return message.channel.send(`You need to be in a server to use this command.`);
  
    if (!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES", false) && message.author.id !== client.config.ownerID)
        return message.reply("🚫 You need the `Manage Messages` permission.");
    if(!args[0]){
        message.channel.send(`For help please refer to the documentation: https://thechicken.gitbook.io/skeppy-discord-bot/commands/settings`)
        return;
    }
    if (args[0] == 'levels'){
        var guildId = message.guild.id
        var npSettings = client.npSettings
        if(!args[1]){
            npSettings.ensure(guildId, client.defaultSettings)
            var settingStatus = npSettings.get(guildId, 'levels')
            if(settingStatus) {
                message.channel.send(`Levels are turned **on**`)
            } else {
                message.channel.send(`Levels are turned **off**`)
            }
        }
        if(args[1] == 'on'){
            npSettings.set(guildId, true, 'levels')
            message.channel.send(`Levels are now turned **on**`)
        }
        if(args[1] == 'off') {
            npSettings.set(guildId, false, 'levels')
            message.channel.send(`Levels are now turned **off**`)
        }
    }
    if(args[0] == 'welcome'){
        var guildId = message.guild.id
        var npSettings = client.npSettings
        if(!args[1]){
            npSettings.ensure(guildId, client.defaultSettings)
            var settingStatus = npSettings.get(guildId, 'welcome')
            if(settingStatus) {
                message.channel.send(`Welcome messages are turned **on**`)
            } else {
                message.channel.send(`Welcome messages are turned **off**`)
            }
        }
        if(args[1] == 'on'){
            npSettings.set(guildId, true, 'welcome')
            message.channel.send(`Welcome messages are now **on**`)            
        }
        if(args[1] == 'off'){
            npSettings.set(guildId, false, 'welcome')
            message.channel.send(`Welcome messages are now **off**`)  
        }
        if(args[1] == 'setmessage'){
            if(args[2]){
                var array = args.slice(2).join(" ")
                npSettings.set(guildId, array, 'welcomeMessage')
                message.channel.send(`Welcome  message is now set to "${array}"`)
            }
            if(!args[2]){
                message.channel.send(`i am confused rn`)
            }
        }
        if(args[1] == 'setchannel'){
            var channelName = args[2]
            if(message.guild.channels.exists('name', channelName)){
                npSettings.set(guildId, channelName, "welcomeChannel")
                message.channel.send(`✅ Welcome channel set!`)
            } else {
                message.channel.send(`❌ An error occured!`)
            }
        }
    }
}