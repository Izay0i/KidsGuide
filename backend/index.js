const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const faq = require('./api/faq-queries');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/faqs', faq.getFaqs);
app.get('/faqs/:id', faq.getFaqByID);
app.get('/faq', faq.getFaqByQuestion);
app.post('/faqs', faq.createFaq);
app.delete('/faqs/:id', faq.deleteFaq);

app.get('/', (request, response) => {
    response.send(`Welcome to the back-end of the kids guide application.`);
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
});