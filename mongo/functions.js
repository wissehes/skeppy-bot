module.exports = client => {
    client.getGuild = async (guild) => {
        let data = await client.settings.get(guild.id);
        if (data) return data;
        else return client.defaultSettings;
    };

    client.updateGuild = async (guild, settings) => {
        let data = await client.settings.get(guild.id);

        if (typeof data !== 'object') data = {};
        for (const objKey in settings) {
            if (data[objKey] !== settings[objKey]) data[objKey] = settings[objKey];
            else return;
        }
    
        return await client.settings.set(guild.id, data);
    };

    client.createGuild = async (guild) => {
        return client.settings.set(guild.id, client.defaultSettings)
    };

    client.deleteGuild = async (guild) => {
        await client.settings.delete(guild.id)
    };

    client.autoroleSettings = {
        get: async (guild) => {
            let data = await client.autorole.get(guild.id)
            return data
        },
        set: async (guild, settings) => {
            let data = await client.autorole.get(guild.id);

            if (typeof data !== 'object') data = {};
            for (const objKey in settings) {
                if (data[objKey] !== settings[objKey]) data[objKey] = settings[objKey];
                else return;
            }
        
            return await client.autorole.set(guild.id, data);
        },
        removeRule: async (guild, rule) => {
            let rules = await client.autorole.get(guild.id)
            delete rules[rule]
            return await client.autorole.set(guild.id, rules)
        }
    }
    client.convertLength = (millisec) => {
        // Credit: https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
          hours = Math.floor(minutes / 60);
          hours = (hours >= 10) ? hours : "0" + hours;
          minutes = minutes - (hours * 60);
          minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        // Normally I'd give notes here, but I actually don't understand how this code works.
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
          return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
      };
};