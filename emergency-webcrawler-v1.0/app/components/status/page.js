"use client";
import React, { useState } from "react";

const ScraperStatus = ({
  scrappedItems,
  verifiedItems,
  unverifiedItems,
  totalItems,
}) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = scrappedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //update tempdb
  const validate = async (id, data) => {
    const { newStatus } = data;
    alert(newStatus)
    try {
      const res = await fetch(`http://localhost:3000/api/scrape/${id}`, {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newStatus }),
      });
      if (!res.ok) {
        throw new Error("failed to update tempdb");
      }
      console.log("validate",res)
      // alert(res)

      return res.json();
    } catch (error) {
      console.log("errorloading tempdb", error);
    }
  };

  const handleAccept = async(index, id) => {
    // Implement logic for accepting an item
    const action = await validate(id, { newStatus: "Accepted" });
    // alert("Accept item at index" + index + id + action);
  };

  const handleReject = async(index, id) => {
    // Implement logic for rejecting an item
    const action = await validate(id, { newStatus: "Rejected" });

    // alert("Reject item at index" + index + id + action);
  };

  return (
    <div className="text-gray-800 max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded ">
      <h1 className="text-2xl text-gray-800 font-semibold mb-4">
        Scraper Status
      </h1>

      <div className="flex justify-between mb-4">
        <div>
          <strong>Total Items:</strong> {totalItems}
        </div>
        <div>
          <strong>Verified Items:</strong> {verifiedItems}
        </div>
        <div>
          <strong>Unverified Items:</strong> {unverifiedItems}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Scrapped Items</h2>

      <ul>
        {currentItems.map((item, index) => (
          <li key={index} className="mb-4 p-4 border border-gray-300 rounded">
            <strong>Accident Type:</strong> {item.accidentType}
            <br />
            <strong>Location:</strong> {item.location}
            <br />
            <strong>Date of Occurrence:</strong> {item.dateOfOccurance}
            <br />
            <strong>Time:</strong> {item.timeOfOcccurance}
            <br />
            <strong>Accident Details:</strong> {item.accidentDetails}
            <br />
            <div className="mt-2 flex items-center">
              <button
                className="bg-green-500 text-white p-2 rounded mr-2"
                onClick={() => handleAccept(index, item._id)}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleReject(index, item._id)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-4">
        <nav className="flex justify-center">
          {[...Array(Math.ceil(scrappedItems.length / itemsPerPage))].map(
            (_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

export default ScraperStatus;
