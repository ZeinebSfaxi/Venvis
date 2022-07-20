import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row} from "@themesberg/react-bootstrap";
import {addManager, listManagers} from "../../../actions/shopManagerAction";

export default () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: '',
        lastName:'',
        email: '',
        phoneNumber: '',


    });
    const managerCreate = useSelector (state => state.managerCreate);
    const loading = managerCreate.loading
    const handleSubmit = () => {
        dispatch(addManager(data));
    }

    useEffect(()=> {
        if (loading === false) {
            dispatch(listManagers());
        }
    },[loading])

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add a new Manager</h5>
                <Form>
                    <Row>
                        <Form.Group id="firstName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control required type="text" placeholder="Enter manager name"
                                          value={data.name}
                                          onChange={(e) => setData({
                                              ...data,
                                              name: e.target.value
                                          })}/>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control required type="text" placeholder="Enter manager last name"
                                          value={data.lastName}
                                          onChange={(e) => setData({
                                              ...data,
                                              lastName: e.target.value
                                          })}/>
                        </Form.Group>
                    </Row>
                    <Row>

                        <Form.Group id="email">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control required type="email" placeholder="venvis@venvis.com"
                                          value={data.email}
                                          onChange={(e) => setData({
                                              ...data,
                                              email: e.target.value
                                          })}/>
                        </Form.Group>
                    </Row>
                    <Row>

                        <Form.Group id="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control required type="number" placeholder="+216 89 456 123"
                                          value={data.phoneNumber}
                                          onChange={(e) => setData({
                                              ...data,
                                              phoneNumber: e.target.value
                                          })}/>
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
                        <Button variant="primary" type="submit" onClick={(e) =>  {
                            e.preventDefault();
                            handleSubmit();

                        }}>Save</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};