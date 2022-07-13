import {Button, Card, Col} from "@themesberg/react-bootstrap";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import Profile1 from "../../../assets/img/team/profile-picture-1.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {GetManagerByShop} from "../../../actions/shopManagerAction";
import {Box, CircularProgress} from "@mui/material";
import {Alert} from "@mui/lab";
import SingleShopDetails from "../ShopComponents/SingleShopDetails";

export const ShopManagerCard = () => {

    const routeParams = useParams();
    const idShop = routeParams.shopId;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetManagerByShop(idShop))
    }, [dispatch, idShop])

    const ManagerbyShopDetails = useSelector(state => state.managerByShop)
    const loading = ManagerbyShopDetails.loading
    const shopmanager = ManagerbyShopDetails.manager[0]
    const error = ManagerbyShopDetails.error


    return (
        <>
            <Card border="light" className="text-center p-0 mb-4">


        {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (

            <Alert variant="filled" severity="error">
                Ay ay ay! looks like you have network problems :(
                try reloading your page
                try checking your internet connection
                Error: {error}
            </Alert>

            ) : (
                <>
                    { shopmanager ?
                    (
                        <>
                        <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
                        <Card.Body className="pb-5">
                            <Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
                            <Card.Title>{shopmanager.name} {shopmanager.lastName}</Card.Title>
                            <Card.Subtitle className="fw-normal">{shopmanager.email}</Card.Subtitle>
                            <Card.Text className="text-gray mb-4">{shopmanager.phoneNumber}</Card.Text>

                            <Button variant="primary" size="sm" className="me-2">
                                <FontAwesomeIcon icon={faUserEdit} className="me-1" /> Replace
                            </Button>
                            <Button variant="secondary" size="sm">Send Message</Button>
                        </Card.Body>
                        </>

                    ) : (
                            <Card.Body className="pb-5">
                                <Card.Title> No managers for this shop</Card.Title>
                                <Card.Subtitle className="fw-normal">No manager is available for this shop</Card.Subtitle>
                                <Card.Text className="text-gray mb-4">Would you like to affect a new one ?</Card.Text>

                                <Button variant="primary" size="sm" className="me-2">
                                    <FontAwesomeIcon icon={faUserEdit} className="me-1" /> Affect
                                </Button>
                            </Card.Body>
                        ) }
                </>
            )}
            </Card>

        </>

    );
};