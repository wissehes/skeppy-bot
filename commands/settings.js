exports.run = (client, message, args) => {
    if (!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES", false) && message.author.id !== client.config.ownerID)
        return message.reply("🚫 You need the `Manage Messages` permission.");
    if(!args[0]){
        message.channel.send(`You need to provide something you want to change. You can choose from\n\`levels\``)
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
    }
}