# standump

standump reads your git history and uses AI to generate a daily standup, so you don't have to.

<img width="1408" height="502" alt="standump" src="https://github.com/user-attachments/assets/a9628979-c32b-4f52-85cd-6148c46c24ac" />

## Installation

```bash
npm install -g standump
```

Or run without installing:

```bash
npx standump
```

## Getting started

**1. Configure your provider and model**

```bash
standump config --provider <provider> --model <model>
```

**2. Set your API key**

```bash
# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# OpenAI
export OPENAI_API_KEY="sk-..."

# Google Gemini
export GOOGLE_GENERATIVE_AI_API_KEY="..."

# Ollama — no API key needed, runs locally
standump config --provider ollama --model <model>
```

**3. Run it in your git repo**

```bash
standump
```

## Providers

| Provider  | API Key Environment Variable        |
|-----------|-------------------------------------|
| anthropic | `ANTHROPIC_API_KEY`             |
| openai    | `OPENAI_API_KEY`                    |
| google    | `GOOGLE_GENERATIVE_AI_API_KEY`     |
| ollama    | None - runs locally                 |

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--days <n>` | How many days back to look. `0` = today, `1` = yesterday, `7` = last week | `1` |
| `--author <name>` | Filter commits by git author | All authors |
| `--lang <language>` | Output language | `english` |
| `--provider <provider>` | Override configured provider | — |
| `--model <model>` | Override configured model | — |

## Examples

```bash
# Your standup for yesterday
standump

# Override language for a single run
standump --lang <language>

# Filter by author in a shared repo
standump --author "lskld"

# Last week's summary for the whole team
standump --days 7

# Override provider for a single run
standump --provider <provider> --model <model>
```

## Requirements

- Node.js 18+
- Must be run inside a git repository
- Commit messages should be descriptive. Standump summarizes what you write, it can't read your code

## Config

Config is saved locally to `~/.standump/config.json`. You can always override any config value with a CLI flag for a single run without changing your saved config.
