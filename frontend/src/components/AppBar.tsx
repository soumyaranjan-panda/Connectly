import { Link, useNavigate } from "react-router-dom";
import img from "../assets/OIG1.jpeg";

const AppBar = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate("/");
        localStorage.removeItem("token");
    };

    return (
        <div className="border-b flex justify-between items-center py-2 px-4 lg:px-10">
            <Link to={"/"} className="flex items-center">
                <img className="h-8 lg:h-10 w-8 lg:w-10" src={img} alt="" />
                <span className="ml-2 text-base lg:text-xl font-bold">Connectly</span>
            </Link>

            <div className="flex items-center gap-5">
                <Link
                    to={"/publish"}
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm lg:text-base px-4 lg:px-5 py-2 text-center"
                >
                    New Blog
                </Link>
                <button
                    className="text-sm lg:text-base font-medium hover:underline underline-offset-4"
                    onClick={clickHandler}
                >
                    Sign Out
                </button>
                <div className="hidden lg:block">
                    <ContactIcon />
                </div>
            </div>
        </div>
    );
};

const ContactIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        id="profile"
        className="h-6 w-6"
    >
        <g
            fill="none"
            fillRule="evenodd"
            stroke="#200E32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            transform="translate(4 2.5)"
        >
            <circle cx="7.579" cy="4.778" r="4.778"></circle>
            <path d="M0,16.2013731C-0.00126760558,15.8654831,0.0738531734,15.5336997,0.219695816,15.2311214C0.677361723,14.3157895,1.96797958,13.8306637,3.0389178,13.610984C3.81127745,13.4461621,4.59430539,13.3360488,5.38216724,13.2814646C6.84083861,13.1533327,8.30793524,13.1533327,9.76660662,13.2814646C10.5544024,13.3366774,11.3373865,13.4467845,12.1098561,13.610984C13.1807943,13.8306637,14.4714121,14.270023,14.929078,15.2311214C15.2223724,15.8479159,15.2223724,16.5639836,14.929078,17.1807781C14.4714121,18.1418765,13.1807943,18.5812358,12.1098561,18.7917621C11.3383994,18.9634099,10.5550941,19.0766219,9.76660662,19.1304349C8.57936754,19.2310812,7.38658584,19.2494317,6.19681255,19.1853548C5.92221301,19.1853548,5.65676678,19.1853548,5.38216724,19.1304349C4.59663136,19.077285,3.8163184,18.9640631,3.04807112,18.7917621C1.96797958,18.5812358,0.686515041,18.1418765,0.219695816,17.1807781C0.0745982583,16.8746908,-0.000447947969,16.5401098,0,16.2013731Z"></path>
        </g>
    </svg>
);

export default AppBar;
