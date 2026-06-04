#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
	.name("standump")
	.description("Dumps your git history into a standup so you don't have to")
	.version("1.0.0")
	.option("--days <number>", "how many days back to look", "1")
	.option("--author <name>", "filter by git author")
	.option(
		"--lang <language>",
		"output language (english, swedish, spanish, german, french)",
		"english",
	)
	.action((options) => {
		console.log("days:", options.days);
		console.log("author", options.author);
		console.log("lang:", options.lang);
	});

program.parse();
    