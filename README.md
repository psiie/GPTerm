# GPT-Term-Helper

A simple terminal-based assistant powered by OpenAI's GPT-4o. Enter your prompt as a command-line argument and receive a streamed response directly in your terminal.

## Features
- Uses OpenAI's GPT-4o model
- Streams responses for fast feedback
- Customizable system prompt via environment variable

## Installation
1. Clone this repository:
   ```bash
   git clone <repo-url>
   cd gpt-term-helper
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your OpenAI API key:
   ```bash
   export OPENAI_API_KEY=your-api-key
   ```
4. (Optional) Set a custom system prompt:
   ```bash
   export SYSTEM_PROMPT_TERMINAL="You are a helpful assistant."
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
