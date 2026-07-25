import React, { useState } from "react";
import axios from "axios";


const Dashboard = () => {


    const [loading,setLoading] = useState(false);

    const [locationStatus,setLocationStatus] =
    useState("Not checked");



    const sendSOS = () => {


        setLoading(true);


        navigator.geolocation.getCurrentPosition(

            async(position)=>{


                try{


                    setLocationStatus("Location detected ✅");


                    const latitude =
                    position.coords.latitude;


                    const longitude =
                    position.coords.longitude;



                    const token =
                    localStorage.getItem("token");



                    await axios.post(

                        "http://127.0.0.1:5000/api/alerts",

                        {
                            latitude,
                            longitude
                        },


                        {

                            headers:{

                                Authorization:
                                `Bearer ${token}`

                            }

                        }

                    );



                    alert(
                        "🚨 SOS Alert Sent Successfully"
                    );


                }


                catch(error){


                    console.log(error);


                    alert(

                        error.response?.data?.message ||

                        "Failed to send SOS"

                    );


                }


                finally{

                    setLoading(false);

                }


            },


            ()=>{


                setLocationStatus(
                    "Location permission denied ❌"
                );


                alert(
                    "Enable location permission"
                );


                setLoading(false);


            }

        );


    };



    return (

        <div className="dashboard-container">


            <div className="welcome-card">


                <h1>
                    🚨 Silent SOS
                </h1>


                <p>
                    Your emergency safety companion
                    when speaking is not possible.
                </p>


            </div>



            <div className="status-container">


                <div className="status-card">

                    🟢

                    <h3>
                        System Status
                    </h3>

                    <p>
                        Ready
                    </p>

                </div>



                <div className="status-card">

                    📍

                    <h3>
                        Location
                    </h3>

                    <p>
                        {locationStatus}
                    </p>

                </div>



                <div className="status-card">

                    👥

                    <h3>
                        Emergency Contacts
                    </h3>

                    <p>
                        Active
                    </p>

                </div>


            </div>




            <div className="sos-section">


                <button

                    className="sos-button"

                    onClick={sendSOS}

                    disabled={loading}

                >

                    {
                        loading
                        ?
                        "Sending..."
                        :
                        <>
                        🚨
                        <br/>
                        SEND SOS
                        </>
                    }


                </button>



                <p>
                    Press during emergency
                </p>


            </div>


        </div>

    );

};


export default Dashboard;