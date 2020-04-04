const mongoose = require('mongoose');
const Braincells = require('./models/Braincells');

module.exports = client => {

    client.getUser = async (user) => {
        let data = await Braincells.findOne({ userId: user.id });
        if (data){
            return data;
        } else {
            data = await client.createUser(user) 
            return data;
        }
    };

    client.updateUser = async (guild, settings) => {
        let data = await client.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(`Guild "${data.guildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    client.addBraincells = async (user, braincells) => {
        let data = await client.getUser(user);

        const newBraincells = {
            braincells: data.braincells + braincells
        };

        return await data.updateOne(newBraincells)
    }

    client.createUser = async (user) => {
        let defaults = {
            userId: user.id,
            braincells: 0
        }

        const newUser = await new Braincells(defaults);
        return newUser.save()
    };
};