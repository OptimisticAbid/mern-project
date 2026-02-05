import "dotenv/config";
import app from "./app.js";
import { connectDb } from "./db/index.js";

const PORT = process.env.PORT || 8000;
// console.log(process.env.DB_NAME );


async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();

