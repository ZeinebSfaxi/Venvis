import {Button, ButtonGroup, Card, Col, Dropdown, Nav, Row, Table} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Pagination} from "@mui/lab";
import {Box, CircularProgress, Stack} from "@mui/material";
import {GetOrdesrByShop, ListOrder} from "../../../actions/orderAction";
import OrderRow from "./OrderRow";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import CardContent from "@mui/material/CardContent";

export const OrderListByShop = ({idShop}) => {


    //display managers
    const dispatch = useDispatch();

    const orderList = useSelector (state => state.ordersByShop);
    const orders = orderList.ordersByShop
    const loading = orderList.loading
    const error = orderList.error

    // filter
    const [state, setState] = useState(false);
    const handleState = () => setState(true);


    //ShowDetailsIcon
    const [showDetailsIcon, setShowDetailsIcon] = useState(false);


    useEffect(() => {
        dispatch(GetOrdesrByShop(idShop))

    }, [dispatch])

    /****** PAGINATION****/
    const [activePage, setActivePage] = useState(1);
    const handleChange = (event, value) => {
        setActivePage(value);
        console.log(value);
    };


    return (
        <>
            <Row className="d-flex justify-content-between align-items-center">
                <Col className="col-auto">
                    <h5 className="mb-2" style={{color:"#4974a5"}} > List of this Shop's Orders</h5>
                    <p className="mb-4 fw-lighter">Note: It is impossible to change the order's validation if it has been accepted or rejected after 48h.</p>
                </Col>

            </Row>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">

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
                            <Table hover className="user-table align-items-center">
                                <thead>
                                <tr>
                                    <th className="border-bottom">ID</th>
                                    <th className="border-bottom">Reception Date</th>
                                    <th className="border-bottom">Due Date</th>
                                    <th className="border-bottom">Validated</th>
                                    <th className="border-bottom" >State</th>
                                    <th className="border-bottom">Action</th>
                                </tr>
                                </thead>

                                <tbody>


                                {orders?.map((order) => (
                                    <OrderRow key= {order._id} showDetailsIcon={showDetailsIcon} order={order} />
                                ))}
                                </tbody>
                            </Table>

                            <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                                <Stack spacing={2}>


                                    <Pagination
                                        count={Math.trunc(orders?.length / 4)}
                                        page={activePage}
                                        onChange={handleChange}
                                        color="primary"
                                        variant="outlined" shape="rounded"
                                    />


                                </Stack>
                            </Card.Footer>
                        </>
                    )}
                </Card.Body>
            </Card>

        </>
    );
};