import React, {useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBoxOpen,
    faCalendarAlt,
    faCartArrowDown,
    faChartPie,
    faChevronDown,
    faClipboard,
    faCommentDots,
    faFileAlt, faHome,
    faPlus,
    faRocket, faSearch,
    faStore
} from '@fortawesome/free-solid-svg-icons';
import {Col, Row, Button, Dropdown, Form, InputGroup, Breadcrumb, ButtonGroup} from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import Datetime from "react-datetime";
import moment from "moment-timezone";
import Card from "@mui/material/Card";
import AllContacts from "./components/MessengerComponents/AllContacts";
import Message from "./components/MessengerComponents/Message";
import SendArea from "./components/MessengerComponents/SendArea";
import {useKeycloak} from "@react-keycloak/web";
import ListMessages from "./components/MessengerComponents/ListMessages";
import {io} from "socket.io-client";
import {addMessage, GetMessageByConvo} from "../actions/chatAction";
import {useDispatch} from "react-redux";


export default () => {
    const dispatch = useDispatch();
    const { keycloak, initialized } = useKeycloak();

    const userId = keycloak.tokenParsed.sub

    const [conversationIDSelected, setConversationIdSelected] = useState("")
    const [currentChat, setCurrentChat] = useState({})
    const [arrivalMessage, setArrivalMessage] = useState(null)

    /**********************SOCKET IMPLEMENTATION*****************/

    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, []);



    useEffect(() => {
        socket.current.emit("addUser", userId);
        socket.current.on ("getUsers", users => {
            console.log("HEEEEEHIII", users)
        })
    }, [userId])


    const [search, setSearch] = useState("")
    const [own, setOwn] = useState(true)

    /***********************SEND MESSAGE ********************/

    const [newMessage, setNewMessage] = useState("")
    const [receiver, setReceiver] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault();
        socket.current.emit("sendMessage", {
            senderId: userId,
            receiverId: receiver,
            text: newMessage,
        })

        const message = {
            sender: userId,
            text:  newMessage,
            conversationId : conversationIDSelected
        }
        dispatch(addMessage (message) )
        setNewMessage("")
        dispatch(GetMessageByConvo(conversationIDSelected))
    }



    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Venvis</Breadcrumb.Item>
                        <Breadcrumb.Item active>Chat</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Chat</h4>
                    <p className="mb-0">Communicate with your employees.</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">

                </div>
            </div>

        <div className="messenger">

            <Row>

                <Col xs={12} xl={8}>
                    <Card border="light" className="box" style={{marginBottom:50}}>
                        <div className="chatBoxTop">
                        {conversationIDSelected?
                            (
                                <>
                                <ListMessages arrivalMessage={arrivalMessage}  socket={socket} setArrivalMessage={setArrivalMessage} currentChat={currentChat} conversationIDSelected={conversationIDSelected} userId={userId}/>
                                </>
                           ) : (
                               <>
                                <h1 style={{color:"#a5a5a5"}}> Start a new conversation</h1>
                               </>
                            )
                        }
                        </div>

                        <div className="chatBoxBottom" style={{backgroundColor:"#d2efee"}}>
                            <div>
                            <Card  className=" shadow-sm" style={{backgroundColor:"#d2efee"}}>
                                <Row>
                                    <Col md={10} className="mb-3">
                                        <Form>
                                            <Row>
                                                <Form.Group id="textArea">

                                                    <Form.Control required type="text" placeholder="Enter your message..."
                                                                  value={newMessage}
                                                                  onChange={(e) =>
                                                                      setNewMessage( e.target.value)
                                                                  }
                                                    />

                                                </Form.Group>
                                            </Row>

                                        </Form>

                                    </Col>
                                    <Col md={2} className="mb-3">
                                        <Button onClick={handleSubmit}>
                                            Send
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={8} xl={4}>
                    <Card border="light" className="box" >

                        <div className=" p-4 ">
                            <div className="d-block mb-4 mb-md-0">

                                <h5>Contacts: </h5>
                                <p className="mb-0">Who would you like to contact?</p>
                            </div>


                            <InputGroup className="mt-2 mb-4">
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputGroup.Text>
                                <Form.Control type="text" placeholder="Search Contact"  onChange={(e) => setSearch(e.target.value)}/>
                            </InputGroup>

                            <AllContacts receiver={receiver} currentChat={currentChat} setCurrentChat={setCurrentChat} setReceiver={setReceiver} userId={userId} search={search} conversationIDSelected={conversationIDSelected} setConversationIdSelected={setConversationIdSelected} />

                        </div>

                    </Card>

                </Col>
            </Row>
        </div>
        </>
    );
};
