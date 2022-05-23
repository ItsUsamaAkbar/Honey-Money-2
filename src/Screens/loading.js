import React from "react";
import ReactLoading from "react-loading";
import "../App.css";

const Loading = ({ type, color }) => (
  <ReactLoading
    className="loadingCercle"
    type="bars"
    color="#2995be"
    // height={"18%"}
    width={"8%"}
  />
);

export default Loading;
