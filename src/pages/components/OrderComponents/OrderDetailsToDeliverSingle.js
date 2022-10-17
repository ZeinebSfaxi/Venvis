import {Button, Col, Form, Row} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {
    CardContent,
    Card,
    Box,
    CircularProgress,
    Chip,
    Typography,
    Divider,
    Stack,
    Dialog,
    DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getFirstOrderToDeliver,
    GetOrderDetails, GetOrdesrByShop,
    ListOrder,
    stateOrder,
    validateOrder
} from "../../../actions/orderAction";
import {Alert, Pagination} from "@mui/lab";
import moment from "moment";
import {OrderProductsDetails} from "./OrderProductsDetails";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {useKeycloak} from "@react-keycloak/web";


export const OrderDetailsToDeliverShop = () => {

    const routeParams = useParams();
    const idShop = routeParams.shopId;
    const dispatch = useDispatch()



    const orderDetails = useSelector(state => state.OrderToDeliver)
    const loading = orderDetails.loading
    const order = orderDetails.orderToDeliver
    const error = orderDetails.error

    useEffect(() => {
        dispatch(getFirstOrderToDeliver(idShop))
    }, [dispatch, idShop])

    /****** PAGINATION****/
    const [activePage, setActivePage] = useState(1);
    const handleChange = (event, value) => {
        setActivePage(value);
        console.log(value);
    };

    //validate
    const [accept, setAccept] =useState({validated: "accepted"});
    const [refuse, setRefuse] =useState({validated: "rejected"});
    const [rejectedState, setRejectedState] =useState({state: "rejected"});
    const [reviewState, setReviewState] =useState({state: "to review"});

    const acceptValidation = async () => {
        if (order._id ) {
            await dispatch (validateOrder(order._id, accept));
            await dispatch (stateOrder(order._id, reviewState));
            await dispatch(getFirstOrderToDeliver(idShop));
            await   dispatch(GetOrdesrByShop(idShop));
        }
    };

    const [dialogue, setDialogue] =useState(false);
    const refuseValidation = async () => {
        if (order._id ) {
            await dispatch (validateOrder(order._id, refuse));
            await dispatch (stateOrder(order._id, rejectedState));
            await  dispatch(getFirstOrderToDeliver(idShop));
            await   dispatch(GetOrdesrByShop(idShop));
        }
    };
    const handleCloseDialogue = value => {
        setDialogue(false);
    };

    // // today
    const today = new Date()

    const keycloak = useKeycloak();
    const userId = keycloak.keycloak.subject;


    return (

        <>

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
                                      <h5 className="mb-4" style={{color:"#4974a5"}}> Closest Delivery:  CMD-{order._id?.slice(order._id.length -5, order._id.length).toUpperCase()} </h5>
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
                            {userId === "032f27f2-22f4-436a-b697-b02c710ec22e" &&
                            <>
                                {/*{order.validated !== 'to review' || moment(today).format('DD-MM-YYYY') > moment(order.sendingDate).add(2, 'days').format('DD-MM-YYYY') ?*/}

                                    {((moment(order.sendingDate).add(2, 'days').isAfter(today))  )|| order.validated === 'to review'  ?
                                    (<>
                                        <Row className="d-flex justify-content-lg-end align-items-end mb-3">
                                            <Col className="col-auto ">
                                                <Button style={{backgroundColor: "#0aae0d", borderColor: "#0aae0d"}}
                                                        size="sm" className="me-2" onClick={(e) => {
                                                    e.preventDefault();
                                                    acceptValidation();

                                                }}>
                                                    <FontAwesomeIcon icon={faCheck} className="me-1"/> Accept
                                                </Button>
                                            </Col>

                                            <Col className="col-auto ">
                                                <Button style={{backgroundColor: "#ef4641", borderColor: "#ef4641"}}
                                                        size="sm" className="me-2" onClick={() => {
                                                    setDialogue(true)
                                                }}>
                                                    <FontAwesomeIcon icon={faBan} className="me-1"/> Reject
                                                </Button>
                                            </Col>
                                        </Row>

                                    </>) :  (
                                            <>

                                                <Row className="d-flex justify-content-lg-end align-items-end mb-3">
                                                    <Col className="col-auto ">
                                                        <Button disabled size="sm" className="me-2">
                                                            <FontAwesomeIcon icon={faCheck} className="me-1"/> Accept
                                                        </Button>
                                                    </Col>

                                                    <Col className="col-auto ">
                                                        <Button disabled size="sm" className="me-2">
                                                            <FontAwesomeIcon icon={faBan} className="me-1"/> Reject
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            </>
                                        )
                                    }
                            </>
                            }

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

                            <h5 className="mb-4" style={{color:"#4974a5"}}> Products: ({order.products?.length}) </h5>

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

    {/*Refuse Dialogue*/}
    <Dialog open={dialogue} onClose={handleCloseDialogue} style={{width: '100%'}}>
        <DialogTitle>
            Are You Sure You Want To Reject This Order ?
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Please provide below a reason for the rejection. This will be sent to the shop's manager.

                <Form.Group controlId="exampleForm.ControlTextarea1" required type="text" placeholder="Enter Your message here">
                    <Form.Label>Your Message </Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>

            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                size="sm"
                variant="primary" type="submit"
                onClick={handleCloseDialogue}
            >
                Cancel
            </Button>
            <Button size="sm" variant="contained" color="error" type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        refuseValidation();
                        handleCloseDialogue();
                    }}>Reject</Button>

        </DialogActions>

    </Dialog>
    </>
    );
};