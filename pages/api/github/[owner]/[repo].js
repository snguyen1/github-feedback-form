// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { App } from "@octokit/app";

export default async function handler(req, res) {
  // authentication for GitHub App
  const app = await new App({
    appId: process.env.APP_ID,
    privateKey: process.env.PRIVATE_KEY,
    oauth: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }
  });
  
  // authenticate with app
  try {
    const authRes = await app.octokit.request("/app");
  } catch (error) {
    console.error(error.status, error.message, "Octokit App Authentication Request");
    return res.status(error.status ? error.status : 500).send(error ? new Error('Internal Server Error') : null);
  }
  // console.log("authenticated as %s", authRes.data.name);

  if (req.method === "POST") { // create new issue
    const { owner, repo } = req.query;
    const { body } = req;
    
    try {
      const installResponse = await app.octokit.request(`GET /repos/${owner}/${repo}/installation`); // get installation id
      const installId = installResponse.data.id;
      const instalOctokit = await app.getInstallationOctokit(installId); // Get octokit installation access token
      const { data } = await instalOctokit.request(`POST /repos/${owner}/${repo}/issues`, { // create new issue
        title: `[${(body.type).toUpperCase()}] ${body.title}`,
        body: `Reported by: ${req.body.email }\n${body.comment}`,
        labels: [`${(body.type).toLowerCase()}`],
      });
      return res.status(200).json(data);
    } catch(error) {
      console.error(error.status, error.message);
      return res.status(error.status ? error.status : 500).send(error ? new Error('Internal Server Error') : null);
    };

  }
  else if (req.method === "GET") { // not found
    return res.status(404).end();
  }
}
