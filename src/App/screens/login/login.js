import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GratiLogo from "../../../Assets/images/icons/gratiFullLogo.png";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { loginUser } from "../../API/authApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions, login } from "../../redux/reducers/auth";
import API from "../../API/urlConstants";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const accessToken = API.AUTH_TOKEN;
  console.log(accessToken, "rdftgyhjkhb");
  const [oldPass,setOldPass]=useState(null)
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

  const handleLogin = async () => {
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };

      if (data.email === '' && data.password!=='') {
        toast.error("Email is required", {
          autoClose: 5000
        });
        return;
      }
      if (data.password === '' && data.email!=='') {
        toast.error("Password is required", {
          autoClose: 5000
        });
        return;
      }
      if (data.password === '' && data.email === '') {
        toast.error("Login credentials are required", {
          autoClose: 5000
        });
        return;
      }

      const response = await loginUser(data)
      // console.log(response,"hhhhhhhhhh");
      if (response) {
        if (response.status === 200) {
          toast.success("Logged In successfully", {
            autoClose: 5000
          }, {
          autoClose: 5000
        })
          // sessionStorage.setItem("oldPassword", formData.password);
          setOldPass(formData.password)
          if(response.data.data.resultValue.email)
          console.log("yessss",response.data.data,oldPass);
        localStorage.setItem(API.AUTH_TOKEN, response.data.data.resultValue?.accessToken);
        localStorage.setItem("fullName", response.data.data.resultValue?.fullName);
        localStorage.setItem("email", response.data.data.resultValue?.email);
        localStorage.setItem("profileImage", response.data.data.resultValue?.profileImage);
        dispatch(authActions.login(response.data.data.resultValue.accessToken));
        // const { accessToken, email, profileImage, fullName } = response.data.data.resultValue;
        // dispatch(authActions.login({ isLoggedIn: accessToken, email, profileImage, fullName }));
        
        // dispatch(authActions.login(response.data.data.resultValue.email));
        // dispatch(authActions.login(response.data.data.resultValue.profileImage));
        // dispatch(authActions.login(response.data.data.resultValue.fullName));
        
        navigate("/dashboard/");
      } 
      // else if(data.email)
      else if (response.status === 400) { // Email not found
        toast.error(response.err.response.data.message, {
          autoClose: 5000
        });
          // if(response.data)
        } 
        // else if (response.status === 400) { // Email not found
        //   toast.error("Invalid credentials");} 
          // else if(response.data.data.isBlocked){
          // toast.error("You account has been blocked by admin ,please contact admin for support")
          // } 
        } else {
          alert("Response is undefined.");
        }
      } catch (error) {
      console.error("API request error:", error);
    }
  };

  console.log(oldPass,"passss")
  
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(); // Call the API login function

  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      className="gradient "
    // position="relative"
    >
      <div className="upperCircle  h-[847px] -top-[41vh] -left-[1496px] opacity-40  absolute">
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full -top-[41vh] -left-[0.31vw] fixed" style={{
          opacity: "20%", zIndex: 0
        }}></div>
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full -top-[36vh] -left-[13vw] fixed " style={{
          opacity: "20%", zIndex: 0,overflow:"hidden"
        }}></div>
      </div>

      <div className="lowerCircle  h-[847px] top-[67vh] left-[1378px] opacity-40 absolute">
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full top-[61vh] left-[77vw] fixed" style={{
          opacity: "20%", zIndex: 0,
        }}></div>
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full top-[51vh] left-[85vw] fixed" style={{
          opacity: "20%", zIndex: 0, overflow: "hidden"
        }}></div>
      </div>

      <Card style={{ borderRadius: "20px", zIndex: 2 }}>
        <CardContent className="login-card" style={{ padding: "36px" }}>
          {/* <div className="frame1 " style={{display:"flex", flexDirection:"column",margin:"auto"}}> */}
          <div className="m-auto flex gap-[4.12px]">
            <img
              src={GratiLogo}
              alt="logo"
              className="flex justify-center items-center mx-auto w-[142px] h-[90.51px] "
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
              Welcome to Grati!
            </Typography>
            <p className="text-[18px] font-[400] text-[#888888]" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
            >
              Please enter the below details in order to login.
            </p>
          </div>
          <div className="frame3">
            <form onSubmit={handleSubmit} className="mt-10">
              <div className="fields flex gap-1">
                <div className="form-fields">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border-[1px]  border-[#C7C6C6] rounded-md p-[10px]"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="border-[1px] border-[#C7C6C6] rounded-md p-[10px]"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Link to="/forgetpassword">
                  <Button style={{ fontFamily: "Plus Jakarta Sans,sans-serif", color: "#524CBB", fontWeight: "600", textSize: "16px", padding: "0", marginTop:"5px" }}>Forgot Password?</Button>
                </Link>
              </div>

              <div>
                {/* <Link to="/dashboard"> */}
                <button type="submit" className="mt-10 login-btn" onClick={() => handleSubmit} >
                  <span className="font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans,sans-serif", fontWeight: "700", textSize: "16px", padding: "0" }}>Login</span>
                </button>
                {/* </Link> */}
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;


