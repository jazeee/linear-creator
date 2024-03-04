# Linear Ticket Creator

This creates a linear ticket in your Linear.io project.
(I have hard coded the project to FEF)

## Setup

- `npm install`
- Create a Linear API key on <https://linear.app/.../settings/api>
  - Scroll down to the `Personal API keys` section
  - Click `Create key`
  - Once created, use that new key to set your environment variable `CBH_LINEAR_API_KEY`
  - Note - the key is only visible when created.

## Build

- `npm run build` or  `npm run build:watch`

## Running

Once built

- `npm start` or `node dist/main.js`
  - Pick your `Team Name`. This becomes the Linear team
  - Enter `Title`. This becomes the ticket title
  - Enter `Subject` in your preferred editor (default `vim`)
- Wait a few seconds.

### Outcome

Observe that there is a new ticket in Linear

Observe the output like:

```text
? Title Test from node - jaz
? Summary
? Changes
Creating ticket...

fix(FEF-471): Test from node - jaz

Summary
===
My test

Ticket:
https://linear.app/.../FEF-471...

Changes
===
```

## Creating an alias

You can run this build using an alias like:

```
alias linear-create-ticket='node ~/code/linear-creator/dist/main.js'
linear-create-ticket
```

## Customizing your editor

This package uses the node recommended package `@inquirer/prompts`

I tested with `EDITOR=code node dist/main.js`, which does open the file in vscode.
The problem with this is that `vscode` immediately returns, and prompt assumes that you are done
editing.

There may be configurations that will help with this, so I recommend looking at the fine manual.

See <https://github.com/SBoudrias/Inquirer.js?tab=readme-ov-file#editor>
