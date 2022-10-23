# CommunityManager-DiscordBot

This project is a part of system for managing _World of Warcraft_ boosting community.
It allows users to interact with the system from within the Discord application.

**Project Status**: In Development

## Installation

Before starting the app, it is required to register it in [Discord Developer Portal](https://discord.com/developers/docs/intro), and obtain **OAuth2** credentials.
Make sure to keep `client_id` and `client_secret` secure and handy.

**Both keys**, along with **Bot's Token** (which can be created under _Bot_ tab, on your _bot's profile_ in [Discord Developer Portal](https://discord.com/developers/docs/intro)), have to be provided as _Environment Variables_, with the following names, for the app to work:
| Variable Name | Key |
|--|--|
| `DISCORD_CLIENT_ID` | `client_id` |
| `DISCORD_BOT_SECRET` | `client_secret` |
| `DISCORD_BOT_TOKEN` | `bot_token` |

**The application can be launched with the following commands:**

- `npm install` - to download and install all the dependencies;
- `npm run start:dev` - to start the application in **_development environment_**;
- `npm start` - to start the application in **_production environment_**.

## Useful Resources

- [Discord Developer Portal](https://discord.com/developers/docs/intro)
- [Discord.js Package Documentation](https://discord.js.org/#/)
