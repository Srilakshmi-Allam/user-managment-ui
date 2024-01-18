import React, { useEffect, useState } from "react";
import moment from "moment";
import apiClient from "../api/axios";
import { ENDPOINTS } from "../config";

const TimeStamp = ({ displayData }) => {
  const { created_by, created_at, updated_by, updated_at } = displayData || {};

  const [createdBy, setCreatedBy] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");

  useEffect(() => {
    const fetchData = async (userId, mode) => {
      try {
        const { data } = await apiClient.get(
          `${ENDPOINTS.USERSBYID}/${userId}`
        );
        const fullName = `${data?.FirstName} ${data?.LastName}`;

        if (mode === "created") {
          setCreatedBy(fullName);
        } else {
          setUpdatedBy(fullName);
        }
      } catch (error) {
        console.error("Error fetching timestamp data:", error);
      }
    };

    if (created_by) {
      fetchData(created_by, "created");
    }
    if (updated_by) {
      fetchData(updated_by, "updated");
    }
  }, [created_by, updated_by]);

  const renderTimestamp = (label, date) => {
    return (
      <span>
        , <strong>{label}:</strong> {moment(date).format("MM/DD/YYYY")}
      </span>
    );
  };

  return (
    <div className="d-none d-md-block">
      {createdBy && (
        <div className="small-font">
          <strong>Created By:</strong> {createdBy}
          {renderTimestamp("Created at", created_at)}
        </div>
      )}
      {updatedBy && (
        <div className="small-font">
          <strong>Updated By:</strong> {updatedBy}
          {renderTimestamp("Updated at", updated_at)}
        </div>
      )}
    </div>
  );
};

export default TimeStamp;
