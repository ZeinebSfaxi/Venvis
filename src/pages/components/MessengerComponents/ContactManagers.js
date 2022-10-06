import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {deleteAgent, getToken, listAgents, updateAgent} from "../../../actions/agentAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit, faTruck} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";

const ContactAgents = ({manager, conversations, currentChat, setCurrentChat,setReceiver, conversationIDSelected, setConversationIdSelected}) => {



    const handleClick = () => {
        conversations.map((c) => {
                if(c.members.includes(manager._id))
                {setConversationIdSelected(c._id) ;
                setCurrentChat(c)}
            }

        )


    };

    useEffect(() => {
        console.log("hedhi clicked ,amaher", conversationIDSelected)
        console.log("hedhi clicked manager current chat", currentChat)
            }, [conversationIDSelected])

    return (

        <>
            <tr onClick={(e) => {
                e.preventDefault();
                setConversationIdSelected("")
                setReceiver(manager._id)
                handleClick();

            }
                       }
            >
                <td>
                    <Avatar sx={{ bgcolor: "#03807b" }}>{manager.name?.charAt(0).toUpperCase()}{manager.lastName?.charAt(0).toUpperCase()}</Avatar>

                </td>
                <td>
                        <span className="fw-normal">
                        {manager.name}
                    </span>
                    <span className="fw-normal">
                            {manager.lastName}
                        </span>
                </td>
            </tr>
        </>


    )
};

export default ContactAgents;