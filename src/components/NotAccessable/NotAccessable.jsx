import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext';

const NotAccessable = ({ children }) => {
    const { globalUser } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if authentication process is complete
        if (loading && globalUser !== null) {
            // If user is logged in, redirect to previous path
            if (globalUser) {
                navigate(location?.state?.from || '/', { replace: true });
            }
            // Update loading state to false
            setLoading(false);
        }
    }, [loading, globalUser, navigate, location]);

    if (loading) {
        return ;
    }

    // Otherwise, render the login page
    return <>{children}</>;
};

export default NotAccessable;
