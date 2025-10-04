import 'express-async-errors';
import express, { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';
import { CustomLogger } from './utils/customLogger';
import { CustomError } from '@/utils/customError';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/', router);

const errorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {

	if (err instanceof CustomError) {
		CustomLogger.error(err.message);
		res.status(err.statusCode).send({message: err.message, details: err.details,});
		return;
	}
	
	CustomLogger.error(err.message);
    res.status(500).send({ message: "Internal Server Error" });
};

app.use(errorHandler);

app.listen(port, () => {
	CustomLogger.info('Server started on port ' + port);
});