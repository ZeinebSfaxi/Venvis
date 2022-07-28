import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row} from "@themesberg/react-bootstrap";
import {addManager, listManagers} from "../../../actions/shopManagerAction";
import {Alert} from "@mui/lab";

export default () => {

    // Add
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: '',
        lastName:'',
        email: '',
        phoneNumber: '',


    });
    const managerCreate = useSelector (state => state.managerCreate);
    const loading = managerCreate.loading
    const handleSubmit = (e) => {
        if(!errorEmail && !errorFirstName && !errorLastName && !errorPhoneNumber) {
            e.preventDefault();
            dispatch(addManager(data));
            setErrorAll(false)
        } else {
            setErrorAll(true)
        }

    }

    useEffect(()=> {
        if (loading === false) {
            dispatch(listManagers());
        }
    },[loading])


    //Form validation
    const [errorAll, setErrorAll] = useState(false)
    const [errorFirstName, setErrorFirstName] = useState(false)
    const [errorLastName, setErrorLastName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false)
    const [disab, setDisab] = useState(true)

    useEffect(() => {
        if (data.name !== '' && data.lastName !== ''  && data.email !== ''  && data.phoneNumber.length === 8 ) {
            setDisab(false);

        } else setDisab(true);

    }, [data]);

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add a new Manager</h5>
                <Form onSubmit={handleSubmit} >
                    {errorAll && (
                        <Alert variant="filled" severity="error">
                            Please fill all the required fields
                        </Alert>
                    )}
                    <Row>

                        <Form.Group id="firstName">
                            <Form.Label>First name:</Form.Label>

                                    <Form.Control required type="text" placeholder="Enter manager name"
                                                  isInvalid={errorFirstName}
                                                  value={data.name}
                                                  onChange={(e) => {setData({
                                                      ...data,
                                                      name: e.target.value
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
                        <Form.Group id="lasName">
                            <Form.Label>Last name:</Form.Label>
                            <Form.Control required type="text" placeholder="Enter manager last name"
                                          isInvalid={errorLastName}
                                          value={data.lastName}
                                          onChange={(e) => {setData({
                                              ...data,
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
                    </Row>
                    <Row>

                        <Form.Group id="email">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control required type="email" placeholder="venvis@venvis.com"
                                          isInvalid={errorEmail}
                                          value={data.email}
                                          onChange={(e) => {
                                              setData({
                                                  ...data,
                                                  email: e.target.value
                                              })
                                              if (e.target.value.length === 0) {
                                                  setErrorEmail(true);
                                              } else setErrorEmail(false);
                                          }
                                          }/>
                            <Form.Control.Feedback type="invalid" >
                                Email is invalid !
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>

                        <Form.Group id="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control required type="number" placeholder="+216 89 456 123"
                                          isInvalid={errorPhoneNumber}
                                          value={data.phoneNumber}
                                          onChange={(e) => {setData({
                                              ...data,
                                              phoneNumber: e.target.value
                                          })
                                              if (e.target.value.length !== 8) {
                                                  setErrorPhoneNumber(true);
                                              } else setErrorPhoneNumber(false);
                                          }}/>
                            <Form.Control.Feedback type="invalid" >
                                Phone number is invalid
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        {/*<Form.Group id="image">*/}
                        {/*    <Form.Label>Image</Form.Label>*/}
                        {/*    <Form.Control  type="file"*/}
                        {/*                   value={data.image}*/}
                        {/*                   onChange={(e) => {*/}
                        {/*                       setData({*/}
                        {/*                           ...data,*/}
                        {/*                           image: e.target.files[0]*/}
                        {/*                       })*/}
                        {/*                       // previewFile(e.target.files[0])*/}
                        {/*                   }*/}
                        {/*                   }                            />*/}
                        {/*</Form.Group>*/}

                    </Row>


                    <div className="mt-3">
                        {disab ?  <Button variant="primary" disabled type="submit">Add Manager</Button> :  <Button variant="primary" type="submit">Add Manager</Button>}

                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};