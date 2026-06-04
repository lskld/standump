import Conf from "conf";

interface StandumpConfig {
    provider: string;
    model: string;
    lang: string;
}

const conf = new Conf<StandumpConfig>({
    projectName: "standump",
    defaults: {
        provider: "",
        model: "",
        lang: "english"
    },
});

export function getConfig(): StandumpConfig {
    return {
        provider: conf.get("provider"),
        model: conf.get("model"),
        lang: conf.get("lang"),
    };
}

export function setConfig(values: Partial<StandumpConfig>): void {
    if (values.provider) conf.set("provider", values.provider);
    if (values.model) conf.set("models", values.model);
    if (values.lang) conf.set("lang", values.lang);
    console.log("Config saved.");
}

export function validateConfig(config: StandumpConfig): void {
    if (!config.provider || !config.model) {
        console.error(
            'Error: no provider configured. Run "standump config --provider <provider> --model <model>" to get started.'
        );
        process.exit(1);
    }
}