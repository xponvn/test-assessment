# TestAssessment

Test Assessment project

## Before you start

This project is generated by [NX](https://nx.dev/getting-started/intro), Nx is a modular build framework for architecting and maintaining code projects, a set of extensible dev tools for monorepos

Run this command under root's project to install required dependencies...

`yarn install`

## Understand this workspace

Folder structures:

- /apps : folder containing all services

- /packages: folder containing all components, ui configs, ...etc

## Local development

### Start the frontend:

```bash
npx nx serve frontend-web
```

(if you installed nx globally [https://nx.dev/more-concepts/global-nx#installing-nx-globally](https://nx.dev/more-concepts/global-nx#installing-nx-globally))

```bash
nx serve frontend-web
```

Read more at: [https://nx.dev/packages/next#serving-next.js-applications](https://nx.dev/packages/next#serving-next.js-applications)

### Start the cms:

Fist of all, you need to have Docker installed & running on your machine

After that, please follow the instruction:

Create `.env` from `.env.example`

```bash
cp ./apps/cms/.env.example ./apps/cms/.env
```

```bash
cp ./apps/frontend-web/.env.example ./apps/frontend-web/.env
```

```bash
cp ./.db.env.example ./.db.env
```

Note In `.db.env`

```
POSTGRES_DB=test-assessment # same as DATABASE_NAME in ./apps/cms.env
POSTGRES_USER=test-assessment # same as DATABASE_USERNAME in ./apps/cms.env
POSTGRES_PASSWORD=test-assessment # same as DATABASE_PASSWORD in ./apps/cms.env
```

Run docker compose

```bash
docker compose up
```

Using the environments if you want to custom the ports: DB_PORT,ADMINER_PORT, REDIS_PORT, REDIS_INSIGHT_PORT, CMS_PORT, FE_WEB_PORT.eg:

```bash
DB_PORT=6543 CMS_PORT=1338 FE_WEB_PORT=1339 docker compose up
```

Adminer: `http://localhost:{{ADMINER_PORT}}`<br />
Redis insight: `http://localhost:{{REDIS_INSIGHT_PORT}}`<br />
CMS: `http://localhost:{{CMS_PORT}}`<br />
Web: `http://localhost:{{WEB_PORT}}`<br />

Default web ports

```
DB_PORT=5432
ADMINER_PORT=5433
REDIS_PORT=6379
REDIS_INSIGHT_PORT=6380
CMS_PORT=1337
FE_WEB_PORT=3000
```

## Graphical view of workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Generate Libraries

```bash
nx g @nrwl/next:lib my-new-lib
```

Read more at: [https://nx.dev/packages/next#generating-libraries](https://nx.dev/packages/next#generating-libraries)

## Run multiple services/package testing

```bash
nx run-many --target=test
```

Read more at: [https://nx.dev/packages/nx/documents/run-many#run-many](https://nx.dev/packages/nx/documents/run-many#run-many)

## Storybook:

Link: https://www.chromatic.com/start?inviteToken=1d18a11603d24be795d8862015f232b2&appId=64337ab552933871acec5f96

Preview Url:[https://64337ab552933871acec5f96-vsnoccuxtq.chromatic.com/](https://64337ab552933871acec5f96-vsnoccuxtq.chromatic.com/).

## Troubleshot:

- Wiki - [Troubleshot](https://github.com/xponvn/test-assessment/wiki/Troubleshot)
