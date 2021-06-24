const express = require('express');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');
const app = express();
const port = process.env.PORT || 3000;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const quizRouter = require('./routes/quiz');
const reportRouter = require('./routes/report');
const faqRouter = require('./routes/faq');
const imageRouter = require('./routes/image');
const favRouter = require('./routes/favorite');

const whiteList = ['http://localhost:8080', 'http://localhost:3000', 'https://kynangsong.herokuapp.com', 'https://www.youtube.com'];
const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.includes(origin) || !origin) { //!origin allows REST tools and server2server interaction
			callback(null, true);
		}
		else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
	//maxAge: 600 //10 minutes
};

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(history());

app.use(staticFileMiddleware);
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/quizzes', quizRouter);
app.use('/reports', reportRouter);
app.use('/faqs', faqRouter);
app.use('/images', imageRouter);
app.use('/favorites', favRouter);

app.get('/', (request, response) => {
    response.render(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}.`);
});