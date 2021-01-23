// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { Github } from '../../models/github';

const query = {
    query: `
query {
    __typename
    organization(login: "HackOverflowMais") {
      membersWithRole(first: 5) {
        nodes {
          avatarUrl
          name
          url
          bio
        }
      }
      repositories(first: 10) {
        nodes {
          name
          url
          stargazerCount
          description
          primaryLanguage {
            color
            name
          }
        }
      }
    }
  }
`
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = process.env.GITHUB;
    console.log(token);
    const resp = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(query)
    });
    const js = await resp.json();
    const newjs: Github = {
        repos: js.data.organization.repositories.nodes,
        members: js.data.organization.membersWithRole.nodes
    };
    res.send(newjs);
};
