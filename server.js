import expreess from "express";
import routes from "./src/routes/postsRoutes.js";

const app = expreess();
app.use(expreess.static("uploads"));
routes(app);

app.use(expreess.json());

app.listen(3000, () => {
	console.log("Servidor escutando");
});
