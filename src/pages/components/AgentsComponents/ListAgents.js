import {Card,  Nav,  Table} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@mui/lab";
import {Box, CircularProgress, Stack} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import {getToken, listAgents} from "../../../actions/agentAction";
import AgentRow from "./AgentRow";



export const ListAgents = ({search}) => {

    //display shops
    const dispatch = useDispatch();

    const agentList = useSelector (state => state.agentList);
    const agents = agentList.agents
    const loading = agentList.loading
    const error = agentList.error

    useEffect(()=> {

       dispatch(listAgents())

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
                                    <th className="border-bottom">Account Status</th>
                                    <th className="border-bottom">Action</th>
                                </tr>
                                </thead>
                                <tbody>

                                {agents?.filter((row) => {
                                    if (search === "") {
                                        return row;
                                    } else if (
                                        (row.firstName.toLowerCase().includes(search.toLowerCase()))
                                        || (row.lastName.toLowerCase().includes(search.toLowerCase()))
                                        || (row.email.toLowerCase().includes(search.toLowerCase()))
                                    ) {
                                        return row;
                                    }
                                }).map((agent) => (
                                    <AgentRow key= {agent._id} agent={agent}/>
                                ))}
                                </tbody>
                            </Table>
                            <Card.Footer className="px-2 border-0 d-lg-flex align-items-center justify-content-between">
                                <Stack spacing={2}>


                                    <Pagination
                                        count={Math.trunc(agents.length / 5)}
                                        page={activePage}
                                        onChange={handleChange}
                                        color="primary"
                                        variant="outlined" shape="rounded"
                                    />


                                </Stack>
                                {/*<Nav>*/}
                                {/*    <Pagination className="mb-2 mb-lg-0">*/}
                                {/*        <Pagination.Prev>*/}
                                {/*            Previous*/}
                                {/*        </Pagination.Prev>*/}
                                {/*        <Pagination.Item active>1</Pagination.Item>*/}
                                {/*        <Pagination.Item>2</Pagination.Item>*/}
                                {/*        <Pagination.Item>3</Pagination.Item>*/}
                                {/*        <Pagination.Item>4</Pagination.Item>*/}
                                {/*        <Pagination.Item>5</Pagination.Item>*/}
                                {/*        <Pagination.Next>*/}
                                {/*            Next*/}
                                {/*        </Pagination.Next>*/}
                                {/*    </Pagination>*/}
                                {/*</Nav>*/}
                                {/*<small className="fw-bold">*/}
                                {/*    Showing <b>AA</b> out of <b>25</b> entries*/}
                                {/*</small>*/}
                            </Card.Footer>
                        </>
                    )}






                </Card.Body>
            </Card>

        </>
    );
};