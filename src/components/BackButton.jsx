import { Link } from "react-router-dom";
import React from "react";

const BackButton = ({url}) => {
return(
    <Link to={url} className="bg-orange-400 text-black font-bold hover:bg-orange-600 border border-2 rounded-lg px-4 py-2 rounded-md w-full">
    Back
  </Link>
)
};

export default BackButton;