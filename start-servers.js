// Start both game and chat servers
const { spawn } = require('child_process');

console.log('Starting Mood Medic servers...\n');

// Check if we're on Windows
const isWindows = process.platform === 'win32';

try {
    // Start game server (Hunt & Chase multiplayer)
    console.log('🚀 Starting game server...');
    const gameServer = spawn('node', ['server.js'], {
        stdio: 'pipe',
        cwd: process.cwd()
    });

    gameServer.stdout.on('data', (data) => {
        console.log(`[GAME SERVER] ${data.toString().trim()}`);
    });

    gameServer.stderr.on('data', (data) => {
        console.error(`[GAME SERVER ERROR] ${data.toString().trim()}`);
    });

    gameServer.on('error', (error) => {
        console.error(`[GAME SERVER] Failed to start: ${error.message}`);
    });

    // Start chat server
    console.log('💬 Starting chat server...');
    const chatServer = spawn('node', ['chat-server.js'], {
        stdio: 'pipe',
        cwd: process.cwd()
    });

    chatServer.stdout.on('data', (data) => {
        console.log(`[CHAT SERVER] ${data.toString().trim()}`);
    });

    chatServer.stderr.on('data', (data) => {
        console.error(`[CHAT SERVER ERROR] ${data.toString().trim()}`);
    });

    chatServer.on('error', (error) => {
        console.error(`[CHAT SERVER] Failed to start: ${error.message}`);
    });

    // Handle process exit
    process.on('SIGINT', () => {
        console.log('\nShutting down servers...');
        gameServer.kill();
        chatServer.kill();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        console.log('\nReceived SIGTERM, shutting down servers...');
        gameServer.kill();
        chatServer.kill();
        process.exit(0);
    });

    console.log('✅ Game Server starting on ws://localhost:8083');
    console.log('✅ Chat Server starting on ws://localhost:8084');
    console.log('\nPress Ctrl+C to stop both servers\n');

} catch (error) {
    console.error('❌ Failed to start servers:', error.message);
    console.log('\n🔧 Try running servers individually:');
    console.log('   npm run start:game');
    console.log('   npm run start:chat');
    process.exit(1);
}
