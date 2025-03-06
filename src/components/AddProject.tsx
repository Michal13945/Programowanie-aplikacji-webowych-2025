import { useState } from "react";
import { ProjectService } from "../services/ProjectService";
import { Project } from "../types/Project";

interface AddProjectProps {
  onProjectAdded: () => void;
}

const AddProject = (props: AddProjectProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleAdd() {
    if (name === "" || description === "") {
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: name,
      description: description,
    };

    ProjectService.add(newProject);

    setName("");
    setDescription("");
    props.onProjectAdded();
  }

  return (
    <div>
      <h3>Dodaj nowy projekt</h3>
      <input
        type="text"
        placeholder="Nazwa projektu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Opis projektu"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAdd}>Dodaj</button>
    </div>
  );
};

export default AddProject;
