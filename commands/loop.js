exports.run = async (client, message, args) => {
    if(!client.player.get(message.guild.id))
        return message.channel.send(`Currently not playing anything!`);

    if(!client.musicSettings[message.guild.id] || Object.keys(client.musicSettings[message.guild.id]).length == 0)
        client.musicSettings[message.guild.id] = {loop:0,shuffle:false};

    var ms = client.musicSettings[message.guild.id];

    if(!args[0]) {
        if(ms.loop == 0) {
            message.channel.send(`Arguments not found. Looping one song only :repeat_one:\n\n**Note**: \`0/off\` is to turn off loop, \`1/one\` is to loop one song, \`2/multi/all\` is to loop the whole queue.`);
            ms.loop = 1;
        } else {
            message.channel.send(`Arguments not found. Loop disabled.\n\n**Note**: \`0/off\` is to turn off loop, \`1/one\` is to loop one song, \`2/multi/all\` is to loop the whole queue.`);
            ms.loop = 0;
        }
    } else {
        var ar = args[0].toLowerCase();
        if(ar == '0' || ar == 'off') {
            ms.loop = 0;
            message.channel.send(`Loop disabled.`);
        } else if(ar == '1' || ar == 'one') {
            ms.loop = 1;
            message.channel.send(`Loop set to one song. :repeat_one:`);
        } else if(ar == '2' || ar == 'multi' || ar == 'all') {
            ms.loop = 2;
            message.channel.send(`Loop set to multiple songs. :repeat:`);
        } else {
            message.channel.send(`Invalid loop type. \n\`0/off\` is to turn off loop, \`1/one\` is to loop one song, \`2/multi/all\` is to loop the whole queue.`);
        }
    }
}