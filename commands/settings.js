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
    if(args[0] == 'welcomemessage'){
        var guildId = message.guild.id
        var npSettings = client.npSettings
        if(!args[1]){
            npSettings.ensure(guildId, client.defaultSettings)
            var settingStatus = npSettings.get(guildId, 'welcomeMessage')
            if(settingStatus) {
                message.channel.send(`Welcome messages are turned **on**`)
            } else {
                message.channel.send(`Welcome messages are turned **off**`)
            }
        }
        if(args[1] == 'on'){
            npSettings.set(guildId, true, 'welcomeMessage')
            message.channel.send(`Welcome messages are now **on**`)            
        }
        if(args[1] == 'off'){
            npSettings.set(guildId, false, 'welcomeMessage')
            message.channel.send(`Welcome messages are now **off**`)  
        }
    }
}