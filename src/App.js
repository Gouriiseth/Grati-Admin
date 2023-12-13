import './App.css';
import Forgetpassword from './App/screens/forgot_password/forget_password';
import Login from "./App/screens/login/login"
import ResetPassword from "./App/screens/reset_password/reset_password"
import Dashboard from "./App/screens/Dashboard/dashboard/dashboard"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './App/screens/navbar/navbar';
import OtpPage from './App/screens/OtpPage/otpPage';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default styles
import ReviewManagement from './App/screens/Dashboard/review_management/review';
import Sidenav from './App/screens/sidenav/sidenav';
import UserManagement from './App/screens/Dashboard/user_management/user';
import FinanceManagement from './App/screens/Dashboard/finance_management/finance';
import { Provider, useSelector } from 'react-redux';
import store from './App/redux/store/store';
import ManageAdmins from './App/screens/Dashboard/manage_admins/manage_admins';
import Support from './App/screens/Dashboard/grati_support/support';
function App() {
  const auth = useSelector((state) => state.auth);
  console.log(auth, "token auth")
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  console.log("aut in", auth, "---", auth.loggedIn)

  return (
    // <Provider store={store}>
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/forgetpassword/otpverification" element={<OtpPage />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            {/* <Route path="/dashboard/*" element={<AuthenticatedRoutes />} /> */}
            {isLoggedIn && <Route path="/dashboard/*" element={<AuthenticatedRoutes />} />}
            {/* {!isLoggedIn && <Route path="/" element={<Login />} />} */}
            {/* {isLoggedIn && <AuthenticatedRoutes />} */}

          </Routes>
          {/* <Sidenav />
        <Routes>
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/dashboard/review_management" element={<ReviewManagement/>} />
         <Route path="/nav" element={<Navbar />} />
        </Routes> */}
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
    // </Provider>
  );
}


function AuthenticatedRoutes() {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  console.log("insside func", isLoggedIn);
  const navigate= useNavigate();

  if (!isLoggedIn) {
    return (
      <Navigate to="/" replace />
    );
  }
  return (
    <>
      {/* <Navbar />
      <div className="m-0 flex flex-row justify-between">
        <div className="">
          <Sidenav />
        </div>
        <div className="">
          <div className="">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user_management" element={<UserManagement />} />
              <Route path="/finance_management" element={<FinanceManagement />} />
              <Route path="/review_management" element={<ReviewManagement />} />
            </Routes>x
          </div>
        </div>
      </div> */}
      {/* <div className="flex flex-row"> */}

      {/* <div className="flex flex-row z-100"> */}
      <div className="flex flex-row">
        <Sidenav />
        {/* </div> */}
        {/* <div className="relative left-[14vw] bg-gray-100 top-[64px] p-8 flex w-[86vw]">
        <div className="relative left-1/2 -translate-x-1/2 w-full flex justify-center items-center"> */}
        {/* <div className="relative p-8 left-1/2 -translate-x-1/2"> */}
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="p-8 bg-gray-100 h-full">
            {/* max-w-[1592px] overflow-x-visible */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user_management" element={<UserManagement />} />
            <Route path="/finance_management" element={<FinanceManagement />} />
            <Route path="/review_management" element={<ReviewManagement />} />
            <Route path="/grati-support" element={<Support />} />
            <Route path="/manage" element={<ManageAdmins />} />
          </Routes>
          </div>
        </div>
      </div>
      {/* </div>
        </div> */}
      {/* </div> */}
    </>
    // <Outlet /> {/* This is where the nested routes are rendered */}
  );
}

export default App;
