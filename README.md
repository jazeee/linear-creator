# Linear Ticket Creator

This creates a linear ticket in your Linear.io project.
(I have hard coded the project to FEF)

## Setup

- `npm install`
- Create a Linear API key on <https://linear.app/clipboardhealth/settings/api>
  - Scroll down to the `Personal API keys` section
  - Click `Create key`
  - Once created, use that new key to set your environment variable `CBH_LINEAR_API_KEY`
  - Note - the key is only visible when created.

## Running

- `node src/main.js`
  - Enter `Title`. This becomes the ticket title
  - Enter `Subject` in your preferred editor (default `vim`)
  - Enter `Changes` in your preferred editor (default `vim`)
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
- Do this
- Do that

1. Bullet test

Video
---

https://jazeee.com
```
