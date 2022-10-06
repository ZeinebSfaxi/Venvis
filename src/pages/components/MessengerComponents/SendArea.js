import React, {useState} from 'react';
import {Col, Dropdown, Form, Row} from "@themesberg/react-bootstrap";
import Card from "@mui/material/Card";
import {Button} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import {addMessage, GetMessageByConvo} from "../../../actions/chatAction";
import {useDispatch} from "react-redux";


const SendArea = ({userId, conversationIdSelected}) => {
    const dispatch = useDispatch()
    const [newMessage, setNewMessage] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            sender: userId,
            text:  newMessage,
            conversationId : conversationIdSelected
        }
        dispatch(addMessage (message) )
        setNewMessage("")
        dispatch(GetMessageByConvo(conversationIdSelected))
    }


    return (
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
    );
};

export default SendArea;