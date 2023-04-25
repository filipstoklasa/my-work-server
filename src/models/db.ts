import { Project } from "@app/models/project.js";

export interface DB {
  projects: Array<Project>;
}
