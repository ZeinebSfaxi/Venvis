import {Card,  Nav, Pagination, Table} from "@themesberg/react-bootstrap";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@mui/lab";
import {Box, CircularProgress} from "@mui/material";
import {listManagers} from "../../../actions/shopManagerAction";
import ManagerRow from "./ManagerRow";



export const ListManagers = ({search}) => {

    //display managers
    const dispatch = useDispatch();

    const managerList = useSelector (state => state.managerList);
    const managers = managerList.managers
    const loading = managerList.loading
    const error = managerList.error

    useEffect(() => {
        dispatch(listManagers())

    }, [dispatch])


    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                        <tr>
                            <th className="border-bottom">ID</th>
                            <th className="border-bottom">First Name</th>
                            <th className="border-bottom">Last Name</th>
                            <th className="border-bottom">E-mail</th>
                            <th className="border-bottom">PhoneNumber</th>
                            <th className="border-bottom">Action</th>
                        </tr>
                        </thead>
                        <tbody>



                        {loading ? (
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        ) : error ? (

                            <Alert variant="filled"  sx={{ width: '100%' }} severity="error">
                                Ay ay ay! looks like you have network problems :(
                                try reloading your page
                                try checking your internet connection
                                Error: {error}
                            </Alert>

                        ) : (
                            <>

                                {managers?.filter((row) => {
                                    if (search === "") {
                                        return row;
                                    } else if (
                                        (row.name.toLowerCase().includes(search.toLowerCase()))
                                        || (row.streetName.toLowerCase().includes(search.toLowerCase()))
                                    ) {
                                        return row;
                                    }
                                }).map((manager) => (
                                    // <ShopRow key= {shop._id} shop={shop}/>
                                    <ManagerRow key= {manager._id} manager={manager} />
                                ))}
                            </>
                        )}



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
                </Card.Body>
            </Card>

        </>
    );
};