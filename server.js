import app from "./app.js";
import dotenv from "dotenv";
import { __dirname } from "./app.js";
import mongoose from "mongoose";

// --- Debugging Start ---
// Construct the full path to the config file.
const envPath = `${__dirname}/config.env`;

// Log the path we are trying to use.
console.log(`Attempting to load environment variables from: ${envPath}`);

// Attempt to load the file and store the result.
const result = dotenv.config({ path: envPath });

// Check if there was an error loading the file.
if (result.error) {
    console.error("FATAL ERROR: Could not load .env file.", result.error);
} else {
    console.log(".env file loaded successfully.");
}
// --- Debugging End ---


mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => {
        console.error("Database connection failed.");
        console.error(err); // This will print the detailed error
    });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

