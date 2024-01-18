import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import auth from "../Auth/Authentication";
import errorMessages from "../utils/shared/errors";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(errorMessages.ERROR_FILL_ALL_FIELDS);
      return;
    }

    try {
      await auth.login(email, password);
      // navigate("/dashboard");

      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(errorMessages.ERROR_LOGIN_CREDENTIALS);
      navigate("/", { state: { error: "Invalid credentials" } });
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column left-box  ">
          <div className="featured-image mb-3">
            <img
              src="/images/image.jpg"
              className="img-fluid"
              alt="loginImage"
            />
          </div>
        </div>

        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Welcome</h2>
              <h1>Login Here!</h1>
            </div>
            <form onSubmit={handleLogin}>
              <div className=" mb-2">
                <label htmlFor="form1" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  id="form1"
                  placeholder="Email address"
                  className="form-control form-control-lg bg-light fs-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className=" mb-2">
                <label htmlFor="form2" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="form2"
                    placeholder="Password"
                    className="form-control form-control-lg bg-light fs-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}
                    ></i>
                  </span>
                </div>
              </div>
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-lg btn-danger w-100 fs-6">
                  Login
                </button>
              </div>

              {error && <div className="text-danger">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
