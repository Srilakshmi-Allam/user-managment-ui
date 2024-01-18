import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import auth from "../Auth/Authentication";
import { REMIND_INACTIVITY_TIME, TOTAL_INACTIVITY_TIME } from "../config";

const InactivityPopup = () => {
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(TOTAL_INACTIVITY_TIME); // 60 seconds = 1 minute

  // Reset the timer whenever there's any user activity
  const resetTimer = () => {
    //setShowModal(false);
    setTimer(TOTAL_INACTIVITY_TIME); // Reset timer to 30 minute
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onLogout = () => {
    setShowModal(false);
    auth.logout();
    window.location.reload(true);
  };

  // Show the modal when 60 seconds are left
  useEffect(() => {
    if (timer === REMIND_INACTIVITY_TIME) {
      setShowModal(true);
    }
  }, [timer]);

  // Countdown the timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        // Timer has expired, trigger logout
        onLogout();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, onLogout]);

  // Handle "Stay Logged In" button click
  const handleStayLoggedInClick = () => {
    setShowModal(false);
    resetTimer();
  };

  // Check for inactivity and show the modal when timer reaches 0
  useEffect(() => {
    const activityListener = () => {
      if (!showModal) resetTimer();
    };

    window.addEventListener("mousemove", activityListener);
    window.addEventListener("keydown", activityListener);

    return () => {
      window.removeEventListener("mousemove", activityListener);
      window.removeEventListener("keydown", activityListener);
    };
  }, [showModal]);

  return (
    <div className="container">
      <Modal show={showModal} onHide={handleStayLoggedInClick}>
        <Modal.Header closeButton>
          <Modal.Title>Session Timeout Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <p className="mb-0">You will be automatically logged out in</p>
            <h2 className="text-danger font-weight-bold">{timer} seconds</h2>
            <p>To continue your session, select Stay Logged In</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleStayLoggedInClick}>
            Stay Logged In
          </Button>
          <Button variant="danger" onClick={onLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InactivityPopup;
