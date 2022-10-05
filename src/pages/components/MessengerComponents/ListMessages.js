import React, {useEffect, useRef, useState} from 'react';
import Message from "./Message";
import {useDispatch, useSelector} from "react-redux";
import {ListMissions} from "../../../actions/missionAction";
import {GetMessageByConvo} from "../../../actions/chatAction";
import {Box, CircularProgress, Stack} from "@mui/material";
import {Alert} from "@mui/lab";
import {Card, Table} from "@themesberg/react-bootstrap";
import ShopRow from "../ShopComponents/ShopRow";
import Pagination from "@mui/material/Pagination";

const ListMessages = ({conversationIDSelected, userId, arrivalMessage, socket,setArrivalMessage,currentChat}) => {

    const dispatch = useDispatch();

    const scrollRef = useRef(null);

    const messagesList = useSelector (state => state.messagesList);
    const messageet = messagesList.messages
    const loading = messagesList.loading
    const error = messagesList.error


    useEffect(() => {
        socket.current.on ("getMessage", (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                text:data.text,
            });
        });
        console.log("ppppppp", arrivalMessage)
    }, [])

    useEffect(() => {
        dispatch(GetMessageByConvo(conversationIDSelected))

    }, [conversationIDSelected, arrivalMessage])

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behavior:"smooth"})
    // }, [messageet])


    return (
        <div>

            {loading ? (
                <Box className="m-5" sx={{ display: 'flex',alignItems: 'center',
                    justifyContent: 'center',  }} >
                    <CircularProgress style={{color:"#323854"}} />
                </Box>
            ) : error ? (

                <Alert className="m-2" sx={{ width: '100%' }} variant="filled" severity="error">
                    Ay ay ay! looks like you have network problems :(
                    <ul>
                        <li> try reloading your page </li>
                        <li>  try checking your internet connection</li>
                    </ul>
                    {"\n"} <strong>Error: {error} </strong>
                </Alert>

            ) : (
                <div ref={scrollRef}>
                        {messageet?.map((message) => (
                            <Message key= {message._id} message={message} own={message.sender === userId}/>
                        ))}
                </div>
            )}


        </div>
    );
};

export default ListMessages;