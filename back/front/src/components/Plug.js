import React from "react";
import information_icon from "../images/information_icon.png"
import '../styles/Plug.css';


const Plug = () => {
    
    return (
        <div className = "plug_block">
            <img className = "information_icon" src = {information_icon} alt = "information_icon"/>
            No information yet.
        </div>
    )
}

export default Plug;