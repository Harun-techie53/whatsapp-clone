import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from "./SidebarChat";
import { useStateValue } from "../StateProvider";
import db from "../firebase";
import "./Sidebar.css";

function Sidebar() {
    const [ { user }, dispatch ] = useStateValue();
    const [ rooms, setRooms ] = useState([]);
    const [ searchRoom, setSearchRoom ] = useState("");
    const searchedRoom = (e) => {
        setSearchRoom(e.target.value);
    }; 
    useEffect(() => {
        db.collection("rooms").onSnapshot(snap => setRooms(
            snap.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            ))
        ))
    }, [])
    const addNewChat = () => {
        const roomName = prompt("Enter the name of your new room?");
        if(roomName) {
            db.collection("rooms").add({
                name: roomName
            })
        }
    };
    const leftRooms = rooms.filter(room => room.data.name.toLowerCase().includes(searchRoom.toLowerCase()));
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__headerLeft">
                    <Avatar src={user.photoURL} />
                    <span>{user.displayName}</span>
                </div>
                <div className="sidebar__headerRight">
                    <IconButton>
                    <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                    <ChatIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <SearchOutlinedIcon />
                <input placeholder="Search or start a new chat" type="text" onChange={searchedRoom} value={searchRoom} />
                </div>

            </div>
            <div className="sidebar__chats">
                <div className="sidebar__addNewChat" onClick={addNewChat}>
                    <h2>Add New Chat</h2>
                </div>
                { addNewChat ?(
                    leftRooms.map(room => 
                    <SidebarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                    />
                    )) : (
                        <div className="sidebar__addNewChat" onClick={addNewChat}>
                            <h2>Add New Chat</h2>
                        </div>
                    ) }
            </div>
        </div>
    )
}

export default Sidebar
