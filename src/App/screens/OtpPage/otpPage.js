import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grati_logo from "../../../Assets/images/icons/gratiFullLogo.png";
import "../login/login.css";
// import "./reset_password.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { otpVerification, forgetPassword } from "../../API/authApi";


const OtpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    const handleChange = (code) => setCode(code);

    const renderInput = (input, i) => {
        return (
            <input
                {...input}
                key={i}
                type="text"
                maxLength="1"
                style={{
                    border: "1px solid #C7C6C6",
                    borderRadius: "8px",
                    width: "56px",
                    height: "56px",
                    fontSize: "25px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue",
                    textAlign: "center",
                    marginLeft: "10px",
                    marginRight: "10px"
                }}
                className="otp-input"
            />
        );
    };
    const handleSendAgain = async () => {
        console.log("clickeddd")
        const data = {
            email: sessionStorage.getItem("email"),
            // email: formData.email,
        };
        const response = await forgetPassword(data)
        // console.log(response,"hhhhhhhhhh");
        if (response) {
            if (response.status === 200) { // Login success
                toast.success("OTP sent successfully again");
            }
            else {

                toast.error(response);
            }
        }
    }
    const handleLogin = async () => {
        try {
            const data = {
                email: sessionStorage.getItem("email"),
                otp: code,
            };
            if (data.otp === '') {
                toast.error("Please enter OTP");
                return;
            }
            const response = await otpVerification(data)
            // console.log(response,"hhhhhhhhhh");
            if (response) {
                if (response.status === 200) {
                    console.log(response.data.message);
                    navigate("/resetpassword");
                    toast.success("OTP has been verified")
                } else if (response.status === 400) {
                    toast.error(response.err.response.data.message)

                    // if (response.err.response.data.message === "Otp has expired")
                    //     navigate("/forgetpassword")
                    console.log(response, "jjjj");
                    console.log("Otp Verification failed. Response status:", response.err.response.data.message);
                }
            }
            else {
                alert("Response is undefined.");
            }
        } catch (error) {
            console.error("API request error:", error);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle form submission here
        console.log("Form Data:", sessionStorage.getItem("email"));
        console.log("OTP:", code);
        handleLogin();
    };

    const [timer, setTimer] = useState(60); // Initial timer value in seconds
    const [trackResetTime, setTrackResetTime] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setTrackResetTime(true);
            setIsResendDisabled(false);
        }
    }, [timer]);

    const handleResendClick = () => {
        // Implement your resend OTP logic here
        // For example, make a request to your backend to send a new OTP
        // You can also update the timer here
        setIsResendDisabled(true);
        setTrackResetTime(false);
        if(trackResetTime)
         handleSendAgain();
        setTimer(60); // Reset the timer to 60 seconds
    };


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            className="gradient"
        >
            <div className="upperCircle  h-[847px] -top-[398px] -left-[250px] opacity-40  absolute">
                <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full -top-[398px] -left-[6px] fixed" style={{
                    opacity: "20%", zIndex: 0
                }}></div>
                <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full -top-[351px] -left-[250px] fixed " style={{
                    opacity: "20%", zIndex: 0
                }}></div>
            </div>

            {/* <div className="lowerCircle  h-[847px] top-[507px] left-[1378px] opacity-40 absolute">
                <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full top-[507px] left-[1622px] fixed" style={{
                    opacity: "20%", zIndex: 0,
                }}></div>
                <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full top-[554px] left-[1378px] fixed" style={{
                    opacity: "20%", zIndex: 0, overflow: "hidden"
                }}></div>
            </div> */}
            <div className="lowerCircle  h-[847px] top-[67vh] left-[1378px] opacity-40 absolute">
                <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full top-[61vh] left-[77vw] fixed" style={{
                    opacity: "20%", zIndex: 0,
                }}></div>
                <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full top-[51vh] left-[85vw] fixed" style={{
                    opacity: "20%", zIndex: 0, overflow: "hidden"
                }}></div>
            </div>

            <Card style={{ borderRadius: "20px", zIndex: 2, height: "500px" }}>
                <CardContent className="login-card" style={{ padding: "36px" }}>
                    <div className="frame">
                        <img
                            src={Grati_logo}
                            alt="logo"
                            width="137"
                            height="58.39"
                            className="d-inline-block align-text-top"
                        />
                    </div>
                    <div className="frame2" style={{ marginTop: "40px", gap: "4px", textAlign: "center" }}>
                        <Typography
                            sx={{
                                fontFamily: "Plus Jakarta Sans, sans-serif",
                                fontSize: "28px",
                                lineHeight: "39px",
                                fontWeight: "800",
                            }}
                        >
                            Enter OTP
                        </Typography>
                    </div>
                    <div className="frame3">
                        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                            <OtpInput
                                value={code}
                                onChange={handleChange}
                                numInputs={6}
                                separator={<span style={{ width: "8px" }}></span>}
                                isInputNum={true}
                                shouldAutoFocus={true}
                                inputStyle={{
                                    border: "1px solid transparent ",
                                    borderRadius: "8px",
                                    width: "54px",
                                    height: "54px",
                                    color: "#000",
                                    fontWeight: "400",
                                    caretColor: "blue",
                                    fontSize: "12px",

                                }}
                                focusStyle={{
                                    border: "1px solid transparent",
                                    outline: "none",
                                }}
                                renderInput={renderInput}
                            />
                            {/* <Link to="/resetpassword"> */}

                            <div className="flex flex-col gap-5 mt-5">
                                <div className="flex flex-row justify-center items-center gap-5">
                                    <div>
                                        {timer > 0 ? `Resend OTP in ${timer} seconds` : "You can now resend OTP"}
                                    </div>
                                    <button
                                        className="font-bold text-black text-center cursor-pointer"
                                        style={{
                                            fontFamily: "Plus Jakarta Sans, sans-serif",
                                            fontWeight: trackResetTime ? "700" : "500",
                                            textSize: "16px",
                                            padding: "0",
                                            color: trackResetTime?"black":"gray",
                                            cursor: trackResetTime?"pointer":"default",
                                        }}
                                        onClick={handleResendClick} disabled={isResendDisabled }
                                    // onClick={handleSendAgain}
                                    >
                                        Resend
                                    </button>
                                </div>
                                <button type="submit" className="login-btn mt-5">
                                    <span
                                        className="font-bold text-white"
                                        style={{
                                            fontFamily: "Plus Jakarta Sans, sans-serif",
                                            fontWeight: "700",
                                            textSize: "16px",
                                            padding: "0",
                                        }}
                                    >
                                        Submit Confirmation Code
                                    </span>
                                </button>
                                {/* <p className="login-btn mt-5" type="button" onClick={handleSendAgain}> */}
                                {/* </p> */}
                            </div>

                            {/* </Link> */}
                        </form>
                    </div>
                </CardContent>
            </Card>
        </Box>
    );
};


export default OtpPage;




