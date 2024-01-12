import { LinearClient } from '@linear/sdk'

// Api key authentication
const linearClient = new LinearClient({
  apiKey: process.env.CBH_LINEAR_API_KEY
});

// async function getMyIssues() {
//   const me = await linearClient.viewer;
//   const myIssues = await me.assignedIssues();

//   if (myIssues.nodes.length) {
//     myIssues.nodes.map(issue => console.log(`${me.displayName} has issue: ${issue.title}`));
//   } else {
//     console.log(`${me.displayName} has no issues`);
//   }
// }

// getMyIssues();
async function getTeamByKey(key = "FEF") {
  const teams = await linearClient.teams({ filter: {
    key: {
      eq: key,
    },
  }});
  return teams.nodes[0];
}

export async function createIssue(props) {
  const { teamKey, title, description } = props;
  const team = await getTeamByKey(teamKey);
  const me = await linearClient.viewer;
  if (team.id && me.id) {
    const response = await linearClient.createIssue({ teamId: team.id, title, description, assigneeId: me.id });
    const issue = await response.issue;
    return {
      response,
      issue,
      url: issue?.url ?? "", // e.g. https://linear.app/clipboardhealth/issue/FEF-467/test-can-delete
      identifier: issue?.identifier ?? "", // e.g. FEF-467
    }
  }
}
