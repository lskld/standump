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

      Generate a standup update in ${lang} based on the git commits below.

      Rules:
      - Write in first person
      - Start with exactly one sentence summarizing what you worked on
      - Then list bullet points using "•" for the details
      - Group related commits into logical themes
      - Never mention commit hashes or IDs
      - Each bullet should be one concise sentence
      - Maximum 5 bullets regardless of how many commits there are
      - End with exactly one sentence summarizing the overall focus or progress
      - No headers, no extra formatting — just intro, bullets, conclusion

      Commits:
      ${commits.join("\n")}`,
		});

    return text;
}