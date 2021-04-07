import React, { useState, useEffect } from 'react';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./SidebarChat.css";

function SidebarChat({ name, id }) {
    const [ seed, setSeed ] = useState("");
    useEffect(
        () => {
           setSeed(Math.floor(Math.random() * 5000)) }, []
    );
    
    return (
        <Link to={`/rooms/${id}`} className="sidebarChat__link">
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>Hello, how are you?</p>
                </div>
            </div>
         </Link>
    )
}

export default SidebarChat
