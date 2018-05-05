	// GLOBAL REQUIREMENTS
	const system = require("./system.js").system;
	
	// LOOP FUNCTIONS
	exports.loop = require("./overhack.loop.js").loop;
	
	// READ COMMANDS
	exports.reply = require("./overhack.commands.js").commands;
	
	// LOG TO THE CONSOLE
	exports.say = function (message, color, showtime, type) {
		color = color || "white";
		if (color == "blue") { color = "\x1b[34m"; }
		if (color == "green") { color = "\x1b[32m"; }
		if (color == "red") { color = "\x1b[31m"; }
		if (color == "white") { color = "\x1b[37m"; }
		if (color == "yellow") { color = "\x1b[33m"; }
		showtime = showtime || false;
		type = type || "OVERHACK";
		if (showtime) {
			console.log(color, type + " >> " + message + " (" + ")");
		} else {
			console.log(color, type + " >> " + message);
		}
		
	};
	
	// SET BOT STATUS
	exports.setStatus = function(client) {
		
		client.user.setPresence({ 
			game: { 
				name : "!overhack help",
				link : "https://www.overhack.cloud",
				type : "LISTENING" // "PLAYING" - "STREAMING" - "LISTENING" - "WATCHING"
			},
			status : "online" // "dnd" - "offline" - "idle" - "online"
		});
	};
