import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOllama } from "ollama-ai-provider-v2";
import type { LanguageModel } from "ai";
import { generateText } from "ai";

export function getModel(provider: string, model: string): LanguageModel {
  switch (provider.toLowerCase()) {
    case "anthropic":
      return createAnthropic()(model);
    case "openai":
      return createOpenAI()(model);
    case "google":
      return createGoogleGenerativeAI()(model);
    case "ollama":
      return createOllama()(model);
    default:
      console.error(
        `Error: unknown provider "${provider}". Supported providers: anthropic, openai, google, ollama`
      );
      process.exit(1);
  }
}

export async function generateStandup(
    commits: string[],
    lang: string,
    provider: string,
    model: string
): Promise<string> {
    if (commits.length === 0) {
        return "No commits found for the specified time period"
    }

    const llmModel = getModel(provider, model);

    const { text } = await generateText({
        model: llmModel,
        prompt: `You are a helpful assistant that generates daily standup updates from git commit history.
        Based on the following git commits, write a concise standup update in ${lang}.
        Focus on what was accomplished, group related work together, and write it in first person.
        Keep it brief and professional — suitable for a team standup meeting.
        Commits: ${commits.join("\n")} 
        Write only the standup update, nothing else.`
    });

    return text;
}