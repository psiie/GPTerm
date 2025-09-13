import 'dotenv/config'
import OpenAI from 'openai';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Indicate that the process has started
process.stdout.write('Thinking'); // No newline

const systemPrompt = process.env.SYSTEM_PROMPT_TERMINAL || 'You are a helpful assistant.';
const argv = yargs(hideBin(process.argv)).parse();
const client = new OpenAI();
let firstMessage = true;

const messages = [
  { role: 'system', content: systemPrompt },
  { role: 'user', content: argv._.join(' ') }
];

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

