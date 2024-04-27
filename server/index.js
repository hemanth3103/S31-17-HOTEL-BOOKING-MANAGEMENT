const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { expressjwt: exjwt } = require('express-jwt');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const uri = 'mongodb+srv://Hemanth:Hemanth@cluster0.dimp4zi.mongodb.net/your_database_name?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) {
        console.error('Failed to connect to MongoDB Atlas:', err);
        return;
    }
    console.log('Connected to MongoDB Atlas');
    const db = client.db('Hemanth'); // Replace 'your_database_name' with your actual database name
    const contactsCollection = db.collection('contactus');

    // JWT Configuration
    const secretkey = 'abcd';
    const algorithm = 'HS256';
    const jwtmw = exjwt({ secret: secretkey, algorithms: [algorithm] });

    // Route to create new contacts
    app.post('/contacts', jwtmw, async (req, res) => {
        try {
            const newContact = req.body;
            const insertedContact = await contactsCollection.insertOne(newContact);
            res.json(insertedContact.ops[0]);
        } catch (error) {
            console.error('Error inserting contact:', error);
            res.status(500).json({ error: 'Failed to insert contact' });
        }
    });

    // Add other CRUD operations here (GET, PUT, DELETE)
});

app.listen(8081, () => {
    console.log('Server running on port 8081');
});
