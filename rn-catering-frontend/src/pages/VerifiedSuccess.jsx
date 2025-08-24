import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CenteredMessageBox from "../components/centerMsgbox";

export default function VerifiedSuccess() {
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMessage("✅ Email verified successfully! You can now log in.");

    // Optional: redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return <CenteredMessageBox message={message} onClose={() => setMessage("")} />;
}
