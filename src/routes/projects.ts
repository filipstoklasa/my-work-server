import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getAllProjects,
  updateProject,
} from "@app/services/projects.js";

const projectsRoutes = Router();

projectsRoutes.get("/", (_, res) => res.send(getAllProjects()));

projectsRoutes.post<{}, {}, { name: string }>("/", (req, res) =>
  res.send(createProject(req.body.name))
);

projectsRoutes.get<{ id: string }>("/:id", (req, res) =>
  res.send(getProjectById(req.params.id))
);

projectsRoutes.put<{ id: string }, {}, { name: string }>("/:id", (req, res) =>
  res.send(updateProject({ id: req.params.id, name: req.body.name }))
);

projectsRoutes.delete<{ id: string }>("/:id", (req, res) =>
  res.send(deleteProject(req.params.id))
);

export default projectsRoutes;
