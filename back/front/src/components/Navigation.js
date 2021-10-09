import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "./context";
import '../styles/Navigation.css';
import home_icon from "../images/home_icon.png";
import create_icon from "../images/create_icon.png";

export default function Navigation () {
    const [open, setOpen] = useState(true);
    const {show, setShow} = useContext(Context);

    return (
        <div>
            <Link to="/">
                <div onClick = {() => setOpen(true)} className = {open ? "link_block clicked" : "link_block"}>
                    <img className = "home_icon" src = {home_icon} alt = "home_icon" title = "Homepage" />
                </div>
            </Link>
            <br />
            <Link to="/Form">
            <div
                onClick = {() => {setOpen(false); setShow(true)}}
                className = {open ? "link_block" : "link_block clicked"}
            >
                <img className = "create_icon" src = {create_icon} alt = "create_icon" title = "Create a new Entity" />
            </div>
            </Link>
        </div>
    )
}