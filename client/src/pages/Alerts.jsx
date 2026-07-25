import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Alerts() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {

    try {

      const res = await API.get("/alerts");

      setAlerts(res.data.alerts);

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">🚨 Alert History</h2>

        {alerts.length === 0 ? (

          <div className="alert alert-info">
            No alerts found.
          </div>

        ) : (

          <div className="row">

            {alerts.map((alert) => (

              <div className="col-md-6 mb-4" key={alert._id}>

                <div className="card shadow">

                  <div className="card-body">

                    <h5 className="card-title">
                      🚨 SOS Alert
                    </h5>

                    <p>
                      <strong>Status:</strong> {alert.status}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(alert.createdAt).toLocaleString()}
                    </p>

                    <p>
                      <strong>Latitude:</strong> {alert.latitude}
                    </p>

                    <p>
                      <strong>Longitude:</strong> {alert.longitude}
                    </p>

                    <a
                      href={`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-success"
                    >
                      View on Google Maps
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );

}

export default Alerts;