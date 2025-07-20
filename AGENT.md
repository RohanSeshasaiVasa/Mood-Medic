# Mood Medic - Agent Configuration

## Build/Test Commands
- `npm start` - Start both game and chat servers
- `npm run start:game` - Start only game server (port 8083)
- `npm run start:chat` - Start only chat server (port 8089)
- `node start-servers.js` - Start both servers with logging
- No test framework configured (package.json shows "no test specified")
- Game WebSocket server URL: `wss://moodmedic.rohan.hackclub.app` (production)
- Chat WebSocket server URL: `ws://localhost:8089` (local)

## Architecture & Structure  
- **Frontend**: Multi-page web app (index.html, game.html, chat.html)
- **Backend**: WebSocket server (server.js) for multiplayer game coordination
- **Database**: None - in-memory player state management
- **Games**: Bubble Pop, Geometry Dash clone, Hunt & Chase (local + multiplayer)
- **External**: JotForm chatbot integration, external image assets from icons8.com

## Code Style Guidelines
- **JavaScript**: Vanilla JS with CommonJS modules, camelCase naming
- **HTML**: Semantic structure, emoji icons, responsive design
- **CSS**: External stylesheet (style.css), inline styles for game-specific UI
- **Event Handling**: addEventListener pattern, key code checks (e.code)
- **Canvas Games**: RequestAnimationFrame loops, object-oriented player state
- **WebSocket**: JSON message protocol with type-based routing
- **Error Handling**: Try-catch for JSON parsing, defensive checks for DOM elements

## Key Conventions
- Game state stored in global variables with prefixes (mp* for multiplayer)
- F key for fullscreen toggle, Space for game actions
- Responsive breakpoints at 700px width
