import React, { useState } from "react";

const App = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  // Function to shorten the URL
  const handleSetLongUrl = async () => {
    const apiUrl = `http://localhost:8003/api/v1/shorten`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error("Error shortening the URL:", error);
    }
  };

  // Function to redirect to the original URL
  const redirectToMainUrl = async () => {
    if (!shortUrl) {
      console.error("No short URL provided");
      return;
    }

    const api = `http://localhost:8003/api/v1/shortUrl`;

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shortUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch main URL");
      }

      const data = await response.json();

      // Redirect to the original URL
      if (data.longUrl) {
        window.location.href = data.longUrl;
      } else {
        console.error("No long URL found in response");
      }
    } catch (error) {
      console.error("Error redirecting to the main URL:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-10 px-5">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">
          URL Shortener
        </h1>
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Paste the URL to be shortened
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={longUrl}
              placeholder="Enter the link here"
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
            <button
              className="bg-indigo-500 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-all"
              onClick={handleSetLongUrl}
            >
              Shorten URL
            </button>
          </div>
        </div>
        <div className="text-center">
          {shortUrl && (
            <div className="bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg">
              Shortened URL:{" "}
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-green-900 transition-all"
              >
                {shortUrl}
              </a>
              <button
                className="ml-4 bg-blue-500 text-white font-medium px-4 py-1 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                onClick={redirectToMainUrl}
              >
                Redirect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
