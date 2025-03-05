import { Project } from "../types/Project";

const STORAGE_KEY = "projects";

export class ProjectService {
  static getAll(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getById(id: string): Project | undefined {
    return this.getAll().find((projects) => projects.id === id);
  }

  static add(project: Project): void {
    const projects = this.getAll();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static update(updateProject: Project): void {
    let projects = this.getAll().map((project) =>
      project.id === updateProject.id ? updateProject : project
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static delete(id: string): void {
    let projects = this.getAll().filter((project) => project.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
}
