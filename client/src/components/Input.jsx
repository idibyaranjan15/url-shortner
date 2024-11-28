import React, { useEffect, useState } from "react";
import Details from "./Details";

const Input = () => {
  const [value, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShortUrl = async () => {
    const urlEndPoint = "http://localhost:5006/api/v1/url";

    try {
      const response = await fetch(urlEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: value }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong");
        return;
      }

      const data = await response.json();
      setShortUrl(`http://localhost:5006/api/v1/${data.id}`);
      setError("");
    } catch (error) {
      console.error("Error in sending data", error);
      setError("Failed to shorten the URL. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Shorten a long link</h2>
      <p className="mb-6 text-sm text-gray-600">No credit card required.</p>
      <input
        type="text"
        placeholder="https://example.com/my-long-url"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 border rounded-md text-sm text-gray-800"
      />
      <button
        onClick={handleShortUrl}
        className="w-full mt-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
      >
        Get your link for free →
      </button>
      {shortUrl && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-800">Shortened URL:</p>
          <a href={shortUrl} className="text-blue-500 underline">
            {shortUrl}
          </a>
        </div>
      )}
      <div>
        <Details />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
