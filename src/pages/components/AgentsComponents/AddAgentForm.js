import {Button, Card, Col, Form, InputGroup, Row} from "@themesberg/react-bootstrap";
import Datetime from "react-datetime";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {v4 as uuidv4} from 'uuid';
import {createAgent, getToken, listAgents} from "../../../actions/agentAction";
import {createShop, listShops} from "../../../actions/shopAction";
import {DialogContentText} from "@mui/material";



export default ({ setDialogueForm}) => {
    let id = uuidv4();
    const dispatch = useDispatch();
    const [agentData, setAgentData] = useState({
        attributes: {phone: ''},
        firstName: '',
        lastName: '',
        username:'',
        email: '',
        enabled: false,
        credentials: [{
            type: "password",
            value: 'Inetum2022',
            temporary: true
        }],
        groups: ["agents"],
    });


    const agentCreate = useSelector (state => state.agentCreate);
    const loading = agentCreate.loading
    const error = agentCreate.error

    const handleSubmit = () => {
        getToken();
        dispatch(createAgent(agentData));
    }

    useEffect(()=> {
        if (loading === false) {
            dispatch(listAgents());
        }
    },[loading])


    //form Validation

    const [errorAll, setErrorAll] = useState(false)
    const [errorFirstName, setErrorFirstName] = useState(false)
    const [errorLastName, setErrorLastName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false)
    const [disab, setDisab] = useState(true)

    useEffect(() => {
        if (agentData.name !== '' && agentData.lastName !== ''  && agentData.email !== ''  && agentData.attributes.phone.length === 8 ) {
            setDisab(false);

        } else setDisab(true);

    }, [agentData]);

    /***********Send mail to change pwd ********************/

    // function sendEmail(e) {
    //     e.preventDefault();
    //
    //     window.Email.send({
    //         SecureToken: "088dd6c8-5f15-4753-b4c1-9e666a535a21",
    //         To: agentData.email,
    //         From: "inetumSales@gmail.com",
    //         Subject: "Inetum Sales Account Access ",
    //         Body: "And this is the body" + data.firstname
    //     }).then(
    //         message => alert(message))
    // };

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">

            <Card.Body>

                <h5>General information</h5>
                <p className="mb-4">NB: Creating an agent sends them an email with a default password.</p>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>First Name</Form.Label>

                                <Form.Control required type="text" placeholder="Enter manager name"
                                              isInvalid={errorFirstName}
                                              value={agentData.firstName}
                                              onChange={(e) => {setAgentData({
                                                  ...agentData,
                                                  firstName: e.target.value
                                              })
                                                  if (e.target.value.length === 0 ||/^\d+$/.test(e.target.value)) {
                                                      setErrorFirstName(true);
                                                  } else setErrorFirstName(false);
                                              }
                                              }

                                />
                                <Form.Control.Feedback type="invalid" >
                                    First name is invalid !
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Group id="lastName">
                                <Form.Label>Last Name</Form.Label>

                                <Form.Control required type="text" placeholder="Enter manager last name"
                                              isInvalid={errorLastName}
                                              value={agentData.lastName}
                                              onChange={(e) => {setAgentData({
                                                  ...agentData,
                                                  lastName: e.target.value
                                              })
                                                  if (e.target.value.length === 0 ||/^\d+$/.test(e.target.value)) {
                                                      setErrorLastName(true);
                                                  } else setErrorLastName(false);
                                              }
                                              }/>

                                <Form.Control.Feedback type="invalid" >
                                    Last name is invalid !
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="email">
                                <Form.Label>Email: </Form.Label>
                                <Form.Control required type="email" placeholder="name@company.com"
                                              value={agentData.email}

                                              onChange={(e) => {
                                                  setAgentData({
                                                      ...agentData,
                                                      email: e.target.value,
                                                      username: e.target.value
                                                  })
                                                  if (e.target.value.length === 0) {
                                                      setErrorEmail(true);
                                                  } else setErrorEmail(false);
                                              }}/>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control required type="text" placeholder="+216"
                                              value={agentData.attributes.phone}
                                              onChange={e =>
                                              { setAgentData({
                                                  // object that we want to update
                                                  ...agentData, // keep all other key-value pairs
                                                  attributes: {...agentData.attributes, phone: e.target.value} // update the value of specific key
                                              })
                                                  if (e.target.value.length !==8 ) {
                                                      setErrorPhoneNumber(true);
                                                  } else setErrorPhoneNumber(false);
                                              }}
                                />
                                <Form.Control.Feedback type="invalid" >
                                    Phone number is invalid
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Col>
                    </Row>
                    <div md={6} className="mb-3">
                        <Form.Group id="Activate">
                            <Row>
                                <Col>
                                    <Form.Label>Activate account</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Check className="ml-3"
                                                onChange={(e) => setAgentData({
                                                    ...agentData,
                                                    enabled: e.target.checked
                                                })
                                                }
                                                size="sm" width={50}/>
                                </Col>
                            </Row>
                        </Form.Group>
                    </div>

                    <div className="mt-3">
                        {disab?
                            <Button size="sm" variant="primary" type="submit" disabled>Save</Button> :
                            <Button size="sm" variant="primary" type="submit" onClick={(e) => {
                                e.preventDefault();
                                // sendEmail(e);
                                getToken();
                                handleSubmit();
                                setDialogueForm(false);
                            }}>Save</Button>
                        }
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};