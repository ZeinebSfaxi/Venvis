import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {listCompetitors} from "../../../actions/competitorAction";
import {Card, Col, Nav,  Row, Table} from "@themesberg/react-bootstrap";
import {Box, Button, CardActions, CircularProgress, Divider, Icon, Stack, Typography} from "@mui/material";
import {Alert, Pagination} from "@mui/lab";
import CardContent from "@mui/material/CardContent";
import {CounterWidget} from "../../../components/Widgets";
import {faChartLine} from "@fortawesome/free-solid-svg-icons";
import {CompetitorCard} from "./CompetitorCard";
import {listAgents} from "../../../actions/agentAction";


export const ListCompetitor = ({search}) => {

    //display competitors
    const dispatch = useDispatch();

    const competitorList = useSelector (state => state.competitorList);
    const competitor = competitorList.competitors
    const loading = competitorList.loading
    const error = competitorList.error



    useEffect(()=> {

            dispatch(listCompetitors())

    }, [dispatch])

    // const error = false;
    // const loading = false;
    // const competitor = [
    //     {title:"eee", link:"eee", image: "https://data.whicdn.com/images/335466270/original.jpg"},
    //     {title:"ccc", link:"ccc", image: "https://data.whicdn.com/images/335466270/original.jpg"},
    //     {title:"ddd", link:"ddd", image: "https://data.whicdn.com/images/335466270/original.jpg"},
    //     {title:"fff", link:"fff", image: "https://data.whicdn.com/images/335466270/original.jpg"},
    //     {title:"aaa", link:"aaa", image: "https://data.whicdn.com/images/335466270/original.jpg"},
    //     {title:"eee", link:"eee", image: "https://data.whicdn.com/images/335466270/original.jpg"},
    //     {title:"ccc", link:"ccc", image: "https://data.whicdn.com/images/335466270/original.jpg"},
    //     {title:"ddd", link:"ddd", image: "https://data.whicdn.com/images/335466270/original.jpg"},
    //     {title:"fff", link:"fff", image: "https://data.whicdn.com/images/335466270/original.jpg"},
    //     {title:"aaa", link:"aaa", image: "https://data.whicdn.com/images/335466270/original.jpg"}];

    /****** PAGINATION****/
    const [activePage, setActivePage] = useState(1);

    const handleChange = (event, value) => {
        // dispatch(getCoursesUdemyByIdStudent());
        setActivePage(value);
        console.log(value);
    };

    return (
        <>
           < h5 className="my-4">From Amazone</h5>
        <Card>


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
                        <Row className="justify-content-around mt-3" >


                          {competitor?.filter((row) => {

                                if (search === "") {
                                    return row;
                                } else if (
                                    (row.title.toLowerCase().includes(search.toLowerCase()))
                                    // || (row.price.includes(search.toLowerCase()))
                                ) {
                                    return row;
                                }
                            // }).map((competitor) => (

                            }).slice((activePage - 1) * 4, activePage * 4).map((competitor) => (

                              <Col xs={12} sm={6} lg={4} xl={3} className="mb-4">
                                <CompetitorCard  competitor={competitor}/>

                              </Col>
                            ))}


                        </Row>
                        <Card.Footer className="px-2 border-0 d-lg-flex align-items-center justify-content-between">
                            <Stack spacing={2}>


                                <Pagination
                                    count={Math.trunc(competitor.length / 4)}
                                    page={activePage}
                                    onChange={handleChange}
                                    color="primary"
                                    variant="outlined" shape="rounded"
                                />


                        </Stack>
                        </Card.Footer>


                    </>
                )}

        </Card>
        </>
    );
};