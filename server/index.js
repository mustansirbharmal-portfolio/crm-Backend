const express = require('express');
const db = require('./db/config');
const route = require('./controllers/route');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Setup Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Set up CORS

// API Routes
app.use('/api', route);

app.get('/', async (req, res) => {
    res.send('Welcome to my world...');
    // Uncomment this if you want to delete uploads on request
    /*
    const folderPath = './uploads';
    try {
        function removeFolderRecursive(folderPath) {
            if (fs.existsSync(folderPath)) {
                fs.readdirSync(folderPath).forEach(file => {
                    const curPath = path.join(folderPath, file);
                    if (fs.lstatSync(curPath).isDirectory()) {
                        removeFolderRecursive(curPath); // Recursive call for subdirectories
                    } else {
                        fs.unlinkSync(curPath); // Delete file
                    }
                });
                fs.rmdirSync(folderPath); // Remove empty directory
                console.log(`Folder ${folderPath} and its contents have been removed.`);
            }
        }
        removeFolderRecursive(folderPath);
        res.send({ message: `Folder ${folderPath} and its contents have been removed.` });
    } catch (err) {
        console.error(`Error removing folder: ${err.message}`);
        res.status(500).send({ message: `Error removing folder: ${err.message}` });
    }
    */
});

// Get port from environment and store in Express.
const PORT = process.env.PORT || 5001; // Render will assign a port, use 5001 as fallback

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL;
const DATABASE = process.env.DB;
db(DATABASE_URL, DATABASE);
