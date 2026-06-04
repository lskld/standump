#!/usr/bin/env node

import { Command } from "commander";
import { assertGitRepo, formaDateForGit, getSinceDate } from "./git.js";

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
		assertGitRepo();

		const days = parseInt(options.days);
		const since = getSinceDate(days);

		console.log("since:", formaDateForGit(since));
		console.log("author", options.author);
		console.log("lang:", options.lang);
	});

program.parse();
    