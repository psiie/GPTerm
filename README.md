# GPT-Term-Helper

A simple terminal-based assistant powered by OpenAI's GPT-4o. Helpful for recalling commands, arguments, parameters, and piping stategies for your terminal.

I use it to look up command syntax on the fly in my terminal. I have zsh set to not remember my history when using this command. 

example:
`$ a ffmpeg extract first audio track from mkv`
`ffmpeg -i input.mkv -map 0:a:0 -c copy output_audio.aac`

## Features
- Uses OpenAI's GPT-4o model
- Streams responses for fast feedback
- Customizable system prompt via environment variable

## Installation
1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your OpenAI API key in a new .env file:
   ```bash
   OPENAI_API_KEY="your-api-key"
   ```
4. (Optional) Set a custom system prompt in .env file:
   ```bash
   SYSTEM_PROMPT_TERMINAL="You are a helpful assistant."
   ```

## Usage
Run the script with your prompt:
```bash
node index.js "How do I list files in Linux?"
```

## Optional: Zsh Integration
To use the tool in zsh, and in any directory and without saving to history, you can leverage the HIST_IGNORE_SPACE and add a alias. Now your queries will no longer be remembered

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
After editing your `.zshrc`, reload it with:
```bash
source ~/.zshrc
```

## License
MIT
