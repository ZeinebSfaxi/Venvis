import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Box, Button,  CircularProgress, Divider, Typography} from "@mui/material";
import {Col, Form, Row} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit} from "@fortawesome/free-regular-svg-icons";
import {updateShop} from "../../../actions/shopAction";
import {useDispatch} from "react-redux";


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


        <Card border="light" className="bg-white shadow-sm mb-4">

            <CardContent>
                <Row className="d-flex justify-content-between align-items-center">
                    <Col className="col-auto">
                        <h5 className="mb-4" style={{color:"#4974a5"}} >Shop: PVC-{data._id}</h5>
                    </Col>
                    <Col className="col-auto">
                        { editable ? (
                            <Button variant="success" size="sm" onClick={(e) => {
                                e.preventDefault();
                                setEditable(!editable);
                                edit();
                                console.log("houniii dispatchi el update")
                            }} className="text-dark ">
                                <FontAwesomeIcon
                                    className="justify-content-between flex-md-nowrap" icon={faCheckCircle} style={{color: "#2ecc87"}}/>
                            </Button>
                        ) : (
                            <Button variant="secondary" size="sm" onClick={() => {
                                setEditable(true)
                            }} className="text-dark ">
                                <FontAwesomeIcon
                                    className="justify-content-between flex-md-nowrap" icon={faEdit}/>
                            </Button>
                        )}

                    </Col>
                </Row>
                <Form>
                    <Row>

                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label> <Typography style={{color:"#4974a5"}}>Name: </Typography></Form.Label>
                                {editable ? (
                                    <Form.Control required type="text" placeholder="Enter shop name"
                                                  value={data.name}
                                                  onChange={(e) => setData({
                                                      ...data,
                                                      name: e.target.value
                                                  })}
                                                  /> ) : ( <Typography className="ps-2" variant="body1" > {data.name}</Typography>) }
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label><Typography style={{color:"#4974a5"}}>Phone: </Typography></Form.Label>
                                {editable ? (
                                    <Form.Control required type="number" placeholder="Enter shop name"
                                                  value={data.phoneNumber}
                                                  onChange={(e) => setData({
                                                      ...data,
                                                      phoneNumber: e.target.value
                                                  })}
                                                 />):(
                                    <Typography className="ps-2" variant="body1" > {data.phoneNumber}</Typography>
                                )}
                            </Form.Group>
                        </Col>

                    </Row>
                    <Divider className="m-3"/>

                    <h5 className="my-4"  style={{color:"#4974a5"}}>Address</h5>

                    <Row>
                        <Col sm={9} className="mb-3">

                            <Form.Group id="address">
                                <Form.Label><Typography style={{color:"#4974a5"}}>Street: </Typography> </Form.Label>
                                {editable ? (
                                    <Form.Control required type="text" placeholder="Enter your shop's street name"
                                                  value={data.streetName}
                                                  onChange={(e) => setData({
                                                      ...data,
                                                      streetName: e.target.value
                                                  })}
                                    /> ) : (<Typography className="ps-2" variant="body1" > {data.streetName}</Typography>) }
                            </Form.Group>
                        </Col>
                        <Col sm={3} className="mb-3">
                            <Form.Group id="addressNumber">
                                <Form.Label><Typography style={{color:"#4974a5"}}>No. </Typography></Form.Label>
                                {editable ? (
                                    <Form.Control required type="number" placeholder="No."
                                                  value={data.streetNumber}
                                                  onChange={(e) => setData({
                                                      ...data,
                                                      streetNumber: e.target.value
                                                  })}
                                    />) : (<Typography className="ps-2" variant="body1" > {data.streetNumber}</Typography>) }

                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        {/*dropdown countries*/}
                        <Col sm={4} className="mb-3">
                            <Form.Group id="country">
                                <Form.Label><Typography style={{color:"#4974a5"}}>Country: </Typography></Form.Label>
                                {editable ? (
                                    <Form.Control required type="text" placeholder="Country"
                                                  value={data.country}
                                                  onChange={(e) => setData({
                                                      ...data,
                                                      country: e.target.value
                                                  })}
                                    />) :(<Typography className="ps-2" variant="body1" >{data.country}</Typography>) }
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mb-3">

                            <Form.Group id="city">
                                <Form.Label><Typography style={{color:"#4974a5"}}>City: </Typography></Form.Label>
                                {editable ? (
                                    <Form.Control required type="text" placeholder="City"
                                                  value={data.city}
                                                  onChange={(e) => setData({
                                                      ...data,
                                                      city: e.target.value
                                                  })}
                                    />) :(<Typography className="ps-2" variant="body1" >{data.city}</Typography>) }

                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group id="zip">
                                <Form.Label><Typography style={{color:"#4974a5"}}>ZIP: </Typography></Form.Label>
                                {editable ? (
                                    <Form.Control required type="tel" placeholder="ZIP"
                                                  value={data.zipcode}
                                                  onChange={(e) => setData({
                                                      ...data,
                                                      zipcode: e.target.value
                                                  })}
                                    />) :(<Typography className="ps-2" variant="body1" >{data.zipcode}</Typography>) }
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>

            </CardContent>
        </Card>



    );
};