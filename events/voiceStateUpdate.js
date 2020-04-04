module.exports = (client, oldState, newState) => {
    // sets the channel ID when mocing the bot
    try {
        const channels = newState.guild.channels.cache.filter(c => c.type == "voice")
        const channel = channels.find(c => c.members.get(client.user.id))
        if (channel) {
            if (client.player.players.get(newState.guild.id)) {
                client.player.players.get(newState.guild.id).channel = channel.id
            }
        }
    } catch (e) {

    }
}