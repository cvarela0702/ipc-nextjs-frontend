# Worldwide Recipes frontend demo for IPC Berlin

- This is the frontend application to be used by the customers using [Next.js](https://nextjs.org/).
- The backend uses [Laravel](https://laravel.com/docs/11.x/).

## Requirements

- Install first the backend following the instructions from [ipc-laravel-backend](https://github.com/cvarela0702/ipc-laravel-backend)

- IDEs
    - Install [cursor](https://www.cursor.com/)
        - Create an account with cursor
        - Suggested extensions:
            - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
            - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
            - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
            - [SonarQube](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
    - Alternatively, install [Visual Studio Code](https://code.visualstudio.com/Download)
        - Suggested extensions:
            - [GitHub Copilot](https://marketplace.visualstudio.com/items/?itemName=GitHub.copilot)
            - [GitHub Copilot Chat](https://marketplace.visualstudio.com/items/?itemName=GitHub.copilot-chat)
            - [Laravel](https://marketplace.visualstudio.com/items/?itemName=laravel.vscode-laravel)
- Have a terminal
- Have git installed locally
- Have a GitHub account
    - with GitHub copilot enabled
- Have an [OpenAI key](https://auth.openai.com/log-in)
- [Node 18.18](https://nodejs.org/en) or later

## Instructions

- Clone repo

```bash
git clone https://github.com/cvarela0702/ipc-nextjs-frontend
```

- Install its dependencies with `yarn install` or `npm install`.

```bash
cd ipc-nextjs-frontend
npm install
```

- Copy the `.env.example` file to `.env.local`


```bash
cp .env.example .env
```

- Supply the URL of your backend in the .env file

```.env
NEXT_PUBLIC_BACKEND_URL=http://localhost
```

- For the IPC only (it brings the application to the first commit)

```bash
git checkout first
```

- Finally, run the application via `npm run dev`:

```bash
npm run dev
```

- The application will be available at `http://localhost:3000`

- You can register now in the application and you can get emails with Mailpit by going to `http://localhost:8025/`
