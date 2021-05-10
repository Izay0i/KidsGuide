const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const blog = require('./api/post-queries');
const faq = require('./api/faq-queries');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.send(`Welcome to the back-end of the kids guide application.`);
});

app.get('/blogs', blog.getBlogPosts);
app.get('/blog/:id', blog.getBlogPostByID);
app.get('/blog', blog.getBlogPostByTitle);
app.post('/blogs', blog.createBlogPost);
app.delete('/blog/:id', blog.deleteBlogPost);

app.get('/faqs', faq.getFaqs);
app.get('/faq/:id', faq.getFaqByID);
app.get('/faq', faq.getFaqByQuestion);
app.post('/faqs', faq.createFaq);
app.delete('/faq/:id', faq.deleteFaq);

app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
})
.on('error', error => {
	console.log('App on error: ', error);
});