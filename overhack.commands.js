// GLOBAL REQUIREMENTS
const system = require("./system.js").system;
const https = require("https");

// COMMANDS
exports.commands = function (command, message, client) {
		
	if (message.author.id != client.user.id) {
		if (command.indexOf("!overhack") == 0) {
			
			var executed = false;
			system.log("Trying to read: " + command);
			
			//////////////////////////////////////
			/////////// COMMANDS LIST ////////////
			//////////////////////////////////////
			
			// !overhack download
			if (command === "!overhack download") {
				executed = true;
				https.get("https://www.overhack.cloud/api/2.0/update.php?task=version:discord", function(res) {
					var body = "";
					res.setEncoding("UTF-8");
					res.on("data", function(chunk) { body += chunk; });
					res.on("end", function() { 
						message.reply("",{
							embed : {
								author : {
									name : "Download (Anti-Cheat Client " + body + ")",
									icon_url : "https://www.overhack.cloud/api/2.0/discord/images/download.png",
								},
								title : "Click here to download the latest **Overhack Anti-Cheat Client**.",
								url : "https://www.overhack.cloud/download",
								color : 3447003,
							},
						});
					});
				});
			}
			
			// !overhack group <id> - !overhack team <id>
			if (command.indexOf("!overhack group") == 0 || command.indexOf("!overhack team") == 0) {
				executed = true;
				var group_id = command.replace("!overhack group", "").replace(" ", "").replace("!overhack team","");
				system.http.get("https://www.overhack.cloud/api/2.0/discord/group.php?id=" + group_id, message);
			}
			
			// !overhack help
			if (command === "!overhack help") {
				executed = true;
				message.reply(""
					+ ":blue_book: Available commands :blue_book:\n"
					+ "```MARKDOWN\n"
						+ "# Download Overhack Anti-Cheat Client\n"
						+ "!overhack download\n"
						+ "\n"
						+ "# Check Group informations\n"
						+ "!overhack group <id>\n!overhack team <id>\n"
						+ "\n"
						+ "# Latest Overhack News\n"
						+ "!overhack news\n"
						+ "\n"
						+ "# Check Player informations\n"
						+ "!overhack player <id>\n"
						+ "!overhack user <id>\n"
						+ "\n"
						+ "#Check a Player session\n"
						+ "!overhack session <id>\n"
						+ "\n"
						+ "# You need support?\n"
						+ "!overhack support\n"
					+ "```"
				);
			}
			
			// !overhack news
			if (command === "!overhack news") {
				executed = true;
				https.get("https://www.overhack.cloud/api/2.0/discord/news.php", function(res) {
				var body = "";
				res.setEncoding("UTF-8");
				res.on("data", function(chunk) { body += chunk; });
				res.on("end", function() { 
					var json_news = JSON.parse(body);
					var news = json_news[0];
					var emby = {};
					if (news.image) { 
						emby = {
							embed : {
								title : news.title,
								description : news.description,
								url : news.link,
								color : 3447003,
								image : { url : news.image },
								footer : {
									icon_url : "https://www.overhack.cloud/api/2.0/discord/images/rivenworth_avatar.png",
									text : "Have fun and be fair! | " + news.date,
								},
							},
						};
					} else {
						emby = {
							embed : {
								title : news.title,
								description : news.description,
								url : news.link,
								color : 3447003,
								footer : {
									icon_url : "https://www.overhack.cloud/api/2.0/discord/images/rivenworth_avatar.png",
									text : "Have fun and be fair! | " + news.date,
								},
							},
						};
					}
					message.reply("",emby);
				});
			}).on("error", function(error) { system.log(error.message, system.colors.red); });
			}
			
			// !overhack player <id>
			if (command.indexOf("!overhack player") == 0 || command.indexOf("!overhack user") == 0) {
				executed = true;
				var player_id = command.replace("!overhack player", "").replace(" ", "");
				system.http.get("https://www.overhack.cloud/api/2.0/discord/player.php?id=" + player_id, message);
			}
			
			// !overhack session <id>
			if (command.indexOf("!overhack session") == 0) {
				executed = true;
				var session_id = command.replace("!overhack session", "").replace(" ", "");
				system.http.get("https://www.overhack.cloud/api/2.0/discord/session.php?id=" + session_id, message);
			}
			
			// !overhack support
			if (command === "!overhack support") {
				executed = true;
				message.reply("",{
					embed : {
						title : "**OVERHACK SUPPORT**",
						description : ""
									+ "If you need support please don't hesitate to join our Official Discord Server"
									+ "\n\n"
									+ "https://discord.gg/9gtJ9XG"
									+ "\n\n"
									+ "• If you are experiencing problems using our **Anti-Cheat** please ask for support using the `#sessions` text-channel.\n• For everything else you can ask for support by using the `#support` text-channel.\n"
									+ "",
						color : 3447003,
					},
				});
			}
			
			//////////////////////////////////////
			/////////// ADMIN COMMANDS ///////////
			//////////////////////////////////////
			
			// !overhack admin shutdown - !overhack admin off - !overhack admin destroy
			if (command.indexOf("!overhack admin shutdown") == 0 || command.indexOf("!overhack admin off") == 0 || command.indexOf("!overhack admin destroy") == 0) {
				if (system.admins.indexOf(message.author.id) >= 0) {
					executed == true;
					system.log("yellow", "Shutting down the bot...");
					message.reply("Shutting down...")
					client.destroy();
				} else {
					message.reply("You are not authorized to perform this command.");
				}
			}
			
			// !overhack admin roles - !overhack admin permissions
			if (command === "!overhack admin roles" || command === "!overhack admin permissions") {
				if (system.admins.indexOf(message.author.id) >= 0) {
					executed == true;
					var dateFormat = require('dateformat');
					var date = new Date();					
					var filename = "permissions_" + dateFormat(date, "yyyymmddHHMMss") + ".json";
					system.files.writeFile(JSON.stringify(client.guilds.get(system.config.server).roles.array()), filename, system.config.paths.logs);
					console.log("");
					console.log(client.guilds.get(system.config.server).roles);
					message.reply("**--- PLEASE READ THE CONSOLE LOG OR THE LOG PERMISSIONS FILE TO KNOW MORE ---**");
				} else {
					message.reply("You are not authorized to perform this command.");
				}
			}
				
			if (executed == true) { system.log("Executed: " + command, system.colors.green); executed = false; }
			
		}
	}
		
};