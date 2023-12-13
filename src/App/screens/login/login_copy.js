import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import GratiLogo from "../../../Assets/images/icons/gratiFullLogo.png";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { loginUser } from "../../API/authApi";
import { toast } from "react-toastify";
import { Formik } from "formik";


const Login = () => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const navigate = useNavigate();

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleLogin = async () => {
  //   try {
  //     const data = {
  //       email: formData.email,
  //       password: formData.password,
  //     };
  //     // Email validation using a simple regex pattern
  //     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //     if (!emailPattern.test(data.email)) {
  //       toast.error("User not found");
  //       return; // Exit the function
  //     }

  //     const response = await loginUser(data)
  //     if (response) {
  //       if (response.status === 200) { 
  //         navigate("/dashboard");
  //         toast.success("Logged In successfully")
  //         sessionStorage.setItem("oldPassword", formData.password);
  //       } else { 
  //         if (data.password.length < 8) {
  //           toast.error("Password should be at least 8 characters long");
  //           return;}
  //         toast.error(response.err.message)
  //       }
  //     } else {
  //       alert("Response is undefined.");
  //     }
  //    } catch (error) {
  //     console.error("API request error:", error);
  //   }
  // };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   handleLogin(); // Call the API login function
  // };

  const [showPassword, setShowPassowrd] = useState(false);

  // const useErrorStyles = makeStyles({
  //   root: {
  //     "& label.Mui-focused": {
  //       color: "red",
  //     },
  //     "& .MuiInput-underline:before": {
  //       borderBottomColor: "red",
  //     },
  //     width: "100%",
  //   },
  // });
  // const errorClasses = useErrorStyles();
  // const CssTextField = withStyles({
  //   root: {
  //     "& label.Mui-focused": {
  //       color: "green",
  //     },
  //     "& .MuiInput-underline:after": {
  //       borderBottomColor: "green",
  //     },
  //   },
  // })(TextField);


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      className="gradient "
    // position="relative"
    >
      <div className="upperCircle  h-[847px] -top-[398px] -left-[250px] opacity-40  absolute">
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full -top-[398px] -left-[6px] fixed" style={{
          opacity: "20%", zIndex: 0
        }}></div>
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full -top-[351px] -left-[250px] fixed " style={{
          opacity: "20%", zIndex: 0
        }}></div>
      </div>

      <div className="lowerCircle  h-[847px] top-[507px] left-[1378px] opacity-40 absolute">
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full top-[507px] left-[1622px] fixed" style={{
          opacity: "20%", zIndex: 0,
        }}></div>
        <div className="w-[800px] h-[800px]  bg-orange-700 rounded-full top-[554px] left-[1378px] fixed" style={{
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
            {/* <form onSubmit={handleSubmit} className="mt-10">
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
                  <Button style={{ fontFamily: "Plus Jakarta Sans,sans-serif", color: "#524CBB", fontWeight: "600", textSize: "16px", padding: "0" }}>Forgot Password?</Button>
                </Link>
              </div>

              <div>
                <button type="submit" className="mt-10 login-btn" onClick={() => handleSubmit} >
                  <span className="font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans,sans-serif", fontWeight: "700", textSize: "16px", padding: "0" }}>Login</span>
                </button>
              </div>
            </form> */}
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email || (values.password && !values.email)) {
                  errors.email = "Email is Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = "Invalid email address";
                }
                // if (!values.password) {
                //   errors.password = "Password is Required";
                // } else if (!passwordRegex.test(values.password)) {
                //   errors.password = "Password is Invalid";
                // }
                if (!values.password) {
                  errors.password = "Password is Required";
                } else if (values?.password?.length < 8) {
                  errors.password =
                    "Password needs to contain at least 8 characters";
                }
                else if ( values?.password.length > 16){
                  errors.password =
                    "Password cannot be greater than 16 characters";
                }
                
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => { }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mt-[40px]">
                    <div className="flex flex-col justify-center items-center">
                    <TextField id="outlined-basic" variant="outlined" 
                      type="email"
                      name="email"
                      className="form-control form-custom"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email} />
                    {/* <CssTextField
                      classes={{
                        root:
                          errors.email && touched.email
                            ? errorClasses.root
                            : "",
                      }}
                      type="email"
                      name="email"
                      className="form-control form-custom"
                      label="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    /> */}
                    <span className="text-red-500 input-error">
                      {errors.email && touched.email && errors.email}
                    </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    {/* <CssTextField
                      classes={{
                        root:
                          errors.password && touched.password
                            ? errorClasses.root
                            : "",
                      }}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control form-custom"
                      label="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password} */}
                     {/* InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    /> */}
                    <div className="flex flex-col justify-center items-center">
                    <TextField id="outlined-basic" variant="outlined"
                      type={showPassword ? "text" : "password"}
                      name="password"
                        className="form-control form-custom border-[1px] border-[#C7C6C6] rounded-md p-[10px]"
                        style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password} />
                    <span className="text-red-500 input-error">
                      {errors.password &&
                        touched.password &&
                        errors.password}
                    </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link to="/forgetpassword">
                      <Button style={{ fontFamily: "Plus Jakarta Sans,sans-serif", color: "#524CBB", fontWeight: "600", textSize: "16px", padding: "0" }}>Forgot Password?</Button>
                    </Link>
                  </div>
                  <button
                    type="submit"
                    onClick={() => handleSubmit}
                    className="mt-10 login-btn createaccounts d-flex justify-content-center align-items-center"
                  >
                    <span className="font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans,sans-serif", fontWeight: "700", textSize: "16px", padding: "0" }}>Login</span>
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
