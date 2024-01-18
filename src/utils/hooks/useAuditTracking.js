import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditDetails } from "../../api/services/audits.service";
import { isMicrosoftEdgeOrChrome } from "../shared/formattedData";
import { getPathFromURL } from "../shared/helper";
import { auditAction } from "../../config";

export const useAuditTracking = () => {
  const dispatch = useDispatch();
  const { UserEmailData } = useSelector((state) => state.users);
  const isLoggedIn = localStorage.getItem("access_token");

  const userProfile = JSON.parse(localStorage.getItem("profile"));
  const userEmail = userProfile?.email;

  const browser = isMicrosoftEdgeOrChrome();
  const os = navigator?.platform;

  const userId = UserEmailData?.UserID;
  const currentPage = window.location.href;

  const currentPath = getPathFromURL(currentPage);
  const action = auditAction[currentPath];

  useEffect(() => {
    if (isLoggedIn) {
      const auditData = {
        UserID: userId,
        UserEmail: userEmail,
        Action: action,
        Page: currentPage,
        Browser: browser,
        OS: os,
      };

      dispatch(fetchAuditDetails(auditData));
    }
  }, [
    isLoggedIn,
    dispatch,
    browser,
    currentPage,
    action,
    userId,
    userEmail,
    os,
  ]);
};
