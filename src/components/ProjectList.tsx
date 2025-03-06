import { useState, useEffect } from "react";
import { Project } from "../types/Project";
import { ProjectService } from "../services/ProjectService";
import AddProject from "./AddProject";
import DeleteProject from "./DeleteProject";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    setProjects(ProjectService.getAll());
  }, []);

  function refreshProjects() {
    setProjects(ProjectService.getAll());
  }

  function startEditing(project: Project) {
    setEditingId(project.id);
    setEditName(project.name);
    setEditDescription(project.description);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  }

  function saveEdit() {
    if (editName === "" || editDescription === "" || editingId === null) {
      return;
    }

    const updatedProject: Project = {
      id: editingId,
      name: editName,
      description: editDescription,
    };

    ProjectService.update(updatedProject);
    cancelEditing();
    refreshProjects();
  }

  return (
    <div>
      <h2>Lista projektów</h2>
      <AddProject onProjectAdded={refreshProjects} />

      <ul>
        {projects.map((project) => {
          if (editingId === project.id) {
            return (
              <li key={project.id}>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={saveEdit}>Zapisz</button>
                <button onClick={cancelEditing}>Anuluj</button>
              </li>
            );
          } else {
            return (
              <li key={project.id}>
                {project.name} - {project.description}
                <button onClick={() => startEditing(project)}>Edytuj</button>
                <DeleteProject
                  id={project.id}
                  onProjectDeleted={refreshProjects}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ProjectList;
