// GLOBAL REQUIREMENTS
FILE_JSON_ADMINS = require("./settings/admins.json");
FILE_JSON_CONFIG = require("./settings/config.json");
FILE_JSON_CHANNELS = require("./settings/channels.json");
FILE_JSON_PERMISSIONS = require("./settings/permissions.json");
https = require("https");
fs = require("fs");

// BOT SYSTEM
exports.system = {
	admins : FILE_JSON_ADMINS,
	colors : {
		blue : "\x1b[34m",
		green : "\x1b[32m",
		red : "\x1b[31m",
		white : "\x1b[37m",
		yellow : "\x1b[33m",
	},
	channels : FILE_JSON_CHANNELS,
	config : FILE_JSON_CONFIG,
	convert : {
		strtojson : function (string) { return JSON.parse(string); },
	},
	database : {
		readFile : function(filename, path) {
			path = path || "./database/";
			return require(path + filename + ".db").value;
		},
		writeFile : function(content, filename, path) {
			content = content || "Overhack Test";
			filename = filename || "testfile";
			path = path || "./database/";
			fs.writeFile(path + filename + ".db", content, function(err){ if (err) { return false; }});
			return true;
		},
	},
	debug : function (message, color) {
		color = color || "\x1b[31m";
		console.log(color, "   DEBUG >> " + message);
	},
	files : {
		readFile : function(filename, path) {
			path = path;
			return require(path + filename).value;
		},
		writeFile : function(content, filename, path) {
			content = content || "Overhack Test";
			filename = filename || "testfile.inf";
			path = path;
			fs.writeFile(path + filename, content, function(err){ if (err) { return false; }});
			return true;
		},
	},
	http : {
		get : function(url, message, log) {
			message = message || false;
			log = log || false;
			https.get(url, function(res) {
				var body = "";
				res.setEncoding("UTF-8");
				res.on("data", function(chunk) { body += chunk; });
				res.on("end", function() { body = JSON.parse(body); if (message != false) { message.reply(body); } if (log != false) { console.log(body); } return body; } );
			}).on("error", function(error) { system.log(error.message, system.colors.red); });
		},
	},
	log : function(message, color) {
		color = color || "\x1b[37m";
		console.log(color, "  SYSTEM >> " + message);
	},
	memory : require("./system.memory.js").memory,
	permissions : FILE_JSON_PERMISSIONS,
};