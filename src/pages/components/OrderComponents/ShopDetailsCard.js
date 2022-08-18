import {Card, Col} from "@themesberg/react-bootstrap";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import {Button} from "@mui/material";
import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {GetshopDetails} from "../../../actions/shopAction";
import {useHistory} from "react-router";


export const ShopDetailsCard = ({order}) => {


    //goToDetails
    let shopId = order.shop_id;
    const history = useHistory ();
    const goToSingleShop = () => {

        history.push(`/shops/shopDetails/${shopId}`);
    };

    //get single shop

    const dispatch = useDispatch ();
    useEffect(() => {
            dispatch(GetshopDetails(shopId))

        }, [dispatch, shopId])

    const singleShopDetails = useSelector(state => state.shopDetails)
    const loading = singleShopDetails.loading
    const shop = singleShopDetails.shop
    const error = singleShopDetails.error


    return (
        <>
            <Card style={{height: "20%"}} border="light" className="shadow-sm mb-2">
                {/*<div style={{  backgroundImage: `url(${Profile1})`}}  className="profile-cover rounded-top" />*/}
                {/*<div className="profile-cover rounded-top" />*/}
                {shop.image ? (
                    <div style={{backgroundImage: `url(${shop.image})`}} className="profile-cover rounded-top"/>
                ) : <div style={{backgroundImage: `url(${ProfileCover})`}} className="profile-cover rounded-top"/>}
                <Card.Body className="pb-2">
                    {/*<Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />*/}
                    <Card.Title>{shop.name}</Card.Title>
                    <Card.Subtitle className="fw-normal mb-2">{shop.streetNumber},{shop.streetName}</Card.Subtitle>
                    <Card.Text className="text-gray mb-2">{shop.country}, {shop.city}</Card.Text>
                    {/*<Button variant="secondary" size="sm"*/}
                    {/*        onClick={goToSingleShop()}>Details</Button>*/}
                </Card.Body>
            </Card>
        </>
    );
};
