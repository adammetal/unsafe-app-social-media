import { config } from "dotenv";
import app from "./src/server.js";

// reads the .env files
config();

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`App is runnig on ${PORT}`);
});
