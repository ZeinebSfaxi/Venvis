import {Col, Form, Row} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {CardContent, Card, Box, CircularProgress, Chip, Typography, Divider, Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetOrderDetails} from "../../../actions/orderAction";
import {Alert, Pagination} from "@mui/lab";
import moment from "moment";
import ShopRow from "../ShopComponents/ShopRow";
import {OrderProductsDetails} from "./OrderProductsDetails";


export const OrderDetailsForSingleShop = () => {

    const routeParams = useParams();
    const idShop = routeParams.shopId;
    const idOrder = routeParams.orderId;
    const dispatch = useDispatch()

    useEffect(() => {
         dispatch(GetOrderDetails(idOrder))
    }, [dispatch, idShop])

    const singleOrderDetails = useSelector(state => state.singleOrder)
    const loading = singleOrderDetails.loading
    const order = singleOrderDetails.order
    const error = singleOrderDetails.error


    /****** PAGINATION****/
    const [activePage, setActivePage] = useState(1);
    const handleChange = (event, value) => {
        setActivePage(value);
        console.log(value);
    };

    return (

        <Card border="light" className="bg-white shadow-lg mb-4">
            <CardContent>
        {loading ? (
                <Box className="m-5" sx={{ display: 'flex',alignItems: 'center',
                    justifyContent: 'center',  }} >
                    <CircularProgress style={{color:"#323854"}} />
                </Box>
            ) : error ? (

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
                    { order &&
                    ( <>

                            <Row className="d-flex justify-content-lg-start align-items-start">
                            <Col className="col-auto">
                        <h5 className="mb-4" style={{color:"#4974a5"}}> Order Details:  CMD-{order._id?.slice(order._id.length -5, order._id.length).toUpperCase()} </h5>
                            </Col>
                                <Col className="col-auto">
                                    { order.state === 'to review' ?

                                        <Chip label="Stand by" className="fw-bolder" style={{backgroundColor: "#CCCCCC"}} />
                                        : order.state=== 'delivered' ?
                                            <Chip label="Delivered" className="fw-bolder" style={{backgroundColor: "#0aae0d"}} />
                                            : order.state=== 'on going' ?
                                                <Chip label="On going" className="fw-bolder" style={{backgroundColor: "#adfcad"}} />
                                                : order.state=== 'rejected' ?
                                                    <Chip label="Rejected"  className="fw-bolder" style={{backgroundColor: "#d61d1d"}} />
                                                    : order.state ==='late' &&
                                                    <Chip label="Late"  className="fw-bolder" style={{backgroundColor: "#f6a01e"}} />
                                    }
                                </Col>
                            </Row>

                        <Form>
                            <Row>

                                <Col md={4} className="mb-3">
                                    <Form.Group id="validated">
                                        <Form.Label> <Typography style={{color:"#4974a5"}}>Validated: </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"
                                                      value={order.validated}
                                                      disabled
                                        />
                                    </Form.Group>
                                </Col>


                                <Col sm={4} className="mb-3">

                                    <Form.Group id="date1">

                                        <Form.Label><Typography style={{color:"#4974a5"}}>Reception Date: </Typography> </Form.Label>
                                        <Form.Control required type="text"
                                                      value={moment(order.sendingDate).format('DD-MM-YYYY')}
                                                      disabled
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={4} className="mb-3">
                                    <Form.Group id="addressNumber">


                                        <Form.Label><Typography style={{color:"#4974a5"}}>Due Date: </Typography></Form.Label>
                                        <Form.Control required type="text"
                                                      value={moment(order.deliveryDate).format('DD-MM-YYYY')}
                                                      disabled
                                        />

                                    </Form.Group>
                                </Col>

                            </Row>

                        </Form>

                        <h5 className="mb-4" style={{color:"#4974a5"}}> Porducts: ({order.products?.length}) </h5>

                        <Row className="mt-3 ">
                            {order.products?.slice((activePage - 1) * 3, activePage * 3).map((product) => (

                                <OrderProductsDetails product={product} />
                            ))}

                            <Pagination
                                count={Math.trunc(order.products?.length / 3)}
                                page={activePage}
                                onChange={handleChange}
                                color="primary"
                                variant="outlined" shape="rounded"
                            />
                        </Row>
                    </>)  }
                </>
            )}


            </CardContent>
        </Card>
    );
};