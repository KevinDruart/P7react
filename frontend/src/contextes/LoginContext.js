import React from "react";

export default React.createContext({
    isAuthenticated: false, 
    setIsAuthenticated: value => {},
    userId: null, 
    setUserId: value => {},
    isAdmin:false,
    setIsAdmin: value => {},
});