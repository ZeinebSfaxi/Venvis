import {Button, ButtonGroup, Card, Dropdown, Nav, Pagination, Table} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@mui/lab";
import {Box, CircularProgress} from "@mui/material";
import {ListOrder} from "../../../actions/orderAction";
import moment from 'moment';
import OrderRow from "./OrderRow";
import {GetshopDetails} from "../../../actions/shopAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEllipsisH, faEye, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faArrowAltCircleDown} from "@fortawesome/free-regular-svg-icons";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const ListOrders = ({search}) => {

    //display managers
    const dispatch = useDispatch();

    const orderList = useSelector (state => state.orderList);
    const orders = orderList.orders
    const loading = orderList.loading
    const error = orderList.error

    // filter
    const [state, setState] = useState(false);
    const handleState = () => setState(true);


    useEffect(() => {
        dispatch(ListOrder())

    }, [dispatch])



    return (
        <>
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
                                    <th className="border-bottom">Shop ID</th>
                                    <th className="border-bottom" >State</th>
                                    <th className="border-bottom">Validate</th>
                                    <th className="border-bottom">Action</th>
                                </tr>
                                </thead>

                                <tbody>


                                {orders?.filter((row) => {
                                    if (search === "") {
                                        return row;
                                    } else if (
                                        (row.validated.toLowerCase().includes(search.toLowerCase()))
                                        || (row.state.toLowerCase().includes(search.toLowerCase()))
                                        // || (row.email.toLowerCase().includes(search.toLowerCase()))
                                    ) {
                                        return row;
                                    }
                                }).map((order) => (
                                    <OrderRow key= {order._id} order={order} />
                                ))}
                                </tbody>
                            </Table>

                            <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                                <Nav>
                                    <Pagination className="mb-2 mb-lg-0">
                                        <Pagination.Prev>
                                            Previous
                                        </Pagination.Prev>
                                        <Pagination.Item active>1</Pagination.Item>
                                        <Pagination.Item>2</Pagination.Item>
                                        <Pagination.Item>3</Pagination.Item>
                                        <Pagination.Item>4</Pagination.Item>
                                        <Pagination.Item>5</Pagination.Item>
                                        <Pagination.Next>
                                            Next
                                        </Pagination.Next>
                                    </Pagination>
                                </Nav>
                                <small className="fw-bold">
                                    Showing <b>AA</b> out of <b>25</b> entries
                                </small>
                            </Card.Footer>
                        </>
                    )}
                </Card.Body>
            </Card>

        </>
    );
};