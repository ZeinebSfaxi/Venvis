import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listSavs} from "../../../actions/savAction";
import {Card, Table} from "@themesberg/react-bootstrap";
import {Box, CircularProgress, Stack} from "@mui/material";
import {Alert, Pagination} from "@mui/lab";
import OrderRow from "../OrderComponents/OrderRow";
import SavRow from "./SAVRow";

const ListSav = ({search}) => {


    //display managers
    const dispatch = useDispatch();

    const recList = useSelector (state => state.reclamationList);
    const recs = recList.reclamations
    const loading = recList.loading
    const error = recList.error

    // filter
    const [state, setState] = useState(false);
    const handleState = () => setState(true);


    useEffect(() => {
        dispatch(listSavs())

    }, [dispatch])

    /****** PAGINATION****/
    const [activePage, setActivePage] = useState(1);
    const handleChange = (event, value) => {
        setActivePage(value);
        console.log(value);
    };

    return (
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
                                <th className="border-bottom">Receiving Date</th>
                                <th className="border-bottom">Title</th>
                                <th className="border-bottom">Description</th>
                                <th className="border-bottom">Shop ID</th>
                                <th className="border-bottom" >State</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                            </thead>

                            <tbody>


                            {recs?.filter((row) => {
                                if (search === "") {
                                    return row;
                                } else if (
                                    (row.title.toLowerCase().includes(search.toLowerCase()))
                                    || (row.state.toLowerCase().includes(search.toLowerCase()))
                                    // || (row.email.toLowerCase().includes(search.toLowerCase()))
                                ) {
                                    return row;
                                }
                            }).map((rec) => (
                                <SavRow rec={rec} />
                            ))}
                            </tbody>
                        </Table>

                        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                            <Stack spacing={2}>


                                <Pagination
                                    count={Math.trunc(recs.length / 5)}
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
    );
};

export default ListSav;