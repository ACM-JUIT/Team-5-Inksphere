const express = require('express');
const connectDB = require('./DB/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')

connectDB();

const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize())
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/blog', blogRoutes);



module.exports =app;