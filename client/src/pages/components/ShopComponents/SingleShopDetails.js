import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Box, Button,  CircularProgress, Divider, Typography} from "@mui/material";
import {Col, Form, Row} from "@themesberg/react-bootstrap";


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


    return (


        <Card border="light" className="bg-white shadow-sm mb-4">

            <CardContent>
                <Row className="d-flex justify-content-between align-items-center">
                    <Col className="col-auto">
                        <h5 className="mb-4" >Shop: PVC-{data._id}</h5>
                    </Col>
                    <Col className="col-auto">
                        {/*{ editable ? (*/}
                        {/*    <Button variant="success" size="sm" onClick={(e) => {*/}
                        {/*        e.preventDefault();*/}
                        {/*        editWhenClick();*/}
                        {/*        setEditable(false)*/}
                        {/*    }} className="text-dark ">*/}
                        {/*        <FontAwesomeIcon*/}
                        {/*            className="justify-content-between flex-md-nowrap" icon={faCheckCircle} style={{color: "#2ecc87"}}/>*/}
                        {/*    </Button>*/}
                        {/*) : (*/}
                        {/*    <Button variant="secondary" size="sm" onClick={() => {*/}
                        {/*        setEditable(true)*/}
                        {/*    }} className="text-dark ">*/}
                        {/*        <FontAwesomeIcon*/}
                        {/*            className="justify-content-between flex-md-nowrap" icon={faEdit}/>*/}
                        {/*    </Button>*/}
                        {/*)}*/}

                    </Col>
                </Row>
                <Form>
                    <Row>

                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>Name:</Form.Label>
                                {/*{editable ? (*/}
                                {/*    <Form.Control required type="text" placeholder="Enter shop name"*/}
                                {/*                  value={shopData.name}*/}
                                {/*                  onChange={(e) => setShopData({*/}
                                {/*                      ...shopData,*/}
                                {/*                      name: e.target.value*/}
                                {/*                  })}/> ) : ( <Typography className="ps-2" variant="body1" > {shopData.name}</Typography>) }*/}
                                <Typography className="ps-2" variant="body1"> {data.name}</Typography>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>Phone:</Form.Label>
                                {/*{editable ? (*/}
                                {/*    <Form.Control required type="number" placeholder="Enter shop name"*/}
                                {/*                  value={shopData.phoneNumber}*/}
                                {/*                  onChange={(e) => setShopData({*/}
                                {/*                      ...shopData,*/}
                                {/*                      phoneNumber: e.target.value*/}
                                {/*                  })}/>):(*/}
                                {/*    <Typography className="ps-2" variant="body1" > {shopData.phoneNumber}</Typography>*/}
                                {/*)}*/}
                                <Typography className="ps-2" variant="body1"> {data.phoneNumber}</Typography>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Divider className="m-3"/>

                    <h5 className="my-4">Address</h5>

                    <Row>
                        <Col sm={9} className="mb-3">

                            <Form.Group id="address">
                                <Form.Label>Street: </Form.Label>
                                {/*{editable ? (*/}
                                {/*    <Form.Control required type="text" placeholder="Enter your shop's street name"*/}
                                {/*                  value={shopData.streetName}*/}
                                {/*                  onChange={(e) => setShopData({*/}
                                {/*                      ...shopData,*/}
                                {/*                      streetName: e.target.value*/}
                                {/*                  })}*/}
                                {/*    /> ) : (<Typography className="ps-2" variant="body1" > {shopData.streetName}</Typography>) }*/}
                                <Typography className="ps-2" variant="body1"> {data.streetName}</Typography>
                            </Form.Group>
                        </Col>
                        <Col sm={3} className="mb-3">
                            <Form.Group id="addressNumber">
                                <Form.Label>No.</Form.Label>
                                {/*{editable ? (*/}
                                {/*    <Form.Control required type="number" placeholder="No."*/}
                                {/*                  value={shopData.streetNumber}*/}
                                {/*                  onChange={(e) => setShopData({*/}
                                {/*                      ...shopData,*/}
                                {/*                      streetNumber: e.target.value*/}
                                {/*                  })}*/}
                                {/*    />) : (<Typography className="ps-2" variant="body1" > {shopData.streetNumber}</Typography>) }*/}
                                <Typography className="ps-2" variant="body1"> {data.streetNumber}</Typography>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        {/*dropdown countries*/}
                        <Col sm={4} className="mb-3">
                            <Form.Group id="country">
                                <Form.Label>Country:</Form.Label>
                                {/*{editable ? (*/}
                                {/*    <Form.Control required type="text" placeholder="Country"  value={shopData.country}*/}
                                {/*                  onChange={(e) => setShopData({*/}
                                {/*                      ...shopData,*/}
                                {/*                      country: e.target.value*/}
                                {/*                  })}*/}
                                {/*    />) :(<Typography className="ps-2" variant="body1" >{shopData.country}</Typography>) }*/}
                                <Typography className="ps-2" variant="body1">{data.country}</Typography>
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mb-3">

                            <Form.Group id="city">
                                <Form.Label>City:</Form.Label>
                                {/*{editable ? (*/}
                                {/*    <Form.Control required type="text" placeholder="City"  value={shopData.city}*/}
                                {/*                  onChange={(e) => setShopData({*/}
                                {/*                      ...shopData,*/}
                                {/*                      city: e.target.value*/}
                                {/*                  })}*/}
                                {/*    />) :(<Typography className="ps-2" variant="body1" >{shopData.city}</Typography>) }*/}
                                <Typography className="ps-2" variant="body1">{data.city}</Typography>
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group id="zip">
                                <Form.Label>ZIP:</Form.Label>
                                {/*{editable ? (*/}
                                {/*    <Form.Control required type="tel" placeholder="ZIP"  value={shopData.zipcode}*/}
                                {/*                  onChange={(e) => setShopData({*/}
                                {/*                      ...shopData,*/}
                                {/*                      zipcode: e.target.value*/}
                                {/*                  })}*/}
                                {/*    />) :(<Typography className="ps-2" variant="body1" >{shopData.zipcode}</Typography>) }*/}
                                <Typography className="ps-2" variant="body1">{data.city}</Typography>
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>

            </CardContent>
        </Card>



    );
};