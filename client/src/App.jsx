import React from "react";
import Input from "./components/Input";
import Analytics from "./components/Analytics";
import Details from "./components/Details";

const App = () => {
  return (
    <div className="bg-blue-900 min-h-screen flex flex-col md:flex-row items-center md:items-start justify-center p-4 md:p-8 text-white gap-8">
      <div className="flex flex-col items-center w-full md:w-2/3">
        <h1 className="text-4xl font-bold mb-6">URL Shortener</h1>
        <div className="bg-white text-black p-6 rounded-lg shadow-xl w-full">
          <Input />
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-xl w-full mt-6">
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default App;
