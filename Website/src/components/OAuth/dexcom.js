import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DexcomAccessTokenRequest from "./backendrequest";

const DexcomOAuth = () => {
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        try {
            var authorization_code = searchParams.get("code");
            console.log(authorization_code);
        } catch (error) {
            console.log(error);
        }

        DexcomAccessTokenRequest(authorization_code);
    }, [location]);
    return(<div><p>Test</p><p>Test2</p></div>);
}

export default DexcomOAuth;