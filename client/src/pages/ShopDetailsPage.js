import {Button, Col, Dropdown, Row} from "@themesberg/react-bootstrap";
import {ChoosePhotoWidget, ProfileCardWidget} from "../components/Widgets";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import React, {useEffect, useState} from "react";
import SingleShopDetails from "./components/ShopComponents/SingleShopDetails";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetshopDetails} from "../actions/shopAction";
import {Box, Card, CircularProgress} from "@mui/material";
import {Alert} from "@mui/lab";



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
    console.log("hedhi single shop", singleShopDetails)
    console.log("hedhi shop id", idShop)

    // useEffect(() => {
    // fetch(`http://localhost:5000/shops/${idShop}`)
    //     .then( res=> {
    //         return res.json();
    //     })
    //     .then( data => {
    //         setShopData(data);
    //     });
    // }, [])

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


                    {/*{loading ? (*/}
                    {/*    <Box sx={{ display: 'flex' }}>*/}
                    {/*        <CircularProgress />*/}
                    {/*    </Box>*/}
                    {/*) : error ? (*/}

                    {/*    <Alert variant="filled" severity="error">*/}
                    {/*        Ay ay ay! looks like you have network problems :(*/}
                    {/*        try reloading your page*/}
                    {/*        try checking your internet connection*/}
                    {/*        Error: {error}*/}
                    {/*    </Alert>*/}

                    {/*) : (*/}
                    {/*    <>*/}
                    {/*        { shop &&*/}
                    {/*        ( <SingleShopDetails shop ={shop} />)  }*/}
                    {/*    </>*/}
                    {/*)}*/}
                    {
                        shop? <SingleShopDetails shop ={shop} /> : <h1>eeee</h1>
                    }


                </Col>

                <Col xs={12} xl={4}>
                    <Row>
                        <Col xs={12}>
                            <ProfileCardWidget />
                        </Col>
                        <Col xs={12}>
                            <ChoosePhotoWidget
                                title="Select profile photo"
                                photo={Profile3}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};