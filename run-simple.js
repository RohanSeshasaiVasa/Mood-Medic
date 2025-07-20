// Simple server runner - runs both servers in the same process
console.log('🚀 Starting Mood Medic servers (simple mode)...\n');

// Start game server
console.log('📡 Loading game server...');
require('./server.js');

// Start chat server after a small delay
setTimeout(() => {
    console.log('💬 Loading chat server...');
    try {
        require('./chat-server.js');
        console.log('\n✅ Both servers are running!');
        console.log('🎮 Game Server: ws://localhost:8083');
        console.log('💬 Chat Server: ws://localhost:8084');
        console.log('\nPress Ctrl+C to stop\n');
    } catch (error) {
        console.error('❌ Failed to start chat server:', error.message);
    }
}, 1000);

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down servers...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 Received SIGTERM, shutting down...');
    process.exit(0);
});
