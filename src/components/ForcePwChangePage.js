import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "../App.css";
import apiClient from "../api/axios";
import { useNavigate } from "react-router-dom";

function ForcePasswordChange() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const [requirementsMet, setRequirementsMet] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const givenOldPassword = localStorage.getItem("Password");

  const handleChange = (e) => {
    const newPasswordValue = e.target.value;

    // Check if the password meets the length requirement
    const lengthMet = newPasswordValue.length >= 8;

    // Check if the password contains at least one lowercase letter
    const lowercaseMet = /[a-z]/.test(newPasswordValue);

    // Check if the password contains at least one uppercase letter
    const uppercaseMet = /[A-Z]/.test(newPasswordValue);

    // Check if the password contains at least one number
    const numberMet = /[0-9]/.test(newPasswordValue);

    // Check if the password contains at least one special character
    const specialCharMet = /[!@#$%^&*]/.test(newPasswordValue);

    // Update the requirementsMet state
    setRequirementsMet({
      length: lengthMet,
      lowercase: lowercaseMet,
      uppercase: uppercaseMet,
      number: numberMet,
      specialChar: specialCharMet,
    });

    // Update the newPassword state
    setNewPassword(newPasswordValue);

    // Check if passwords match
    if (confirmPassword && newPasswordValue !== confirmPassword) {
      setError("New password and confirm password do not match.");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    // Retrieve user details from local storage
    const storedUserDetails = localStorage.getItem("profile");

    if (storedUserDetails) {
      const userProfile = JSON.parse(storedUserDetails);
      const userEmail = userProfile.email;
      setEmail(userEmail);

      const fetchUserDetailsByEmail = async () => {
        try {
          const response = await apiClient.get(`/usersByEmail/${userEmail}`);
          console.log(response);
          if (response.status === 200) {
            const userId = response.data.UserID; // Fetch the ID from the response
            setId(userId); // Set the ID in the component state
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserDetailsByEmail();
    }
  }, []);

  const handleUpdateUserDetails = async (userId) => {
    try {
      const response = await apiClient.put(`/users/${userId}`, {
        RequirePasswordChange: false,
      });
      if (response.status === 200) {
        console.log("User details updated successfully.");
      } else {
        console.error("Error updating user details:", response.statusText);
      }
    } catch (error) {
      // Handle errors from the API request
      console.error("Error updating user details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(givenOldPassword);
    console.log(newPassword);
    console.log(confirmPassword);
    console.log(email);

    if (givenOldPassword === oldPassword) {
      try {
        const encodedPassword = encodeURIComponent(newPassword);
        const response = await apiClient.put(
          `/updatePassword/${email}/${encodedPassword}`
        );

        // const response = await apiClient.put(`/updatePassword/${email}/${newPassword}`);
        if (response.status === 200) {
          setSuccessMessage("Password updated successfully.");
          setError("");

          handleUpdateUserDetails(id);
          // Example of using setTimeout to set a delay of 3 seconds (3000 milliseconds)
          setTimeout(function () {
            console.log("This code will be executed after 2 seconds.");
            navigate("/dashboard");
          }, 2000);
        } else {
          setError(" Error updating password");
          //console.error(error);
          console.error("Error updating password:", response.statusText);
        }
      } catch (error) {
        // Handle errors from the API request
        console.error("Error updating password:", error);
        setError("Error updating password");
      }
    } else {
      setError("oldPassword is not matching");
    }

    if (!Object.values(requirementsMet).every((requirement) => requirement)) {
      setError("Please meet all password requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    // setSuccessMessage('Password updated successfully.');
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <h1 className="mb-4 text-center">Change Password</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="oldPassword">
              <Form.Label>
                Old Password: <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>
                New Password: <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>
                Confirm New Password: <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <small className="text-danger">Passwords do not match.</small>
              )}
            </Form.Group>
            <div className="text-center mb-3">
              <ul className="password-requirements">
                <li className={requirementsMet.length ? "met" : ""}>
                  {requirementsMet.length ? (
                    <span className="text-success">
                      &#10003; At least 8 characters
                    </span>
                  ) : (
                    "At least 8 characters"
                  )}
                </li>
                <li className={requirementsMet.lowercase ? "met" : ""}>
                  {requirementsMet.lowercase ? (
                    <span className="text-success">
                      &#10003; At least one lowercase letter
                    </span>
                  ) : (
                    "At least one lowercase letter"
                  )}
                </li>
                <li className={requirementsMet.uppercase ? "met" : ""}>
                  {requirementsMet.uppercase ? (
                    <span className="text-success">
                      &#10003; At least one uppercase letter
                    </span>
                  ) : (
                    "At least one uppercase letter"
                  )}
                </li>
                <li className={requirementsMet.number ? "met" : ""}>
                  {requirementsMet.number ? (
                    <span className="text-success">
                      &#10003; At least one number
                    </span>
                  ) : (
                    "At least one number"
                  )}
                </li>
                <li className={requirementsMet.specialChar ? "met" : ""}>
                  {requirementsMet.specialChar ? (
                    <span className="text-success">
                      &#10003; At least one special character
                    </span>
                  ) : (
                    "At least one special character"
                  )}
                </li>
              </ul>
            </div>
            <div className="col-12 pt-4 text-center">
              <Button type="submit" variant="danger">
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ForcePasswordChange;
