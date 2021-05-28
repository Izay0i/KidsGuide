const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const faqRouter = require('./routes/faq');

const whiteList = ['http://localhost:8080', 'https://imgur.com', 'https://www.youtube.com'];
const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.indexOf(origin) !== -1) {
			callback(null, true);
		}
		else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.send(`Welcome to the back-end of the kids guide application.`);
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter); //pending for review
app.use('/faqs', faqRouter); //ditto

app.listen(port, () => {
    console.log(`Server is running on port: ${port}.`);
});