exports.run = (client) => {
    function uptime(seconds){
        //var seconds = os.uptime
        var days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        var hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        var mnts = Math.floor(seconds / 60);
        seconds  -= mnts*60;
        return days+" days, "+hrs+" Hrs, "+mnts+" Minutes";
    }
    const express = require("express")
    const app = express();
    app.use(express.json());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
      
    app.get('/api/stats', (req, res) => {
        res.type('json')
        const stats = {
          servers: client.guilds.size,
          users: client.users.size,
          channels: client.channels.size,
          uptime: Math.round(process.uptime()),
          uptime_formatted: uptime(process.uptime()),
          commands: client.commands.size
        }
        res.send(JSON.stringify(stats))
    });
    
    app.get('/api/commands', (req, res) => {
        res.type('json')
        const DBFilter = client.commands.filter(e => e.info)
        const DB = DBFilter.map(e => {return e.info})
        res.send(DB)
    })
      
      
    app.listen(client.config.port, () => {
        console.log(`server running on port ${client.config.port}`)
    });
}