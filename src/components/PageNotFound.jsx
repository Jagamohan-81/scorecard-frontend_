import React from "react";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <img
        src={require("https://www.wpoven.com/blog/wp-content/uploads/2022/09/error-404.png")}
        alt="page_not_found"
        className="w-100"
      />
    </div>
  );
};

export default PageNotFound;
