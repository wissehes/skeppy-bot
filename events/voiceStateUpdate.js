module.exports = (client, oldState, newState) => {
    // sets the channel ID when mocing the bot
    try {
        const channels = newState.guild.channels.cache.filter(c => c.type == "voice")
        const channel = channels.find(c => c.members.get(client.user.id))
        if (channel) {
            if (client.player.players.get(newState.guild.id)) {
                client.player.players.get(newState.guild.id).channel = channel.id
                if (channel.members.size == 1 && !client.player.players.get(newState.guild.id).paused) {
                    client.player.players.get(newState.guild.id).pause(true)
                    newState.guild.channels.resolve(client.getQueue(newState.guild.id)[0].channel).send(`⏸ | Everyone left the voice channel so the player has been paused.`)
                }
            }
        }
    } catch (e) {
        void(e)
    }

}