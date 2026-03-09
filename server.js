const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.static(__dirname)); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Allow large PDF strings

app.post('/send-pdf', async (req, res) => {
    const { pdf, email } = req.body;

    // IMPORTANT: Replace with your actual SMTP details
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'gdsa677@gmail.com',
            pass: 'vyldqtqevpxzqqfr' // Use an App Password, not your login password
        }
    });

    let mailOptions = {
        from: 'YOUR_EMAIL@gmail.com',
        to: email,
        subject: 'Your Converted PDF',
        text: 'Attached is your compressed PDF file.',
        attachments: [{
            filename: 'converted.pdf',
            content: pdf,
            encoding: 'base64'
        }]
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to send email.');
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));