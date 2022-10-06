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

const ContactAgents = ({agent, conversations, receiver, setCurrentChat, currentChat, setReceiver, conversationIDSelected, setConversationIdSelected}) => {



    const handleClick = () => {
        conversations.map((c) => {
            if(c.members.includes(agent.id))
            {setConversationIdSelected(c._id)
            setCurrentChat(c)
            }
            }
        )

    };

    useEffect(() => {
        console.log("hedhi el conversation", conversationIDSelected)
        console.log("hedhi el currentChat", currentChat)
    }, [conversationIDSelected])

    return (

            <>
                <tr  onClick={(e) => {
                    e.preventDefault();
                    setConversationIdSelected("");
                    setReceiver(agent.id);
                    handleClick();
                }
                }
                >
                    <td>
                        <Avatar sx={{ bgcolor: "#03807b" }}>{agent.firstName?.charAt(0).toUpperCase()}{agent.lastName?.charAt(0).toUpperCase()}</Avatar>

                    </td>

                    <td>
                        <span className="fw-normal">
                                {agent.firstName}
                    </span>
                             <span className="fw-normal">
                            {agent.lastName}
                        </span>
                    </td>
                </tr>
            </>

    )
};

export default ContactAgents;