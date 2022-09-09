const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
// set the databases and make variant to use 
const database = new sqlite3.Database('./database/db.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error('Database opening error: ', err);
});

// get the message from app.js 
ipcMain.on('asynchronous-message', (event, arg) => {
    const sql = arg;
    database.all(sql, (err, rows) => {
        event.reply('asynchronous-reply', (err && err.message) || rows);
      
    });
});
