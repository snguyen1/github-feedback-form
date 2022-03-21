This is a `next.js` app which provide an user interface form to submit new issue directly to any public/private repos within an organization. Authenticated via installed Github App.


## Getting Started

1. Create `.env` file from `env.dist`
2. You will need to install a github app in your organization's repository and use the PRIVATE_KEY, CLIENTID, CLIENTSECRET, and APPID as your env variables
3. `npm install`


   a. Without docker: Run vscode debuuger to start the dev environment


    b. With docker: Run `docker-compose build && docker-compose up` in your terminal


4. To submit a feedback: Open `http://localhost:3000/{owner}/{repo}`
[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

## Deploy on Vercel

Use `docker-compose.yml` to deploy with docker-compose
The app is accessible via port `80`