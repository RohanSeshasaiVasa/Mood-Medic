 // server.js
 const WebSocket = require('ws');
 const wss = new WebSocket()

 let players = {}; // { id: { ws, name, status, opponentId } }

 function broadcastPlayerList() {
   const list = Object.entries(players).map(([id, p]) => ({
     id, name: p.name, status: p.status
   }));
   for (const id in players) {
     players[id].ws.send(JSON.stringify({ type: 'playerList', list }));
   }
 }

 wss.on('connection', function connection(ws) {
   const id = Math.random().toString(36).substr(2, 9);
   players[id] = { ws, name: 'Guest-' + id.slice(-4), status: 'online', opponentId: null };

   ws.send(JSON.stringify({ type: 'yourId', id, name: players[id].name }));
   broadcastPlayerList();

   ws.on('message', function incoming(message) {
     let data;
     try { data = JSON.parse(message); } catch { return; }

     if (data.type === 'setName') {
       players[id].name = data.name;
       broadcastPlayerList();
     }
     if (data.type === 'invite') {
       const target = players[data.targetId];
       if (target) {
         target.ws.send(JSON.stringify({ type: 'invite', from: id, name: players[id].name }));
       }
     }
     if (data.type === 'acceptInvite') {
     const opponent = players[data.from];
     if (opponent) {
     players[id].status = 'in-game';
     players[data.from].status = 'in-game';
     players[id].opponentId = data.from;
     players[data.from].opponentId = id;
     broadcastPlayerList();
     // Assign roles randomly
     const roles = Math.random() < 0.5 ? ['hunter', 'prey'] : ['prey', 'hunter'];
     players[id].role = roles[0];
     players[data.from].role = roles[1];
       players[id].ws.send(JSON.stringify({ type: 'startGame', role: roles[0], opponentId: data.from }));
         players[data.from].ws.send(JSON.stringify({ type: 'startGame', role: roles[1], opponentId: id }));
        }
      }
     if (data.type === 'gameUpdate') {
       const opponentId = players[id].opponentId;
       if (opponentId && players[opponentId]) {
         players[opponentId].ws.send(JSON.stringify({ type: 'gameUpdate', state: data.state }));
       }
     }
     if (data.type === 'endGame') {
     const opponentId = players[id].opponentId;
     if (opponentId && players[opponentId]) {
     // Determine correct winner/loserId for each player
     let winner = data.winner;
     // The sender is always the one who triggered the end, so their loserId is data.loserId
     // The opponent's loserId should always be their own id
     let oppWinner = data.winner;
     let oppLoserId = opponentId;
     players[opponentId].ws.send(JSON.stringify({
     type: 'endGame',
     winner: oppWinner,
     loserId: oppLoserId
     }));
     players[id].ws.send(JSON.stringify({
     type: 'endGame',
     winner: winner,
     loserId: data.loserId
     }));
     players[opponentId].status = 'online';
     players[opponentId].opponentId = null;
      players[opponentId].role = null;
     }
     players[id].status = 'online';
      players[id].opponentId = null;
      players[id].role = null;
     broadcastPlayerList();
     }
     if (data.type === 'replayInvite') {
       const target = players[data.targetId];
       if (target) {
         target.ws.send(JSON.stringify({ type: 'replayInvite', from: id, fromName: players[id].name }));
       }
     }
     if (data.type === 'replayResponse') {
       const target = players[data.targetId];
       if (target) {
         if (data.accepted) {
           // Set both players back to in-game status
           players[id].status = 'in-game';
           players[data.targetId].status = 'in-game';
           players[id].opponentId = data.targetId;
           players[data.targetId].opponentId = id;
           broadcastPlayerList();

           // Switch roles for fair replay
           const roles = players[id].role === 'hunter' ? ['prey', 'hunter'] : ['hunter', 'prey'];
           players[id].role = roles[0];
           players[data.targetId].role = roles[1];

           // Notify both players to start the replay
           players[id].ws.send(JSON.stringify({ type: 'replayStart', role: roles[0] }));
           players[data.targetId].ws.send(JSON.stringify({ type: 'replayStart', role: roles[1] }));
         } else {
           // Notify the requester that replay was rejected
           target.ws.send(JSON.stringify({ type: 'replayResponse', accepted: false }));
         }
       }
     }
   });

   ws.on('close', function () {
     const opponentId = players[id]?.opponentId;
     if (opponentId && players[opponentId]) {
       players[opponentId].ws.send(JSON.stringify({ type: 'endGame' }));
       players[opponentId].status = 'online';
       players[opponentId].opponentId = null;
     }
     delete players[id];
     broadcastPlayerList();
   });
 });

 console.log('WebSocket server running on ws://localhost:8083');