
import { execSync } from "child_process";

export function assertGitRepo(): void {
    try {
        execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    } catch {
        console.error("Error: no git repository found in current directory");
        process.exit(1);
    }
}