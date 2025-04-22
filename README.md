# ecomm-auth-service

**Description:** This repository contains a node application using [express framework](https://expressjs.com/es/starter/installing.html). This application provides auth services which are consumed by the UI to enable authentication of users in the App.

> Requirements:
>
> - [Node v20.19.0](https://nodejs.org/es/download/releases/)
>
> Recommended:
>
> - [Node Version Manager](https://github.com/nvm-sh/nvm). For Mac users `brew install nvm`
> - [Visual Studio Code](https://code.visualstudio.com/Download).

### Prerequisite to running locally
Create a `.env` file locally at the project root, with the following entries:
```
PORT=5000
MONGODB_URI=mongodb://root:rootpassword@0.0.0.0:27017
JWT_ACCESS_SECRET=your_strong_access_secret_key_here
JWT_REFRESH_SECRET=your_strong_refresh_secret_key_here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## How to run locally

- `npm install`
- `npm run start`
- [Open localhost:5000/health](http://localhost:5000/health)

If everything goes well, you should receive a payload like this: 
```
{
  "status": "up"
}
```