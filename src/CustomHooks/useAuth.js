import React from "react";

const useAuth = () => {
    let user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
    }

    return <div>useAuth</div>;
};

export default useAuth;
