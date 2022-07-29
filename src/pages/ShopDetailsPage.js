import {Col, Row} from "@themesberg/react-bootstrap";
import {ChoosePhotoWidget, ProfileCardWidget} from "../components/Widgets";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import React, {useEffect} from "react";
import SingleShopDetails from "./components/ShopComponents/SingleShopDetails";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetshopDetails} from "../actions/shopAction";
import {Box, CircularProgress} from "@mui/material";
import {Alert} from "@mui/lab";
import {ShopManagerCard} from "./components/ShopManagerComponents/ShopManagerCard";
import Card from "@mui/material/Card";
import MapSingleShop from "./components/ShopComponents/MapSingleShop";



export default () => {


    const routeParams = useParams();
    const idShop = routeParams.shopId;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetshopDetails(idShop))
    }, [dispatch, idShop])

    const singleShopDetails = useSelector(state => state.shopDetails)
    const loading = singleShopDetails.loading
    const shop = singleShopDetails.shop
    const error = singleShopDetails.error




    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                {/*<Dropdown>*/}
                {/*    <Dropdown.Toggle as={Button} variant="secondary" className="text-dark me-2">*/}
                {/*        <FontAwesomeIcon icon={faPlus} className="me-2" />*/}
                {/*        <span>New</span>*/}
                {/*    </Dropdown.Toggle>*/}
                {/*    <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">*/}
                {/*        <Dropdown.Item>*/}
                {/*            <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Document*/}
                {/*        </Dropdown.Item>*/}
                {/*        <Dropdown.Item>*/}
                {/*            <FontAwesomeIcon icon={faCommentDots} className="me-2" /> Message*/}
                {/*        </Dropdown.Item>*/}
                {/*        <Dropdown.Item>*/}
                {/*            <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Product*/}
                {/*        </Dropdown.Item>*/}

                {/*        <Dropdown.Divider />*/}

                {/*        <Dropdown.Item>*/}
                {/*            <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Subscription Plan*/}
                {/*        </Dropdown.Item>*/}
                {/*    </Dropdown.Menu>*/}
                {/*</Dropdown>*/}

                <div className="d-flex">
                    {/*<Dropdown>*/}
                    {/*    <Dropdown.Toggle as={Button} variant="primary">*/}
                    {/*        <FontAwesomeIcon icon={faClipboard} className="me-2" /> Reports*/}
                    {/*        <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>*/}
                    {/*    </Dropdown.Toggle>*/}
                    {/*    <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">*/}
                    {/*        <Dropdown.Item>*/}
                    {/*            <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Products*/}
                    {/*        </Dropdown.Item>*/}
                    {/*        <Dropdown.Item>*/}
                    {/*            <FontAwesomeIcon icon={faStore} className="me-2" /> Customers*/}
                    {/*        </Dropdown.Item>*/}
                    {/*        <Dropdown.Item>*/}
                    {/*            <FontAwesomeIcon icon={faCartArrowDown} className="me-2" /> Orders*/}
                    {/*        </Dropdown.Item>*/}
                    {/*        <Dropdown.Item>*/}
                    {/*            <FontAwesomeIcon icon={faChartPie} className="me-2" /> Console*/}
                    {/*        </Dropdown.Item>*/}

                    {/*        <Dropdown.Divider />*/}

                    {/*        <Dropdown.Item>*/}
                    {/*            <FontAwesomeIcon icon={faRocket} className="text-success me-2" /> All Reports*/}
                    {/*        </Dropdown.Item>*/}
                    {/*    </Dropdown.Menu>*/}
                    {/*</Dropdown>*/}
                </div>
            </div>

            <Row>

                <Col xs={12} xl={8}>


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
                            { shop &&
                            ( <SingleShopDetails shop ={shop} />)  }
                        </>
                    )}

                    {/*<Card>*/}
                    {/*    eeeee*/}
                    {/*</Card>*/}

                </Col>


                <Col xs={12} xl={4}>
                    <Row>
                        <Col xs={12}>
                            <ShopManagerCard />
                        </Col>
                        <Col xs={12}>


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
                                    { shop &&
                                    ( <MapSingleShop shop ={shop} />)  }
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>


        </>
    );
};