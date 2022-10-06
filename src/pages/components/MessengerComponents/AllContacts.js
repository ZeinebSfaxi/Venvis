import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listAgents} from "../../../actions/agentAction";
import {listManagers} from "../../../actions/shopManagerAction";
import {Avatar, Box, CircularProgress, Divider, Stack} from "@mui/material";
import {Card, Row, Table} from "@themesberg/react-bootstrap";
import "../../../scss/conversation.css"
import {Alert} from "@mui/lab";
import AgentRow from "../AgentsComponents/AgentRow";
import Pagination from "@mui/material/Pagination";
import ContactAgents from "./ContactAgents";
import ManagerRow from "../ShopManagerComponents/ManagerRow";
import ContactManagers from "./ContactManagers";
import {GetConversationBymember} from "../../../actions/chatAction";
import ShopRow from "../ShopComponents/ShopRow";
import ConversationRow from "./ConversationRow";


const AllContacts = ({search, userId, setConversationIdSelected, currentChat, setCurrentChat ,receiver, setReceiver,conversationIDSelected}) => {

    const dispatch = useDispatch()

    // const [conversationIDSelected, setConversationIdSelected] = useState("")

    const agentList = useSelector (state => state.agentList);
    const agents = agentList.agents
    const loading = agentList.loading
    const error = agentList.error

    useEffect(()=> {

        dispatch(listAgents())

    }, [dispatch])

    const managerList = useSelector (state => state.managerList);
    const managers = managerList.managers
    const loading2 = managerList.loading
    const error2 = managerList.error

    useEffect(() => {
        dispatch(listManagers())

    }, [dispatch])


    /***********************************************************/


    useEffect(()=> {

        dispatch(GetConversationBymember(userId))


    }, [userId])

    const conversationBymember = useSelector (state => state.conversationByMember);
    const conversations = conversationBymember.conversation
    const loading3 = conversationBymember.loading
    const error3 = conversationBymember.error


    const handleClick = () => {
        conversations.map((c) => {
                if(c.members.includes("032f27f2-22f4-436a-b697-b02c710ec22e"))
                {setConversationIdSelected(c._id)
                    setCurrentChat(c)
                }
            }
        )

    };


    return (
        <>

            {loading || loading2 ? (
                    <Box className="m-5" sx={{ display: 'flex',alignItems: 'center',
                        justifyContent: 'center',  }} >
                        <CircularProgress style={{color:"#323854"}} />
                    </Box>
                ) : error || error2 ? (

                    <Alert className="m-2" sx={{ width: '100%' }} variant="filled" severity="error">
                        Ay ay ay! looks like you have network problems :(
                        <ul>
                            <li> try reloading your page </li>
                            <li>  try checking your internet connection</li>
                        </ul>
                        {"\n"} <strong>Error: {error} </strong>
                    </Alert>

                ) : (
                    <>
                        <Table hover className="user-table align-items-center">

                            <tbody>
                            {userId!=="032f27f2-22f4-436a-b697-b02c710ec22e" &&
                            <tr onClick={(e) => {
                                e.preventDefault();
                                setConversationIdSelected("");
                                setReceiver("032f27f2-22f4-436a-b697-b02c710ec22e");
                                handleClick();
                            }
                            }
                            >
                                <td>
                                    <Avatar sx={{ bgcolor: "#03807b" }}>ZS</Avatar>

                                </td>
                                <td>
                        <span className="fw-normal">
                          Zeineb
                    </span>
                                    <span className="fw-normal">
                           Sfaxi
                        </span>
                                </td>
                            </tr>
                            }
                            {agents?.filter((row) => {
                                if (search === "") {
                                    return row;
                                } else if (
                                    (row.firstName.toLowerCase().includes(search.toLowerCase()))
                                    || (row.lastName.toLowerCase().includes(search.toLowerCase()))
                                    || (row.email.toLowerCase().includes(search.toLowerCase()))
                                ) {
                                    return row;
                                }
                            }).map((agent) => (
                                <ContactAgents key= {agent._id} receiver={receiver} currentChat={currentChat} setCurrentChat={setCurrentChat}  setReceiver={setReceiver}  agent={agent} conversations={conversations} setConversationIdSelected={setConversationIdSelected} conversationIDSelected={conversationIDSelected} />
                            ))}
                            {managers?.filter((row) => {
                                if (search === "") {
                                    return row;
                                } else if (
                                    (row.name.toLowerCase().includes(search.toLowerCase()))
                                    || (row.lastName.toLowerCase().includes(search.toLowerCase()))
                                    || (row.email.toLowerCase().includes(search.toLowerCase()))
                                ) {
                                    return row;
                                }
                            }).map((manager) => (
                                // <ShopRow key= {shop._id} shop={shop}/>
                                <ContactManagers key= {manager._id} receiver={receiver} currentChat={currentChat} setCurrentChat={setCurrentChat} setReceiver={setReceiver} manager={manager} conversations={conversations} setConversationIdSelected={setConversationIdSelected} conversationIDSelected={conversationIDSelected}  />
                            ))}
                            </tbody>
                        </Table>

                    </>
                )}



        </>
    );
};

export default AllContacts;