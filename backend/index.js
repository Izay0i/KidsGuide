const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const quizRouter = require('./routes/quiz');
const faqRouter = require('./routes/faq');
const imageRouter = require('./routes/image');

const whiteList = ['http://localhost:8080', 'https://www.youtube.com'];
const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.indexOf(origin) !== -1 || !origin) { //!origin allows REST tools and server2server interaction
			callback(null, true);
		}
		else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
	maxAge: 600 //10 minutes
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.get('/', (request, response) => {
    response.send(`Welcome to the back-end of the kids guide application. ${request.protocol}`);
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter); //pending for review
app.use('/quizzes', quizRouter);
app.use('/faqs', faqRouter);
app.use('/images', imageRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}.`);
});