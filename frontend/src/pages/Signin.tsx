import Quote from "../components/Quote";
import Auth from "../components/Auth";

const Signin = () => {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1">
            <div>
                <Auth type="signin" />
            </div>
            <div className="none md:block">
                <Quote />
            </div>
        </div>
    );
};

export default Signin;
