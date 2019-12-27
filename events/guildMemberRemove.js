module.exports = (client, member) => {
    //Delete the user from the levels database
    try {
        client.deleteScore.run(member.id, member.guild.id)
    } catch {
        //do nothing.
    }
}