import { Link, useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };


    return (

        <nav className="navbar">

            <div className="nav-container">


                <Link 
                    className="logo"
                    to="/dashboard"
                >
                    🚨 Silent SOS
                </Link>



                <div className="nav-links">


                    <Link to="/dashboard">
                        Dashboard
                    </Link>


                    <Link to="/contacts">
                        Contacts
                    </Link>


                    <Link to="/alerts">
                        Alerts
                    </Link>



                    <button 
                        onClick={logout}
                    >
                        Logout
                    </button>


                </div>


            </div>

        </nav>

    );

}


export default Navbar;