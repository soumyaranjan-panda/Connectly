import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput, SigninInput } from "@soumrnjn/connectly-common/dist";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import LinearIndeterminate from "./Loader";

type authProp = {
    type: "signin" | "signup";
};

const Auth = ({ type }: authProp) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function sendRequest() {
        setLoading(true);
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${
                    type == "signin" ? "signin" : "signup"
                }`,
                postInput
            );
            const jwt = response.data;
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs");
        } catch (e) {
            console.log("Some error");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }
    type InputType = typeof type extends "signin" ? SigninInput : SignupInput;
    {
        /*typeof type = signin | signup extends"signin means mactching*/
    }
    const [postInput, setPostInput] = useState<InputType>({
        email: "",
        password: "",
    });
    return (
        <div className="h-screen flex justify-center flex-col lg:p-20 md:p-12 sm:p-4">
            <div className=" flex items-center flex-col">
                <div className=" text-4xl font-bold">
                    {type == "signin" ? "Sign In" : "Sign Up"}
                </div>
                <div className=" w-full p-12">
                    {type == "signin" ? (
                        ""
                    ) : (
                        <LabelledInput
                            label={"Name"}
                            placeholder={"Name: Optional"}
                            onChange={(e) => {
                                setPostInput({
                                    ...postInput,
                                    name: e.target.value,
                                });
                            }}
                        />
                    )}
                    <LabelledInput
                        label={"Email"}
                        placeholder={"Email: soumya@gmail.com"}
                        onChange={(e) => {
                            setPostInput({
                                ...postInput,
                                email: e.target.value,
                            });
                        }}
                    />
                    <LabelledInput
                        label={"Password"}
                        placeholder={"Password: minimun 8 letters"}
                        onChange={(e) => {
                            setPostInput({
                                ...postInput,
                                password: e.target.value,
                            });
                        }}
                        type={"password"}
                    />
                    {/* c=>({ email: e.target.value, password: ""}) === {...postInput, email:e.target.value}*/}
                    <button
                        onClick={sendRequest}
                        className=" mt-10 bg-black py-2 rounded-lg text-white w-full font-semibold text hover:bg-gray-900"
                    >
                        {type == "signin" ? "Signin" : "Signup"}
                    </button>
                    <div>{loading ? "" : <div className=" w-full h-[4px]"></div>}</div>
                    {loading && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "0px",
                            }}
                        >
                            <LinearIndeterminate />
                        </Box>
                    )}
                    <div className=" text-slate-500 w-full text-center">
                        {type == "signin"
                            ? "Don't Have an account?"
                            : "Already have an account?"}
                        <Link
                            className=" pl-2 text-slate-950 hover:underline"
                            to={type == "signin" ? "/signup" : "/signin"}
                        >
                            {type == "signin" ? "Signup" : "Signin"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabelledInputType) {
    return (
        <div className=" w-full my-2">
            <label className="block mb-1 text-md font-normal text-gray-900">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export default Auth;
