exports.run = (client, message, args) => {
    if (client.braincellCooldown.has(message.author.id)) {
        return message.reply("You need to wait at least 5 minutes before you can regain any new braincells!")
    }
    client.braincellCooldown.add(message.author.id)
    setTimeout(() => {
        client.braincellCooldown.delete(message.author.id);
    }, 300000)
    const newBraincells = Math.floor(Math.random() * 100) + 1
    const donators = [
        'Skeppy',
        'BadBoyHalo',
        'a6d',
        'f1nn5ter',
        'Mr. Squeegy',
        'muffin'
    ]
    const donator = donators.random()

    const actions = [
        'by watching a video from {d}',
        'by eating a cookie from {d}',
        'from {d}',
        'by subscribing to {d}',
        'by following {d} on twitter',
        'by being a crackhead',
        'by donating to {d}'
    ]
    const action = actions.random()

    client.addBraincells(message.author, newBraincells)

    message.channel.send(`${message.author.toString()} has gained **${newBraincells} braincells** ${action.replace('{d}', donator)}!`)
}

exports.info = {
    name: `gain`,
    aliases: [],
    description: `Gain new braincells!`,
    usage: `gain`,
    category: `Braincells`
}