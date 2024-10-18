import React, { useState, useEffect } from "react";
import "./RideMonitoring.css";

const RideMonitoring = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching ride progress data from the server
    const fetchRides = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rides");
        if (!response.ok) {
          throw new Error("Failed to fetch rides");
        }
        const data = await response.json();
        setRides(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ride-monitoring-container">
      <h1>Ride Monitoring</h1>
      <table className="ride-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver</th>
            <th>Rider</th>
            <th>Pickup Location</th>
            <th>Destination Location</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride.id}>
              <td>{ride.id}</td>
              <td>{ride.driver_name}</td>
              <td>{ride.rider_name}</td>
              <td>{ride.pickup_location}</td>
              <td>{ride.destination_location}</td>
              <td>{ride.progress}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RideMonitoring;
