import express from "express";
import morgan from "morgan";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import NotesRoutes from "./routes/NotesRoutes.js";
import dbConnect from "./config/db.js";

//rest object
const app = express();

//db
dbConnect();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1/notes", NotesRoutes);

//error handler
app.use(errorMiddleware);

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
