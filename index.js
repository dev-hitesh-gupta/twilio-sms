const twilio = require('twilio');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const {TWILIO_PHONE_NUMBER,ACCOUNT_SID,AUTH_TOKEN} = process.env;
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
const twilio_number  = TWILIO_PHONE_NUMBER;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
function responses(message) {
    const RESPONSES = {
        "HI": "HELLO",
        "How are you": "I am fine, thank you!",
    }

    const response = RESPONSES[message];
    return response ?? "Invalid Message."
}

function sendMessage(body, to) {
    return client.messages
        .create({
            body: body,
            from: twilio_number,
            to: to
        })
        .then(message => console.log('Message sent:', message.sid))
        .catch(error => console.log('Error sending message:', error));
}

sendMessage('Hello','+918559093899')
app.post('/sms', (req, res) => {
    const messageBody = req.body.Body;
    const fromNumber = req.body.From;

    console.log('Received message:', messageBody, 'from:', fromNumber);

    sendMessage(responses(messageBody),fromNumber);
    // You can process the received message here

    res.end();
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
