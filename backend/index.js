const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog-post');
const faqRouter = require('./routes/faq');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
	origin: 'http://localhost:8080',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true
}));

app.get('/', (request, response) => {
    response.send(`Welcome to the back-end of the kids guide application.`);
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', blogRouter); //pending for review
app.use('/faqs', faqRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
});