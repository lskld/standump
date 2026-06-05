#!/usr/bin/env node

import { Command } from "commander";
import { assertGitRepo, getCommits, getSinceDate } from "./git.js";
import { getConfig, setConfig, validateConfig } from "./config.js";
import { generateStandup } from "./ai.js";
import ora from "ora";
import clipboard from "clipboardy";

const program = new Command();
program.enablePositionalOptions();

program
	.name("standump")
	.description("Dumps your git history into a standup so you don't have to")
	.version("1.0.9")
	.option("--days <number>", "how many days back to look", "1")
	.option("--author <name>", "filter by git author")
	.option("--lang <language>", "output language")
	.option("--provider <provider>", "ai provider to use")
	.option("--model <model>", "model to use")
	.action(async (options) => {
		assertGitRepo();

		const savedConfig = getConfig();

		const resolvedConfig = {
			provider: options.provider ?? savedConfig.provider,
			model: options.model ?? savedConfig.model,
			lang: options.lang ?? savedConfig.lang,
		};

		validateConfig(resolvedConfig);

		const days = parseInt(options.days);
		const since = getSinceDate(days);
		const commits = getCommits(since, options.author);

		const spinner = ora("Generating standup...").start();

		const standup = await generateStandup(
			commits,
			resolvedConfig.lang,
			resolvedConfig.provider,
			resolvedConfig.model,
		);

		spinner.succeed(" Done! Press 'c' to copy");
		console.log("\n" + standup + "\n");

		process.stdin.setRawMode(true);
		process.stdin.resume();
		process.stdin.once("data", (key) => {
			if (key.toString() === "c") {
				clipboard.writeSync(standup);
				console.log("Copied to clipboard");
			}
			process.exit(0);
		});
	});

program
	.command("config")
	.description("Configure standump defaults")
	.option("--provider <provider>", "ai provider to use")
	.option("--model <model>", "model to use")
	.option("--lang <language>", "output language")
	.action((options) => {
		setConfig({
			provider: options.provider,
			model: options.model,
			lang: options.lang,
		});
	});

program.parse();
    