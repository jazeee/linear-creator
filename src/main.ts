import { createIssue } from "./createTicket";
import { editor, input, select } from '@inquirer/prompts';

interface EditAndCreateTicketProps {
  isPermanentTicket?: boolean;
}

async function editAndCreateTicket(props: EditAndCreateTicketProps) {
  const { isPermanentTicket = true } = props;
  console.log(`Create A Linear Ticket${isPermanentTicket ? "" : " and Delete It"}`)
  const teamKey = await select({
    message: 'Team Name',
    choices: [
      { value: 'CLI', name: "CBH MonoRepo" },
      { value: 'DEV', name: "DevX" },
      { value: 'FEF', name: "Frontend" },
    ],
    default: 'FEF',
  });
  const title = await input({ message: 'Title' });
  const summary = (await editor({ message: 'Summary', default: "Summary\n===\n\n", waitForUseInput: false })).trim();

  console.log("Creating ticket...");
  console.log("-----------------------------");
  try {
    const { issue, url, identifier } = await createIssue({ teamKey, title, description: summary });

    console.log(`
fix(${identifier}): ${title}

${summary}

Ticket:
${url}

Changes
===
`);

    if (!isPermanentTicket) {
      await issue?.delete();
    }
  } catch (error) {
    console.log({ title, summary })
    console.error(error);
  }
}

editAndCreateTicket({
  isPermanentTicket: true,
});