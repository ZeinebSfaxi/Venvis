import {Card,  Nav, Pagination, Table} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@mui/lab";
import {Box, CircularProgress, Stack} from "@mui/material";
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

    /****** PAGINATION****/
    const [activePage, setActivePage] = useState(1);

    const handleChange = (event, value) => {
        // dispatch(getCoursesUdemyByIdStudent());
        setActivePage(value);
        console.log(value);
    };

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
                                    <th className="border-bottom">First Name</th>
                                    <th className="border-bottom">Last Name</th>
                                    <th className="border-bottom">E-mail</th>
                                    <th className="border-bottom">Phone Number</th>
                                    <th className="border-bottom">SHOP MANAGING</th>
                                    <th className="border-bottom">Action</th>
                                </tr>
                                </thead>
                                <tbody>

                                {managers?.filter((row) => {
                                    if (search === "") {
                                        return row;
                                    } else if (
                                        (row.name.toLowerCase().includes(search.toLowerCase()))
                                        || (row.lastName.toLowerCase().includes(search.toLowerCase()))
                                        || (row.email.toLowerCase().includes(search.toLowerCase()))
                                    ) {
                                        return row;
                                    }
                                }).slice((activePage - 1) * 5, activePage * 5).map((manager) => (
                                    // <ShopRow key= {shop._id} shop={shop}/>
                                    <ManagerRow key= {manager._id} manager={manager} />
                                ))}
                                </tbody>
                            </Table>

                                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                                    <Stack spacing={2}>


                                        <Pagination
                                            count={Math.trunc(managers.length / 5)}
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