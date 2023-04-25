import express from "express";
import projectsRoutes from "./routes/projects.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use("/projects", projectsRoutes);

app.listen(3003, () => {
  console.log("App is listening");
});
