const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const blogRouter = require('./routes/blog-post');
const faqRouter = require('./routes/faq');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.send(`Welcome to the back-end of the kids guide application.`);
});

app.use('/posts', blogRouter);
app.use('/faqs', faqRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
});