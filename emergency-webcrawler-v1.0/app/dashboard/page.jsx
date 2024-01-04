// "use client";
// Dashboard.js

import React
// { useState, useEffect }
 from "react";
import ScrapeForm from "../components/form/page";
import ScraperStatus from "../components/status/page";
import Navbar from "../components/navbar/page"; // Adjust the import path based on your project structure

const fetchedScrappedItems =async ()=>{
try{
 const res =  await fetch("http://localhost:3000/api/scrape/fetch", {
      method: "GET",
      cache:"no-store",
    })
      if(!res.ok){
        throw new Error("failed to fetch tempdb")
      }
// console.log("try",res.json())
// alert(res)

   
      return res.json();
}catch(error){
console.log("errorloading tempdb", error)
}}

export default async function Dashboard() {

let totalQueries=0;
  const scrappedItems=await fetchedScrappedItems();
//  setScrappedItems(newdata);
//     setTotalQueries((prevTotal) => prevTotal + 1);
console.log("test daa", scrappedItems)
// const scrappedItems = data;
 

 
  const handleRefresh = () => {
    // Implement logic to refresh data (fetch new data, reset counts, etc.)
    totalQueries((prevTotal) => prevTotal + 1);
  };

  return (
    <div>
      {/* <Navbar totalQueries={totalQueries} onRefresh={handleRefresh} /> */}
      <div className="flex">
        <div className="w-1/2 p-4">
          <ScrapeForm />
        </div>
        <div className="w-1/2 p-4">
          {scrappedItems.data != null ?
          <ScraperStatus
            // totalItems={totalItems}
            // verifiedItems={verifiedItems}
            // unverifiedItems={unverifiedItems}
            scrappedItems={scrappedItems.data}
          /> : "No data yet"}
        </div>
      </div>
    </div>
  );
}


