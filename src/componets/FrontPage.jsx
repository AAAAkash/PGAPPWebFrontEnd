import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import dbConfig from '../config.json';

const adminLoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // console.log(user, "88888888888888888");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!user.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      validationErrors.email = "Please Enter valid Gmail";
    } else {
      // Check if the email is from Gmail
      const gmailRegex = /@gmail\.com$/i;
      if (!gmailRegex.test(user.email)) {
        validationErrors.email = "Please Enter valid Gmail";
      }
    }
    if (!user.password) {
      validationErrors.password = "Password is required";
    }
    return validationErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(user, "123456");

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(
          dbConfig.backendBaseUrl + "/main/admin/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'

            },
            body: JSON.stringify(user),
          }
        );
        if (response.ok) {
          // alert("login done");
          navigate("/home");
        } else {
          console.error("Server error:", response.status);
          // alert("login is not done");
        }
      } catch (error) {
        console.error("Error creating the company:", error);
      }
    }
  };

  return (
    <>
      <div className="flex FrontPAgeDiv">
        <div className="FrontPAgeDivOne">
          <img
            src="../public/HomePic.png"
            alt="done"
            width="40%"
            height="40%"
          />
        </div>

        <div className="FrontPAgeDivTwo">
        <div className="FormDiv">
            <h1>Welcome!</h1>         

            <div>
              <form>
              <h3>Login</h3>
                <div className="FormDiv_Input ">
                  <label htmlFor="email">Email ID</label>
                  <input
                    value={user.email}
                    onChange={handleChange}
                    type="text"
                    name="email"
                    placeholder="Enter Your email"
                    className=""
                  />
                  {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="FormDiv_Input ">
                  <label htmlFor="">Password</label>
                  <input
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    className=""
                  />
                  {errors.password && <p>{errors.password}</p>}
                </div>
                <div className="FormDiv_Button">
                  <button type="submit" onClick={handleLogin}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      
      </div>
    </>
  );
};

export default adminLoginPage;