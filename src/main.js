import { createIssue } from "./createTicket.mjs";
import { editor, input } from '@inquirer/prompts';

async function editAndCreateTicket(props) {
  const { isPermanentTicket = true } = props;
  const title = await input({ message: 'Title' });
  const summary = (await editor({ message: 'Summary', default: "Summary\n===\n\n", waitForUseInput: false })).trim();
  const changes = (await editor({ message: 'Changes', default: "Changes\n===\n", waitForUseInput: false })).trim();

  console.log("Creating ticket...");
  const { issue, url, identifier } = await createIssue({ title, description: `
${summary}
` });

  console.log(`
fix(${identifier}): ${title}

${summary}

Ticket:
${url}

${changes}`);

  if (!isPermanentTicket) {
    await issue.delete();
  }
}

editAndCreateTicket({
  isPermanentTicket: true,
});