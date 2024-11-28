import React, { useEffect, useState } from "react";

const Details = () => {
  const [details, setDetails] = useState([]);

  const getDetails = async () => {
    const apiEndpoint = "http://localhost:5006/api/v1/details";
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();

      // Log the fetched data for debugging
      console.log("Fetched data:", data.data);

      // Update the state with the fetched data
      setDetails(data.data); // Ensure you're setting the correct data
    } catch (error) {
      console.log("Error fetching details:", error.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Details</h2>
      {details.length > 0 ? (
        <ul>
          {details.map((detail) => (
            <li
              key={detail._id}
              className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <p>
                <strong>Short ID:</strong> {detail.shortId}
              </p>
              <p>
                <strong>Redirect URL:</strong>{" "}
                <a
                  href={detail.redirectURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {detail.redirectURL}
                </a>
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(detail.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(detail.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No details available</p>
      )}
    </div>
  );
};

export default Details;
