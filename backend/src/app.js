require('dotenv').config();
const express = require('express');
const connectDB = require('./DB/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')

connectDB();

const app = express();
app.use(compression())
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/blog', blogRoutes);



module.exports =app;