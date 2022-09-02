import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aboutus from "./Components/Aboutus";
import Home from "./Components/Home/Home";
import Signin from "./Components/Login/signin"
import Forgot from "./Components/Login/Forgot";
import OtpVerification from "./Components/Login/otp-verification";
import "bootstrap/dist/css/bootstrap.min.css"
import Users from "./Components/Users";
import AddContacts from "./Components/Addcontacts";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/login";
import ForgotChangepassword from "./Components/Login/forgotchangepassword";
import Edit_profile from "./Components/Edit_profile/edit_profile";
import Watchlist from "./Components/Watchlist"
import Footer from "./Components/Footer"
import EditPassword from "./Components/EditPassword/EditPassword";
import AppContext from "./Components/context/appcontext";
import { useReducer } from "react";
import reducer, { initialState } from "./Components/Reducers";
import CareerAdvice from "./Components/CareerAdvice/CareerAdvice";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
function App() {

  const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getUser =  () => {
       fetch("http://localhost:3001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
           return response.json();
          }
          // localStorage.clear()
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {

          setUser(resObject);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    if(localStorage.getItem("verification")!= "false"  )
    {
      // console.log("hi")
      getUser();
    }
    else{
      setUser(null);
    }
   
  }, [])
  if (user !== null) {
    // console.log("setting localstorage")
    localStorage.setItem("type", "google")
    // dispatch({type:"LOGIN"})
    localStorage.setItem("email", user.user.profile._json.email)
    localStorage.setItem("name", user.user.profile._json.name)
    // localStorage.setItem("id", user.user._id)
    localStorage.setItem("token",user.token)
    
    localStorage.setItem("type","google")
    // console.log(user)
   
  }

  return (
    <div>
      <BrowserRouter>
        <AppContext.Provider value={{ state, dispatch }}>

          <Header />


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/users" element={<Users />} />
            <Route path="/addcontacts" element={<AddContacts />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/otpverfiy" element={<OtpVerification />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editprofile" element={<Edit_profile />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/editpassword" element={<EditPassword />} />
            <Route path="/forgotchangepassword" element={<ForgotChangepassword />} />
            <Route path="/careeradvice" element={<CareerAdvice />} />

          </Routes>

        </AppContext.Provider>
      </BrowserRouter>
      <Footer />


    </div>
  );
}

export default App;
