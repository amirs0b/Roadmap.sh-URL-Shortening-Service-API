import express from 'express';
import cors from 'cors';
import {fileURLToPath} from "url";
import path from "path";
import morgan from "morgan";
import {catchError, HandleERROR} from "vanta-api";
import exportValidation from "./Middlewares/ExportValidation.js";
import authRouter from "./Routes/Auth.js";
import userRouter from "./Routes/User.js";
import urlRouter from "./Routes/Url.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.js';


const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.static('Public'))
app.use("/api/auth", authRouter);
app.use(exportValidation);


app.use("/api/users", userRouter);
app.use("/api/url",urlRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));




app.use((res, req, next) => {
    return next(new HandleERROR("Not found", 404))
})
app.use(catchError)
export default app;