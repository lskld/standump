#!/usr/bin/env node

import { Command } from "commander";
import {
	assertGitRepo,
	formatDateForGit,
	getCommits,
	getSinceDate,
} from "./git.js";

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
		const commits = getCommits(since, options.author);

		console.log(`Found ${commits.length} commits:`);
		commits.forEach((c) => console.log(c));
	});

program.parse();
    