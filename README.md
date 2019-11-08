[![Discord Bots](https://top.gg/api/widget/status/579327336395309062.svg)](https://top.gg/bot/579327336395309062) [![Discord Bots](https://top.gg/api/widget/servers/579327336395309062.svg)](https://top.gg/bot/579327336395309062) [![Discord Bots](https://top.gg/api/widget/lib/579327336395309062.svg)](https://top.gg/bot/579327336395309062)

# Skeppy Bot
This is the Skeppy Discord bot, full of the trio related memes!

# Self-hosting
## Prerequisites
  * [Node.js v12+](https://nodejs.org/en/) (you can check which version you have with `node -v`)
  * NPM (This comes pre-installed with Node.js usually)
  * A discord bot token, you can generate one [here](https://discordapp.com/developers/applications/) (If you do not know how, please reference [this](https://discordpy.readthedocs.io/en/v1.0.1/discord.html#creating-a-bot-account). It will help a lot.)
  * A [Lavalink](https://github.com/Frederikam/Lavalink) server for music. If you do not have this, the bot will crash.
  
  ### Extras for Lavalink
  * [Java Server Runtime Environment v10+](https://www.oracle.com/java/technologies/java-archive-javase10-downloads.html) for running Lavalink.
  * A brain cell or two to know how to make this work.
## Installing
  1. Clone this repository using `git clone https://github.com/TheChicken14/skeppy-bot.git`.
  2. Install all the dependencies `npm i`.
  3. Set up the config file. (rename `config-example.json` to `config.json` when done)
  3. Run it! `npm start` or `node .`
  
  ### Lavalink Installation
  1. Download the [Lavalink](https://github.com/Frederikam/Lavalink/releases) jar.
  2. Download the config file from that repository.
  3. Remember to set the config file.
  4. Run the file using `java -jar Lavalink.jar`. If you need to add a limit to the memory used, do this: `java -Xmx<insert gigabytes amount>G -jar Lavalink.jar`. Example: `java -Xmx1G -jar Lavalink.jar` will limit the memory to 1 GB.
  5. Add the Lavalink server address and port to the Lavalink nodes part of the bot config.

# Contributing
If you want to contribute to the Skeppy bot, feel free to open a pull request!

# Contributors
 * Thank you so much to [Naz](https://github.com/BluSpring) for making it work with YouTube, Twitch, Bandcamp, Soundcloud, Vimeo, Mixer and more! It can even play live radio! :o
