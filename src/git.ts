import { execSync, type ExecSyncOptions } from "child_process";
import { execFileSync } from "child_process";

export function assertGitRepo(): void {
	try {
		execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
	} catch {
		console.error("Error: no git repository found in current directory");
		process.exit(1);
	}
}

export function getCommits(since: Date, author?: string): string[] {
	const sinceStr = formatDateForGit(since);

	const args = ["log", "--oneline", "--no-merges", `--since=${sinceStr}`];
	if (author) args.push(`--author=${author}`);

	try {
		const output = execFileSync("git", args, { encoding: "utf-8" }) as string;

		if (!output.trim()) return [];

		return output.trim().split("\n");
	} catch {
		console.error("Error: failed to run git log");
		process.exit(1);
	}
}

export function getSinceDate(days: number): Date {
	const date = new Date();
	date.setDate(date.getDate() - days);
	date.setHours(0, 0, 0, 0);
	return date;
}

export function formatDateForGit(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day} 00:00:00`;
}
