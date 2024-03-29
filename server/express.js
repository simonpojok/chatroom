import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import Template from "../template";
import userRoutes from './routers/user.routes';
import authRoutes from './routers/auth.routes';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/', userRoutes);
app.use('/', authRoutes);
app.get('/', (req, res) => {
    res.status(200).send(Template());
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            "message": err.name + " : " + err.message
        });
    }
});
export  default app;
