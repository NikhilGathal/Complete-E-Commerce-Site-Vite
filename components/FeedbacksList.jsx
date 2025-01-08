import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./FeedbacksList.css";

const FeedbacksList = () => {
  const [, dark] = useOutletContext(); // Get dark mode value
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    // Simulate retrieving feedback array from localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(storedFeedbacks);
    setTimeout(()=>
      {
        setLoading(false);
      } ,900)// Set loading to false once feedbacks are fetched
  }, []);

  return (
    <div className={`feedbacks-container ${dark ? "dark" : ""}`}>
      {loading ? (
        <div className="admin"> <h1>Loading Feedbacks...</h1> </div> // Display loading message while feedbacks are being fetched
      ) : feedbacks.length === 0 ? (
        <div className="admin"> <h1>No Feedbacks Found</h1>  </div>// Display no feedbacks message if the list is empty
      ) : (
        <>
          <h2 className="feedbacks-heading">Feedbacks List</h2>
          <div className="table-container">
            <table className="feedbacks-table">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{feedback.name}</td>
                    <td>{feedback.email}</td>
                    <td>{feedback.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbacksList;





