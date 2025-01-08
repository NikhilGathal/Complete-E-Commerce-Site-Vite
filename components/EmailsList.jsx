import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./EmailsList.css"; // External CSS for dark and light mode styles

const EmailsList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [, dark] = useOutletContext();

  useEffect(() => {
    // Simulate retrieving emails from localStorage
    const storedEmails = JSON.parse(localStorage.getItem("emails")) || [];
    setEmails(storedEmails);
    setTimeout(()=>
    {
      setLoading(false);
    } ,900)
     // Set loading to false once the emails are fetched
  }, []);

  return (
    <div className={`emails-list-container ${dark ? "dark" : ""}`}>
      {loading ? (
       <div className="admin">  <h1>Loading Emails...</h1> </div>  // Display loading message while emails are being fetched
      ) : emails.length === 0 ? (
       <div className="admin">  <h1>No Emails Found</h1>  </div> // Display no emails message if the list is empty
      ) : (
        <>
          <h2 className="emails-list-heading">Email List</h2>
          <div className="emails-table-container">
            <table className="emails-table">
              <thead>
                <tr className="emails-table-header">
                  <th>Sr No.</th>
                  <th>Email Address</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email, index) => (
                  <tr key={index} className="emails-table-row">
                    <td>{index + 1}</td>
                    <td>{email}</td>
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

export default EmailsList;
