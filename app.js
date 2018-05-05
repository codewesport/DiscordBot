			// GLOBAL REQUIREMENTS
			const system = require("./system.js").system;
			system.log("Starting Overhack Discord bot...", system.colors.red);
			console.log("             ...");
			// INITIALIZE MEMORY
			system.memory.anticheat_version = system.database.readFile("overhack.anticheat_version");
			system.memory.news_latest = system.database.readFile("overhack.news_latest");
			// INITIALIZE OVERHACK
			const overhack = require("./overhack.js");
			console.log("             ...");
			system.log("Overhack.js imported successfully!", system.colors.green);
			console.log("", system.colors.white);
			console.log("");
			
			
			// WELCOME TO OVERHACK OFFICIAL DISCORD BOT
			console.log("###########################################################################");
			console.log("##                                                                       ##");
			console.log("##    ██████╗ ██╗   ██╗███████╗██████╗ ██╗  ██╗ █████╗  ██████╗██╗  ██╗  ##");
			console.log("##   ██╔═══██╗██║   ██║██╔════╝██╔══██╗██║  ██║██╔══██╗██╔════╝██║ ██╔╝  ##");
			console.log("##   ██║   ██║██║   ██║█████╗  ██████╔╝███████║███████║██║     █████╔╝   ##");
			console.log("##   ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██╔══██║██║     ██╔═██╗   ##");
			console.log("##   ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║██║  ██║██║  ██║╚██████╗██║  ██╗  ##");
			console.log("##   ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ##");
            console.log("##                                                                       ##");                                         
			console.log("##   ██████╗ ██╗███████╗ ██████╗ ██████╗ ██████╗ ██████╗                 ##");           
			console.log("##   ██╔══██╗██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗                ##");              
			console.log("##   ██║  ██║██║███████╗██║     ██║   ██║██████╔╝██║  ██║                ##");           
			console.log("##   ██║  ██║██║╚════██║██║     ██║   ██║██╔══██╗██║  ██║                ##");
			console.log("##   ██████╔╝██║███████║╚██████╗╚██████╔╝██║  ██║██████╔╝                ##");
			console.log("##   ╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝                 ##");
			console.log("##                                                                       ##");
			console.log("##   ██████╗  ██████╗ ████████╗                                          ##");
			console.log("##   ██╔══██╗██╔═══██╗╚══██╔══╝                                          ##");
			console.log("##   ██████╔╝██║   ██║   ██║                                             ##");
			console.log("##   ██╔══██╗██║   ██║   ██║                                             ##");
			console.log("##   ██████╔╝╚██████╔╝   ██║                                             ##");
			console.log("##   ╚═════╝  ╚═════╝    ╚═╝   v1.0                                      ##");
			console.log("##                                                                       ##");
			console.log("###########################################################################");
			console.log("##   Author: Marco Cusano                                                ##");
			console.log("##   Version: 1.0 (Beta)                                                 ##");
			console.log("###########################################################################");
			console.log("");
                                                                 
			overhack.say("Initialization ... OK!", "green");
			
			var https = require("https");
			overhack.say("Importing https ... OK!", "green");
			
			const Discord = require('discord.js');
			overhack.say("Importing discord.js ... OK!", "green")
			
			
			const client = new Discord.Client();
			overhack.say("Searching Client ... OK!", "green");

			client.on('ready', () => {
				// END THE INITIALIZATION
				overhack.setStatus(client);
				overhack.say("Logged in as " + client.user.tag, "green");
				overhack.say("I'm ready!", "green")
				console.log("");				
				// SEARCH NEWS AND UPDATES
				client.setInterval(overhack.loop.anticheat, system.config.loop.refresh, client);
				client.setInterval(overhack.loop.news, system.config.loop.refresh, client);
				client.setInterval(overhack.loop.premium, system.config.loop.refresh, client);
			});

			client.on('message', msg => { overhack.reply(msg.content, msg, client); });
			
			overhack.say("Logging-in with the token '" + system.config.token + "'", "yellow")
			client.login(system.config.token);	