import { FaDatabase, FaServer } from "react-icons/fa";
import { MdOutlineSettingsEthernet } from "react-icons/md";

function Header() {
  return (
    <header className="bg-white rounded-2xl shadow-md p-6 mb-6">

      <h1 className="text-4xl font-bold text-gray-800">
        AI Predictive Maintenance Platform
      </h1>

      <p className="text-gray-500 mt-2 text-lg">
        Real-Time Machine Health Monitoring
      </p>

      <div className="flex flex-wrap gap-6 mt-5">

        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <FaServer />
          FastAPI Connected
        </div>

        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <MdOutlineSettingsEthernet />
          Kafka Running
        </div>

        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <FaDatabase />
          PostgreSQL Connected
        </div>

      </div>

    </header>
  );
}

export default Header;