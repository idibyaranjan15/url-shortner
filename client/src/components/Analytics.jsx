import React, { useState } from "react";

const Analytics = () => {
  const [shortId, setShortId] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  const getAnalytics = async () => {
    try {
      const apiEndPoint = `http://localhost:5006/api/v1/url/${shortId}`;

      const response = await fetch(apiEndPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong");
        return;
      }

      const data = await response.json();
      setAnalytics(data);
      setError("");
    } catch (error) {
      console.error("Error getting analytics", error);
      setError("Failed to fetch analytics. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <p className="mb-6 text-sm text-gray-600">
        View detailed analytics for a shortened link.
      </p>
      <input
        type="text"
        placeholder="Enter your short ID"
        value={shortId}
        onChange={(e) => setShortId(e.target.value)}
        className="w-full p-3 border rounded-md text-sm text-gray-800"
      />
      <button
        onClick={getAnalytics}
        className="w-full mt-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
      >
        Get Analytics
      </button>
      {analytics && (
        <div className="mt-4">
          <p className="text-sm font-semibold">
            Total Clicks: {analytics.totalClicks}
          </p>
          <h3 className="mt-2 font-semibold text-gray-800">Visit History:</h3>
          <ul className="list-disc pl-4 text-sm">
            {analytics.analytics.map((visit, index) => (
              <li key={index}>{new Date(visit.timestamp).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Analytics;
