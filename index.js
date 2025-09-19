import 'dotenv/config'
import OpenAI from 'openai';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).parse();

if (!argv.debug) console.debug = () => {}; // patch out debug if not in debug mode

// Indicate that the process has started
process.stdout.write('Thinking'); // No newline

/* Load the system prompt based on CLI arguments
The prompt-type can be any string. It will attempt to load SYSTEM_PROMPT_FOO
where FOO is the prompt-type passed in. This allows for an n-number of saved
prompts for use in various scripts, while not impeding the most basic usage
of the app.

Priority:
1. --prompt "foo bar"
2. --prompt-type foo
3. <none> (defaults to std. 'helpful assistant' prompt) */
const promptTypeArg = argv['prompt-type']?.toUpperCase() || '';
const promptFromEnv = process.env[`SYSTEM_PROMPT_${promptTypeArg}`]
const promptArg = argv.prompt;
const systemPrompt = promptArg || promptFromEnv || 'You are a helpful assistant.';

console.debug('--promt-type =', promptTypeArg);

// init
const client = new OpenAI();
let firstMessage = true;

console.debug('system prompt:', systemPrompt, '\n\n')

const messages = [
  { role: 'system', content: systemPrompt },
  { role: 'user', content: argv._.join(' ') }
];

console.debug('gpt message payload:', messages, '\n\n')

const stream = await client.chat.completions.create({
  model: 'gpt-4o',
  messages,
  stream: true,
});

// Append ... now that everything is initialized
process.stdout.write('...'); // No newline

for await (const event of stream) {
  if (event.choices?.[0]?.delta?.content) {
    if (firstMessage) {
      process.stdout.write('\r\x1b[2K'); // Erase the line
      firstMessage = false;
    }
    process.stdout.write(event.choices[0].delta.content);
  }
  if (event.choices?.[0]?.finish_reason === 'stop') {
    process.stdout.write('\n');
  }
}

