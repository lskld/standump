import { execSync } from "child_process";

export function assertGitRepo(): void {
	try {
		execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
	} catch {
		console.error("Error: no git repository found in current directory");
		process.exit(1);
	}
}

export function getSinceDate(days: number): Date {
	const date = new Date();
	date.setDate(date.getDate() - days);
	date.setHours(0, 0, 0, 0);
	return date;
}

export function formaDateForGit(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day} 00:00:00`;
}
