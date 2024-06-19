# asylum-journey-v2

## Setup

### Front end

A Vite & React app.

`cd aj-frontend`

`npm i`

#### Add environment variables

copy `.env.example` to `.env` and populate the values (these can be found in Sanity),

#### Environment variables

Create a `.env` file and add the Sanity settings from the example file.

### Sanity

`cd sanity`

`npm i`

## Running locally

### Frontend

`cd aj-frontend`

`npm run dev`

env vars

### Sanity

Install Sanity CLI tools npm install -g @sanity/cli

#### Running locally

`cd sanity`

`npm run dev`

## Building and deploying

Requires firebase tools https://www.npmjs.com/package/firebase-tools and access to the AJ firebase account.

`npm run build`
`firebase deploy`
