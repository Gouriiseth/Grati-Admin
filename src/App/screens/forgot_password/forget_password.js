import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grati_logo from "../../../Assets/images/icons/gratiFullLogo.png";
import "../login/login.css";
import "./forget_password.css"
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../API/authApi";
import { toast } from "react-toastify";
import API from "../../API/urlConstants";
 
const Forgetpassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleForgetPass = async () => {
    try {
      const data = {
        userEmail: sessionStorage.getItem("email"),
        email: formData.email,
      };
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (data.email === '') {
        toast.error("Email is required");
        return;
      }
      if (!emailPattern.test(data.email)) {
        toast.error("Invalid email");
        return; // Exit the function
      }
      
      // if (data.email !== data.userEmail) {
      //   toast.error("Invalid emaillll");
      //   return;
      // }
      const response = await forgetPassword(data)
      // console.log(response,"hhhhhhhhhh");
      if (response) {
        if (response.status === 200) { // Login success
          toast.success("OTP sent successfully");
          console.log(response.data._id);
          sessionStorage.setItem("email", formData.email);
          navigate("/forgetPassword/otpVerification");
        }
        else if (response.status === 400) { // Email not found
          toast.error("This email is not registered.");}
        else{
          
          toast.error(response);
        }
      } 
    } catch (error) {
      console.error("API request error:",error);
    }
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log(".....logged in", event);
    handleForgetPass(); 
  }


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      className="gradient"
    >

      {/* <div className="upperCircle  h-[847px] -top-[398px] -left-[250px] opacity-40  absolute">
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full -top-[398px] -left-[6px] fixed" style={{
          opacity: "20%", zIndex: 0
        }}></div>
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full -top-[351px] -left-[250px] fixed " style={{
          opacity: "20%", zIndex: 0
        }}></div>
      </div> */}
      <div className="upperCircle  h-[847px] -top-[398px] -left-[78vwpx] opacity-40  absolute">
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
      
      <Card style={{ borderRadius: "20px", height:"500px", zIndex:2}}>
        <CardContent className="login-card" style={{ padding: "36px"}}>
          <div className="logoFrame">
            <img
              src={Grati_logo}
              alt="logo"
              width="137"
              height="58.39"
              className="d-inline-block align-text-top"
            />
          </div>
          <div className="frame2" style={{ marginTop: "40px", gap: "4px", textAlign:"center" }}>
            <Typography
              sx={{
                fontFamily: "Plus Jakarta Sans,sans-serif",
                fontSize: "28px",
                lineHeight: "39px",
                fontWeight: "800",
                textAlign:"center"
              }}
            >
              Forgot Password?
            </Typography>
            <p className="text-[18px] font-[400] text-[#888888] w-[380px] m-auto" style={{ fontFamily:"Plus Jakarta Sans,sans-serif"}}>
              Please enter email address associated with your account
            </p>
          </div>
          <div className="frame3" style={{marginTop:"20px"}}>
            <form onSubmit={handleSubmit}>
              <div className="fields" style={{ marginTop: "40px", marginBottom: "40px", height:"50px"}}>
                <div className="form-fields">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border-[1px] border-[#C7C6C6] rounded-md p-[10px]"
                    placeholder="Email Address"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif"}}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                </div>
              {/* <Link to="/forgetpassword/otpverification"> */}
                <div style={{marginBottom:"60px"}} className="flex flex-col gap-4">
                <button type="submit" className="login-btn" onClick={handleSubmit}>
                    <span className="font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans,sans-serif", fontWeight: "700", textSize: "16px", padding: "0" }}>Send Confirmation Code</span>
                </button>
                <Link to="/" style={{ fontFamily: "Plus Jakarta Sans,sans-serif", color:"#524CBB", fontWeight: "700", textSize: "14px", textAlign:"center" }}>Back to login</Link>
              </div>
              {/* </Link> */}
            </form>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Forgetpassword;
