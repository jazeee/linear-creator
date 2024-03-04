import { LinearClient } from '@linear/sdk'

// Api key authentication
const linearClient = new LinearClient({
  apiKey: process.env.CBH_LINEAR_API_KEY
});

async function getTeamByKey(key = "FEF") {
  const teams = await linearClient.teams({ filter: {
    key: {
      eq: key,
    },
  }});
  return teams.nodes[0];
}

interface CreateIssueProps {
  teamKey: string;
  title: string;
  description: string;
}

export async function createIssue(props: CreateIssueProps) {
  const { teamKey, title, description } = props;
  const team = await getTeamByKey(teamKey);
  if (!team.id) {
    throw new Error(`Issue getting team for ${teamKey}`);
  }
  const linearViewer = await linearClient.viewer;
  if (!linearViewer.id) {
    throw new Error("Issue getting Linear viewer");
  }

  const response = await linearClient.createIssue({ teamId: team.id, title, description, assigneeId: linearViewer.id });
  const issue = await response.issue;
  return {
    response,
    issue,
    url: issue?.url ?? "", // e.g. https://linear.app/.../issue/FEF-467/test-can-delete
    identifier: issue?.identifier ?? "", // e.g. FEF-467
  }
}
