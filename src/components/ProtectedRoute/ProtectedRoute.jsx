import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { globalUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!globalUser) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [globalUser, navigate]);

  if (loading) {
    return;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
