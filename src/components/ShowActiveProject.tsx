import { ProjectService } from "../API/ProjectService";
import { Link } from "react-router";

const ShowActiveProject = () => {
  const active = ProjectService.getActive();
  const activeProject = ProjectService.getById(active!);

  return (
    <div className="w-max bg-[#1f1f1f] flex flex-col items-center justify-center text-white">
      <div className="bg-[#1f1f1f] flex flex-col items-center justify-center text-white">
        <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-xl">
          <div className="space-y-6">
            <div className="text-lg font-semibold text-gray-300">
              <span className="text-cyan-400">Nazwa:</span>{" "}
              {activeProject?.name}
            </div>
            <div className="text-lg font-semibold text-gray-300">
              <span className="text-cyan-400">Opis:</span>{" "}
              {activeProject?.description}
            </div>
            <div className="w-40 mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold">
              <Link to={"/AddStory"}>Dodaj historyjkę</Link>
            </div>
            <div className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold">
              <Link to={"/"}>Menu</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowActiveProject;
