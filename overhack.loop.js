// GLOBAL REQUIREMENTS
const system = require("./system.js").system;
const https = require("https");

// LOOP FUNCTIONS

exports.loop = {

	// CHECK UPDATES FOR ANTI-CHEAT CLIENT
	anticheat : function (client) {
		https.get("https://www.overhack.cloud/api/2.0/update.php?task=version", function(res) {
			var version_global = "";
			res.setEncoding("UTF-8");
			res.on("data", function(chunk) { version_global += chunk; });
			res.on("end", function() {
				try {
					if (version_global > system.memory.anticheat_version) {
						system.log("New Client found! Checking and pushing the Anti-Cheat Client news...", system.colors.yellow);
						https.get("https://www.overhack.cloud/api/2.0/update.php?task=version:discord", function(res) {
							var version_discord = "";
							res.setEncoding("UTF-8");
							res.on("data", function(chunk) { version_discord += chunk; });
							res.on("end", function() {
								var updateFile = {
									filename : "overhack.anticheat_version",
									content : "exports.value = " + version_global + ";",
								};
								if (system.database.writeFile(updateFile.content, updateFile.filename) == true) {
									system.memory.anticheat_version = version_global;
									client.channels.get(system.channels.news).send("",{
										embed : {
											author : {
												name : "Bye bye Cheaters, a new Client is here!",
												icon_url : "https://www.overhack.cloud/api/2.0/discord/images/new_anticheat.png",
											},
											title : "Overhack Anti-Cheat Client (" + version_discord + ")",
											description : "Download now the latest version of Overhack Anti-Cheat (" + version_discord + ") for Windows. If you have it already installed on your PC just launch the application, the updater will download the latest version automatically." ,
											url : "https://www.overhack.cloud/download",
											color : 0x00AE86,
											footer : {
												icon_url : "https://www.overhack.cloud/api/2.0/discord/images/rivenworth_avatar.png",
												text : "Have fun and be fair!",
											},
										},
									});
									system.log("File: " + updateFile.filename, system.colors.white);
									system.log("Content: " + updateFile.content, system.colors.white);
									system.log("Updated successfully!", system.colors.green);
									return true;
								} else {
									system.log("File: " + updateFile.filename, system.colors.white);
									system.log("Content: " + updateFile.content, system.colors.white);
									system.log("Error updating!", system.colors.red);
									return false;
								}
							});
						}).on("error", function(error) { system.log(error.message, system.colors.red); });
					}
				} catch(e) { system.log("Preventing Crash... SUCCESS!", system.colors.red); }
			});
		}).on("error", function(error) { system.log(error.message, system.colors.red); });
	},

	// CHECK NEWS
	news : function (client) {
		https.get("https://www.overhack.cloud/api/2.0/discord/news.php", function(res) {
			var body = "";
			res.setEncoding("UTF-8");
			res.on("data", function(chunk) { body += chunk; });
			res.on("end", function() {
				try {
					var json_news = JSON.parse(body);
					if (json_news[0].id > system.memory.news_latest) {
						system.log("News found! Checking and pushing the JSON news...", system.colors.yellow);
						var news = json_news[0];
						var updateFile = {
							filename : "overhack.news_latest",
							content : "exports.value = " + news.id + ";",
						};
						if (system.database.writeFile(updateFile.content, updateFile.filename) == true) {
							system.memory.news_latest = news.id;
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
							client.channels.get(system.channels.news).send("",emby);
							system.log("File: " + updateFile.filename, system.colors.white);
							system.log("Content: " + updateFile.content, system.colors.white);
							system.log("File updated successfully!", system.colors.green);
							return true;
						} else {
							system.log("File: " + updateFile.filename, system.colors.white);
							system.log("Content: " + updateFile.content, system.colors.white);
							system.log("Error while updating the file!", system.colors.red);
							return false;
						}
					}
				} catch(e) { system.log("Preventing Crash... SUCCESS!", system.colors.red); }
			});
		}).on("error", function(error) { system.log(error.message, system.colors.red); });
	},

	// CHECK AND UPDATE PREMIUM ROLE
	premium : function (client) {
		https.get("https://www.overhack.cloud/api/2.0/discord/premium.php", function(res) {
			var body = "";
			res.setEncoding("UTF-8");
			res.on("data", function(chunk) { body += chunk; });
			res.on("end", function() {
				try {
					var json_users = JSON.parse(body);
					var members = client.guilds.get(system.config.server).members.array();
					for (var i in members) {
						var member = members[i];
						var was = false;
						if (member.roles.find('id', system.permissions.premium)) { was = true; }
						var premium = false;
						var identity = member.user.username + "#" + member.user.discriminator;
						for (p = 0; p < json_users.length - 1; p++) {
							var user = json_users[p];
							if (user.discord.toUpperCase() == identity.toUpperCase()) { premium = true; }
						}
						if (was == true && premium == false) { system.log("Premium removed from " + identity, system.colors.red); member.removeRole(system.permissions.premium); } // Remove
						if (was != true && premium == true) { system.log("Premium added to " + identity, system.colors.green); member.addRole(system.permissions.premium); } // Add
					}
				} catch(e) { system.log("Preventing Crash... SUCCESS!", system.colors.red); }
			});
		}).on("error", function(error) { system.log(error.message, system.colors.red); });
	},

};
