import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import firebase from "../firebase";
import { Avatar, IconButton } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreVert from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import MicIcon from '@material-ui/icons/Mic';
import db from "../firebase";
import "./Chat.css";
import userEvent from '@testing-library/user-event';

function Chat() {
    const [ { user }, dispatch ] = useStateValue();
    const [ seed, setSeed ] = useState("");
    const [ messages, setMessages ] = useState([]);
    const [ roomName, setRoomName ] = useState("");
    useEffect(
        () => {
           setSeed(Math.floor(Math.random() * 5000)) }, []
    );
    const { roomId } = useParams();
    const [ input, setInput ] = useState("");
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .add({
                messages: input,
                name: user.displayName,
                timeStamp: new Date().toUTCString() || null
            });
        setInput("");

    };
    useEffect(() => {
        if(roomId) {
            db.collection("rooms").doc(roomId)
                .onSnapshot(snap => setRoomName(
                    snap.data().name
                ));
            
            db.collection("rooms").doc(roomId).collection("messages").orderBy("timeStamp", "asc")
                    .onSnapshot(snapShot => setMessages(
                        snapShot.docs.map(doc => ({
                            data: doc.data(),
                            id: doc.id
                        }))
                    ));
        }
    }, [roomId]);
    return (
        <div className="chat">
           <div className="chat__header">
               <div className="chat__headerLeft">
               <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h2>{ roomName }</h2>
                    <p>11 Oct, 2020</p>
                </div>
               </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <VideocamIcon />
                    </IconButton>
                    <IconButton>
                        <CallIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
           </div>
           <div className="chat__body">
                {messages.map(message => 
                <div key={message.id} className="chat__messageItem">
                    <p className="chat__messageSent"> { message.data.messages }
                        <span className="chat__messageUser">
                            { message.data.name }
                        </span>
                        <span className="chat__messageTimeStamp">
                            { message.data.timeStamp }
                        </span>
                    </p>
                </div>
                )}
            {/* <div className="chat__messageReceived">
                <p>I m okay.How about you all? <span className="chat__messageTimeStamp">12:53 am</span></p>
            </div> */}
           </div>
           <div className="chat__footer">
               <IconButton>
                <EmojiEmotionsIcon />
               </IconButton>
               <form>
                    <input type="text" value={input}  placeholder="Enter message here" onChange={ e => setInput(e.target.value) } />
                    <button type="submit" onClick={sendMessage}>Send a Message</button>
                </form>
               <IconButton>
                <CameraAltIcon />
               </IconButton>
               <IconButton>
                <MicIcon />
               </IconButton>
           </div>
        </div>
    )
}

export default Chat
