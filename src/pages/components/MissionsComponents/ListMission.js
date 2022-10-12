import {Button, ButtonGroup, Card, Col, Dropdown, Nav, Table} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Pagination} from "@mui/lab";
import {Box, CircularProgress, Stack} from "@mui/material";
import {ListMissions} from "../../../actions/missionAction";
import MissionRow from "./MissionRow";
import {useKeycloak} from "@react-keycloak/web";


export const ListMission = ({missions, loading, error, search, setMissionIdSelected}) => {




    // filter
    const [state, setState] = useState(false);
    const handleState = () => setState(true);



    /****** PAGINATION****/
    const [activePage, setActivePage] = useState(1);
    const handleChange = (event, value) => {
        setActivePage(value);
        console.log(value);
    };


const keycloak = useKeycloak()
    const userId = keycloak.keycloak.subject;

    //ShowDetailsIcon
    // const [showDetailsIcon, setShowDetailsIcon] = useState(true);


    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm mb-4">
                <Card.Body className="pt-0">
                    <p className="mb-4 mt-4 fw-bolder" style={{color:"#5c96de"}}>Select an order for directions.</p>

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
                                    <th className="border-bottom">Creation Date</th>
                                    <th className="border-bottom">Due Date</th>
                                    <th className="border-bottom">Commercial Agent</th>
                                    <th className="border-bottom" >State</th>
                                    <th className="border-bottom">Action</th>
                                </tr>
                                </thead>
                                {userId === "032f27f2-22f4-436a-b697-b02c710ec22e" ?
                              (  <tbody>


                                {missions?.filter((row) => {
                                    if (search === "") {
                                        return row;
                                    } else if (
                                        (row.state.toLowerCase().includes(search.toLowerCase()))
                                        // || (row.email.toLowerCase().includes(search.toLowerCase()))
                                    ) {
                                        return row;
                                    }
                                }).map((mission) => (
                                    <MissionRow  key= {mission._id} userId={userId} mission={mission} setMissionIdSelected={setMissionIdSelected}/>

                                ))}
                                </tbody>) : (
                                        <tbody>


                                        {missions?.filter((row) => {
                                            if (row.agent_id === userId) {
                                                return row;
                                            }
                                        }).map((mission) => (
                                            <MissionRow  key= {mission._id} userId={userId} mission={mission} setMissionIdSelected={setMissionIdSelected}/>

                                        ))}
                                        </tbody>
                                    ) }
                            </Table>

                            <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                                <Stack spacing={2}>


                                    <Pagination
                                        count={Math.trunc(missions.length / 4)}
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