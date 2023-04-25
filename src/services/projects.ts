import assert from "assert";
import crypto from "crypto";
import db from "@app/db/index.js";
import { readWriteService, readService } from "@app/db/helpers.js";
import { Project } from "@app/models/project.js";
import { getResponseWithCollection } from "./helpers.js";

export const getAllProjects = readService(() => {
  return getResponseWithCollection(db.chain.get("projects").value());
});

export const getProjectById = readService((id: Project["id"]) => {
  return db.chain.get("projects").find((item) => item.id === id);
});

export const createProject = readWriteService((name: Project["name"]) => {
  assert(
    !db.chain
      .get("projects")
      .find((project) => project.name === name)
      .value(),
    new Error("Project already exists")
  );
  return db.chain
    .get("projects")
    .push({ id: crypto.randomUUID(), name })
    .value();
});

export const updateProject = readWriteService(({ id, name }: Project) => {
  assert(
    !db.chain
      .get("projects")
      .find((project) => project.name === name)
      .value(),
    "Project already exists"
  );

  const project = db.chain.get("projects").find((project) => project.id === id);

  assert(project.value(), "Project doesnt exist");

  project.set("name", name).value();

  return project.value();
});

export const deleteProject = readWriteService((id: Project["id"]) => {
  return db.chain
    .get("projects")
    .remove((project) => project.id === id)
    .value();
});
