# GPTerm
A customizable CLI tool that leverages multiple system prompts.

Why GPTerm over full-AI terminals? Due to privacy requirements or preventing sensitive data from leaking, GPTerm has the advantage of being there when you want it, without leaking your sensitive data from your terminal out. 

Personally, I use it to look up common command syntax or quickly querying GPT on the fly in my terminal. I have zsh set to not remember my history when using this command.

![A terminal screenshot showing the power of GPTerm](path/to/example.png)

## Simple Usage
While gpterm is meant to be bound to terminal shortcuts such as `a` and `q` (and thereby abstracting away the preset system-prompts), you can use gpterm directly as so:

```bash
$ node index.js how far away is the sun?
The average distance from the Earth to the Sun is about 149.6 million kilometers. This distance is also referred to as one astronomical unit (AU), which is a standard measurement used in astronomy to describe distances within our solar system.
```

gpterm offers 2 flags to allow for system prompt customization. `--prompt-type`, which loads the cooresponding value from a `.env` file, and `--prompt` for customizing the prompt.

```bash
$ node index.js --prompt "talk like a pirate" how far away is the sun?
Arrr matey, the great fiery orb in the sky, known to landlubbers as the Sun, be about 93 million miles away, or roughly 150 million kilometers for those who be countin' in metric. That's near enough to keep our planet warm and bright, yet far enough to keep our sails from catchin' fire! Savvy? 🌞
```

## Advanced Usage
Assuming your terminal environment maps `q` to `gpterm --prompt-type query` and your .env populates SYSTEM_PROMPT_QUERY:
```bash
$ q "How do I list files in Linux?"
To list files in Linux, you can use the ls command
```

Assuming your terminal environment maps `a` to `gpterm --prompt-type terminal` and your .env populates SYSTEM_PROMPT_TERMINAL:
```bash
$ a ffmpeg extract first audio track from mkv
ffmpeg -i input.mkv -map 0:a:0 -c copy output_audio.aac
```

## Flags
- `--prompt "your prompt"` — Directly specify the system prompt for the assistant.
- `--prompt-type foobar` — Loads a system prompt from the environment variable `SYSTEM_PROMPT_FOOBAR` (e.g., `SYSTEM_PROMPT_TERMINAL`).
- `--debug` — Enables debug output.

## Prompt Selection Priority
1. If `--prompt` is provided, it is used as the system prompt.
2. Else, if `--prompt-type` is provided, the environment variable `SYSTEM_PROMPT_<TYPE>` is used. (ex: --prompt-type="R2D2" results in loading SYSTEM_PROMPT_R2D2)
3. Else, defaults to `You are a helpful assistant.`

## Environment Variables
Environment variables inside .env are automatically loaded. You can also leverage your .zshrc or .bashrc profile.
- `OPENAI_API_KEY` — Your OpenAI API key.
- `SYSTEM_PROMPT_TERMINAL` — Example custom prompt for terminal mode.
- `SYSTEM_PROMPT_FOOBAR` — Any arbitrary string can be used. FOOBAR is determined by the --prompt-type value. (ex: --prompt-type="R2D2" results in loading SYSTEM_PROMPT_R2D2)

## Optional But Recommended: Zsh Integration
To use the tool in zsh, and in any directory and without saving to history, you can leverage the HIST_IGNORE_SPACE and add an alias. Now your queries will no longer be remembered due to the space that starts the command (eg: ` node index.js`)

1. Prevent commands starting with a space from being saved in history:
   Add this to your `~/.zshrc`:
   ```zsh
   setopt HIST_IGNORE_SPACE
   ```
2. Create a shortcut alias for running the assistant:
   Add this to your `~/.zshrc` taking note of your node full path and the full path of the index.js (below is shown as an example):
   ```zsh
   alias a=" node index.js"
   ```
   Now you can run:
   ```bash
   a "your prompt here"
   ```
3. After editing your `.zshrc`, reload it with:
```bash
source ~/.zshrc
```

Note: My alias looks like: `alias a=' /home/psiie/.nvm/versions/node/v22.19.0/bin/node /home/psiie/git/gpterm/index.js --prompt-type terminal $@'`

## Optional - My usage
I have 3 main alias':
1. `a` which shortcuts to terminal-specific queries
2. `q` which shortcuts to my normal chatgpt queries (with my favorite system-prompt)
3. `gpt` which shortcuts to `gpterm --query-type` where the set query-type is the first argument. This allows me to save endless query types and use them quickly. (ex: `gpt pirate how far away is the sun` uses query-type pirate. This is the shortest shorthand I could come up with for maximum expandability). However, I had to leverage functions in .zshrc in order to both have no-history as well as this functionality. See below:

```bash
# GPT Helper
_gpt() {
    echo "$1" : "${@:2}"
    /home/psiie/.nvm/versions/node/v22.19.0/bin/node /home/psiie/git/gpterm/index.js --prompt-type="$1" ${@:2}
}
alias gpt=' _gpt $@'
```

## Notes
- Use `--debug` to see debug output.

## License
MIT
