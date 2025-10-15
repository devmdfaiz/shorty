import "dotenv/config";
import app from "./infrastructure/http/http.js";
import env from "./shared/config/env.js";

app.listen(env.PORT, () => {
	console.log(`Shorty is running on http://localhost:${env.PORT}`);
});
