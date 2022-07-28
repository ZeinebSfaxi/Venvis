import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {  Divider, Typography} from "@mui/material";
import {Button, Col, Form, Row} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit} from "@fortawesome/free-regular-svg-icons";
import {updateShop} from "../../../actions/shopAction";
import {useDispatch} from "react-redux";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";


export default ({shop}) => {

    // display data
    const [data, setData] = useState({
        _id: "",
        name:"",
        streetName: "",
        streetNumber: "",
        city:"",
        phoneNumber: "",
        country: "",
        latitude:"",
        longitude:"",
        zipcode:"",
    })

    useEffect(() => {
        if(!data.name) {
            setData({
                _id:  shop._id,
                name: shop.name,
                streetName: shop.streetName,
                streetNumber: shop.streetNumber,
                city: shop.city,
                phoneNumber: shop.phoneNumber,
                country: shop.country,
                zipcode: shop.zipcode,
            })
        }
    })

    // edit
    const [editable, setEditable] = useState(false)
    const dispatch = useDispatch()
    const edit = () => {
      if (data._id) {
          dispatch (updateShop(data._id, data))
      }
    };



    return (
        <>

        {editable? (
            <Card border="light" className="bg-white shadow-lg mb-4">
                <CardContent>
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col className="col-auto">
                            <h5 className="mb-4" style={{color:"#4974a5"}} >Shop: PVC-{data._id.slice(data._id.length -5, data._id.length).toUpperCase()}</h5>
                        </Col>
                        <Col className="col-auto">

                                <Button  variant="secondary" size="sm" className="me-2" onClick={(e) => {
                                    e.preventDefault();
                                    setEditable(!editable);
                                    edit();
                                    // console.log("houniii dispatchi el update")
                                }}>
                                    <FontAwesomeIcon icon={faCheckCircle} className="me-1" /> Save
                                </Button>

                        </Col>
                    </Row>
                    <Form>
                        <Row>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                            <Form.Label> <Typography style={{color:"#04B3AC"}}>Name: </Typography></Form.Label>
                                            <Form.Control required type="text" placeholder="Enter shop name"
                                                          value={data.name}
                                                          onChange={(e) => setData({
                                                              ...data,
                                                              name: e.target.value
                                                          })}
                                            />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">

                                            <Form.Label> <Typography style={{color:"#04B3AC"}}>Phone: </Typography></Form.Label>
                                            <Form.Control required type="number" placeholder="Enter shop number"
                                                          value={data.phoneNumber}
                                                          onChange={(e) => setData({
                                                              ...data,
                                                              phoneNumber: e.target.value
                                                          })}
                                            />

                                </Form.Group>
                            </Col>

                        </Row>
                        <Divider className="m-3"/>

                        <h5 className="my-4"  style={{color:"#4974a5"}}>Address</h5>

                        <Row>
                            <Col sm={9} className="mb-3">

                                <Form.Group id="address">
                                            <Form.Label> <Typography style={{color:"#04B3AC"}}>Street: </Typography></Form.Label>
                                            <Form.Control required type="text" placeholder="Enter your shop's street name"
                                                          value={data.streetName}
                                                          onChange={(e) => setData({
                                                              ...data,
                                                              streetName: e.target.value
                                                          })}
                                            />
                                </Form.Group>
                            </Col>
                            <Col sm={3} className="mb-3">
                                <Form.Group id="addressNumber">

                                            <Form.Label><Typography style={{color:"#04B3AC"}}>No. </Typography></Form.Label>
                                            <Form.Control required type="number" placeholder="No."
                                                          value={data.streetNumber}
                                                          onChange={(e) => setData({
                                                              ...data,
                                                              streetNumber: e.target.value
                                                          })}
                                            />

                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            {/*dropdown countries*/}
                            <Col sm={4} className="mb-3">
                                <Form.Group id="country">

                                            <Form.Label><Typography style={{color:"#04B3AC"}}>Country: </Typography></Form.Label>

                                            <Form.Control required type="text" placeholder="Country"
                                                          value={data.country}
                                                          onChange={(e) => setData({
                                                              ...data,
                                                              country: e.target.value
                                                          })}
                                            />
                                </Form.Group>
                            </Col>
                            <Col sm={4} className="mb-3">

                                <Form.Group id="city">

                                            <Form.Label><Typography style={{color:"#04B3AC"}}>City: </Typography></Form.Label>
                                            <Form.Control required type="text" placeholder="City"
                                                          value={data.city}
                                                          onChange={(e) => setData({
                                                              ...data,
                                                              city: e.target.value
                                                          })}
                                            />

                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group id="zip">

                                            <Form.Label><Typography style={{color:"#04B3AC"}}>ZIP: </Typography></Form.Label>

                                            <Form.Control required type="tel" placeholder="ZIP"
                                                          value={data.zipcode}
                                                          onChange={(e) => setData({
                                                              ...data,
                                                              zipcode: e.target.value
                                                          })}
                                            />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>

                </CardContent>

            </Card>

            ) : (

            <Card border="light" className="bg-white shadow-soft mb-4">

                <CardContent>
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col className="col-auto">
                            <h5 className="mb-4" style={{color:"#4974a5"}} >Shop: PVC-{data._id.slice(data._id.length -5, data._id.length).toUpperCase()}</h5>
                        </Col>
                        <Col className="col-auto">

                                <Button variant="primary" size="sm"  className="me-2"  onClick={() => {
                                    setEditable(true)
                                }}>
                                    <FontAwesomeIcon icon={faEdit} className="me-1" /> Edit
                                </Button>

                        </Col>
                    </Row>
                    <Form>
                        <Row>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                            <Form.Label> <Typography style={{color:"#4974a5"}}>Name: </Typography></Form.Label>
                                            <Form.Control required type="text" placeholder="Enter shop name"
                                                          value={data.name}
                                                          disabled
                                            />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                            <Form.Label><Typography style={{color:"#4974a5"}}>Phone: </Typography></Form.Label>
                                            <Form.Control required type="text" placeholder="Enter shop number"
                                                          value={data.phoneNumber}
                                                          disabled
                                            />

                                </Form.Group>
                            </Col>

                        </Row>
                        <Divider className="m-3"/>

                        <h5 className="my-4"  style={{color:"#4974a5"}}>Address</h5>

                        <Row>
                            <Col sm={9} className="mb-3">

                                <Form.Group id="address">

                                            <Form.Label><Typography style={{color:"#4974a5"}}>Street: </Typography> </Form.Label>
                                            <Form.Control required type="text" placeholder="Enter shop name"
                                                          value={data.streetName}
                                                          disabled
                                            />
                                </Form.Group>
                            </Col>
                            <Col sm={3} className="mb-3">
                                <Form.Group id="addressNumber">


                                        <Form.Label><Typography style={{color:"#4974a5"}}>No. </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"
                                                      value={data.streetNumber}
                                                      disabled
                                        />

                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            {/*dropdown countries*/}
                            <Col sm={4} className="mb-3">
                                <Form.Group id="country">

                                   <Form.Label><Typography style={{color:"#4974a5"}}>Country: </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"
                                                      value={data.country}
                                                      disabled
                                        />
                                </Form.Group>
                            </Col>
                            <Col sm={4} className="mb-3">

                                <Form.Group id="city">


                                        <Form.Label><Typography style={{color:"#4974a5"}}>City: </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"
                                                      value={data.city}
                                                      disabled
                                        />

                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group id="zip">


                                        <Form.Label><Typography style={{color:"#4974a5"}}>ZIP: </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"

                                                      value={data.zipcode}
                                                      disabled
                                        />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>

                </CardContent>

            </Card>
            )}
            </>

    );
};