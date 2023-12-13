import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grati_logo from "../../../Assets/images/icons/gratiFullLogo.png";
import "../login/login.css";
import "./reset_password.css"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../API/authApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  // const [res, setRes] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target);
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData);
  };
  let response;
  const handleLogin = async () => {
    console.log("inside");
    try {
      const data = {
        email: sessionStorage.getItem("email"),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        // oldPassword:sessionStorage.getItem("oldPassword")
      };

      console.log(data);
      // Password validation (example: at least 6 characters)
      if (data.password === '' && data.confirmPassword==='') {
        toast.error("Password fields are required");
        return;}
      if (data.password === '' ) {
        toast.error("New Password is required");
        return;}
      if ( data.confirmPassword==='') {
        toast.error("Confirm password is required");
        return;}

      if (data.password.length <8) {
        toast.error("Password should be at least 8 characters long");
        return; // Exit the function
      }
      if (data.password.length >17) {
        toast.error("Password should not be more than 16 characters ");
        return; // Exit the function
      }
      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(data.password)) {
        toast.error("Password must contain at least one special character");
        return; // Exit the function
      }

      // At least one capital letter validation using regular expression
      if (!/[A-Z]/.test(data.password)) {
        toast.error("Password must contain at least one upperscase letter");
        return; // Exit the function
      }
      if (!/[a-z]/.test(data.password)) {
        toast.error("Password must contain at least one lowercase letter");
        return; // Exit the function
      }
      // if(data.confirmPassword===data.oldPassword){
      //   toast.error("New password should be different from the old password");
      //   return;
      // }
       if (data.confirmPassword !== data.password) {
        toast.error("Passwords don't match");
        return;
      }
      //check for confirmPassword to exactly matches with the password

      response = await resetPassword(data)
      if (response) {
        // setRes(response);
        if (response.status === 200) {
          toast.success(response.data.message)
          navigate("/");
        } else {
          console.log(response);
          if (formData.confirmPassword !== formData.password) {
            toast.error(response.err.response.data.message)
          }
          // console.log("reset password failed. Response status:", response.err.message);
        }
      } else {
        alert("Response is undefined.");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  // useEffect(() => {
  //   if (res) {
  //     if (res.status === 200) {
  //       toast.success(response.data.message);
  //       navigate("/");
  //     }
  //     else {
  //       if (formData.confirmPassword !== formData.password) {
  //         console.log(res?.err.response.data);
  //         toast.error(res?.err.response.data.message)
  //       }
  //     }
  //   }
  //   else
  //     alert("no res");
  // }, [res]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission here
    // console.log("Form Data:", formData,sessionStorage.getItem("oldPassword"));
    handleLogin();
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


      <Card style={{ borderRadius: "20px", zIndex:2, height:"496.51px" }}>
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
                fontFamily: "Plus Jakarta Sans,sans-serif",
                fontSize: "28px",
                lineHeight: "39px",
                fontWeight: "800",
              }}
            >
              Reset your Password
            </Typography>
          </div>
          <div className="frame3">
            <form onSubmit={handleSubmit}>
              <div className="fields mt-[7px]">
                <div className="form-fields">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="border-[1px] border-[#C7C6C6] rounded-md p-[10px]"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="border-[1px] border-[#C7C6C6] rounded-md p-[10px]"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="login-btn mt-10">
                  <span className="font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans,sans-serif", fontWeight: "700", textSize: "16px", padding: "0" }}>Reset Password</span>
                </button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;
