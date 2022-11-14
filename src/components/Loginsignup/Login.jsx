import React ,{useEffect}from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Logout from './Logout'
const Login = () => {
  const [user, setUser] = useState({});
  // Pass the useFormik() hook initial form values and a submit function that will
  axios.get("http://localhost:5000/login").then((res) => {
    setUser(res.data);
  });
  // be called when the form is submitted

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (values.email === user.email && values.password === user.password) {
        localStorage.setItem("authenticated", true);
        navigate("/input");
      } else {
        // error.push("Email Id or Password is wrong");
        toast.error("Please enter the valid credentials", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  // const [authenticated, setauthenticated] = useState(null);
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("authenticated");
  //   if (loggedInUser) {
  //     setauthenticated(loggedInUser);
  //   }
  // }, []);
  const loggedInUser = localStorage.getItem("authenticated");
  if (loggedInUser===true) {
navigate('/logout')
  } else {
    return (
      <>
        <ToastContainer />
        <div className="login-div">
          <div className="form-outer">
            <form onSubmit={formik.handleSubmit}>
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <label className="form-label" htmlFor="email">
                Password
              </label>
              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {/* {touched.sub && errors.sub && (
            <span style={{ color: "red" }}>{errors.sub}</span>
          )} */}

              <div className="btn-submit">
                <button
                  className="btn btn-primary btn-block mb-4"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
/*



<form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
*/
