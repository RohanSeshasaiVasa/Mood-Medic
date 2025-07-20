// Chat WebSocket Server
const WebSocket = require('ws');

// Create WebSocket server on a different port from the game server
const wss = new WebSocket.Server({ port: 8089 });

// Store connected users
let connectedUsers = {};
let messageHistory = [];
const MAX_HISTORY = 50; // Keep last 50 messages

console.log('Chat WebSocket server running on ws://localhost:8084');

// Broadcast message to all connected clients
function broadcast(message) {
    const messageString = JSON.stringify(message);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageString);
        }
    });
}

// Get online user count
function getOnlineCount() {
    return Object.keys(connectedUsers).length;
}

// Handle new WebSocket connections
wss.on('connection', function connection(ws) {
    let userId = null;
    let username = null;

    console.log('New chat connection established');

    // Send welcome message and chat history
    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected to chat server',
        history: messageHistory,
        onlineCount: getOnlineCount()
    }));

    // Handle incoming messages
    ws.on('message', function incoming(data) {
        try {
            const message = JSON.parse(data);
            
            switch (message.type) {
                case 'join':
                    // User joining the chat
                    userId = generateUserId();
                    username = message.username.trim().substring(0, 20); // Limit username length
                    
                    connectedUsers[userId] = {
                        ws: ws,
                        username: username,
                        joinTime: new Date()
                    };

                    // Send user their ID
                    ws.send(JSON.stringify({
                        type: 'user_id',
                        userId: userId,
                        username: username
                    }));

                    // Broadcast join message
                    const joinMessage = {
                        type: 'system',
                        message: `${username} joined the chat! 👋`,
                        timestamp: new Date().toISOString(),
                        onlineCount: getOnlineCount()
                    };
                    
                    broadcast(joinMessage);
                    
                    // Add to message history
                    messageHistory.push(joinMessage);
                    if (messageHistory.length > MAX_HISTORY) {
                        messageHistory.shift();
                    }

                    console.log(`User ${username} joined. Online: ${getOnlineCount()}`);
                    break;

                case 'message':
                    // User sending a message
                    if (userId && connectedUsers[userId]) {
                        const userMessage = {
                            type: 'message',
                            userId: userId,
                            username: connectedUsers[userId].username,
                            message: message.message.trim().substring(0, 300), // Limit message length
                            timestamp: new Date().toISOString()
                        };

                        // Broadcast message to all users
                        broadcast(userMessage);
                        
                        // Add to message history
                        messageHistory.push(userMessage);
                        if (messageHistory.length > MAX_HISTORY) {
                            messageHistory.shift();
                        }

                        console.log(`${connectedUsers[userId].username}: ${userMessage.message}`);
                    }
                    break;

                case 'ping':
                    // Keep-alive ping
                    ws.send(JSON.stringify({ type: 'pong' }));
                    break;

                default:
                    console.log('Unknown message type:', message.type);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    // Handle connection close
    ws.on('close', function close() {
        if (userId && connectedUsers[userId]) {
            const username = connectedUsers[userId].username;
            delete connectedUsers[userId];

            // Broadcast leave message
            const leaveMessage = {
                type: 'system',
                message: `${username} left the chat 👋`,
                timestamp: new Date().toISOString(),
                onlineCount: getOnlineCount()
            };
            
            broadcast(leaveMessage);
            
            // Add to message history
            messageHistory.push(leaveMessage);
            if (messageHistory.length > MAX_HISTORY) {
                messageHistory.shift();
            }

            console.log(`User ${username} disconnected. Online: ${getOnlineCount()}`);
        }
    });

    // Handle connection errors
    ws.on('error', function error(err) {
        console.error('WebSocket error:', err);
    });
});

// Generate unique user ID
function generateUserId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// Keep-alive ping every 30 seconds
setInterval(() => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.ping();
        }
    });
}, 30000);

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down chat server...');
    wss.clients.forEach(client => {
        client.close();
    });
    wss.close(() => {
        console.log('Chat server closed');
        process.exit(0);
    });
});
