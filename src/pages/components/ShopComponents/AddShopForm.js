import {Button, Card, Col, Form, Row} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createShop, listShops} from "../../../actions/shopAction";

export default () => {
    const dispatch = useDispatch();
    const [shopData, setShopData] = useState({
        name: '',
        latitude: '',
        longitude: '',
        country: '',
        city: '',
        streetName:'' ,
        streetNumber: '',
        phoneNumber: '',
        zipcode: '',

    });
    const shopCreate = useSelector (state => state.shopCreate);
    const loading = shopCreate.loading
    const handleSubmit = () => {
        dispatch(createShop(shopData));
    }

    useEffect(()=> {
        if (loading === false) {
            dispatch(listShops());
        }
    },[loading])

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add a new Shop</h5>
                <Form>
                    <Row>
                        <Form.Group id="firstName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control required type="text" placeholder="Enter shop name"
                                          value={shopData.name}
                                          onChange={(e) => setShopData({
                                              ...shopData,
                                              name: e.target.value
                                          })}/>
                        </Form.Group>
                    </Row>
                    <Row>

                        <Form.Group id="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control required type="number" placeholder="+216 89 456 123"
                                          value={shopData.phoneNumber}
                                          onChange={(e) => setShopData({
                                              ...shopData,
                                              phoneNumber: e.target.value
                                          })}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group id="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control  type="file"
                                           value={shopData.image}
                                           onChange={(e) => {
                                               setShopData({
                                                   ...shopData,
                                                   image: e.target.files[0]
                                               })
                                               // previewFile(e.target.files[0])
                                           }
                                           }                            />
                        </Form.Group>

                    </Row>

                    <h5 className="my-4">Address</h5>
                    <Row>
                        <Col sm={9} className="mb-3">
                            <Form.Group id="address">
                                <Form.Label>Street Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your shop's street name"
                                              value={shopData.streetName}
                                              onChange={(e) => setShopData({
                                                  ...shopData,
                                                  streetName: e.target.value
                                              })}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={3} className="mb-3">
                            <Form.Group id="addressNumber">
                                <Form.Label>No.</Form.Label>
                                <Form.Control required type="number" placeholder="No."  value={shopData.streetNumber}
                                              onChange={(e) => setShopData({
                                                  ...shopData,
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
                                <Form.Label>Country</Form.Label>
                                <Form.Control required type="text" placeholder="Country"  value={shopData.country}
                                              onChange={(e) => setShopData({
                                                  ...shopData,
                                                  country: e.target.value
                                              })}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mb-3">

                            <Form.Group id="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control required type="text" placeholder="City"  value={shopData.city}
                                              onChange={(e) => setShopData({
                                                  ...shopData,
                                                  city: e.target.value
                                              })}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group id="zip">
                                <Form.Label>ZIP</Form.Label>
                                <Form.Control required type="tel" placeholder="ZIP"  value={shopData.zipcode}
                                              onChange={(e) => setShopData({
                                                  ...shopData,
                                                  zipcode: e.target.value
                                              })}
                                />
                            </Form.Group>
                        </Col>
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