import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "../../../scss/leaflet.css";
import "leaflet/dist/leaflet.css";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import L from 'leaflet';
import {Icon} from 'leaflet'
import marker from '../../../assets/img/store-circle-blue-512.png';
import {Button, Card} from "@themesberg/react-bootstrap";
import WarehouseCover from "../../../assets/img/2308901.jpg";
import warehouse from "../../../assets/img/warehouse-inventory-icon-33852.png";
import RoutingMachine from "./RoutingMachine";

import {useDispatch, useSelector} from "react-redux";
import {GetOrdesrByMission} from "../../../actions/orderAction";
import {GetshopDetails, listShops} from "../../../actions/shopAction";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import {useHistory} from "react-router";
import {Routing2} from "./RoutingMachine2";


export default ({missions, missionIdSelected}) => {

    const dispatch = useDispatch();

    const history = useHistory ();

    const position = [35.8815639, 10.3272283]
    const depotNord = [36.815429, 10.304515]
    const depotSud = [34.724008, 10.780275]
    const depotCentre = [35.829300, 10.640630]
    const eee = [ L.latLng([36.815429, 10.304515]), L.latLng([34.724008, 10.780275])]


    const myIcon = new Icon({
        iconUrl: marker,
        iconSize: [32, 32]
    })
    const myWarehouse = new Icon({
        iconUrl: warehouse,
        iconSize: [32, 32]
    })

    function GetIcon(_iconSize) {
        return L.icon(
            {
                iconUrl: require("../../../assets/img/store-circle-blue-512.png"),
                iconSize: [_iconSize]
            }
        )
    }


    // //show orders
    // const orderList = useSelector (state => state.ordersByMission);
    // const orders = orderList.ordersByMission
    //
    // useEffect(() => {
    //     if (missionIdSelected) {
    //         dispatch(GetOrdesrByMission(missionIdSelected))
    //     }
    // }, [missionIdSelected])
    //
    //
    // const shopList = useSelector (state => state.shopList);
    // const shops = shopList.shops
    //
    // useEffect(() => {
    //     dispatch(listShops())
    //
    // }, [dispatch])
    //
    //
    // const [array , setArray] = useState([]);
    // const arrayShops = [];
    // useEffect(() => {
    //
    //         orders.map((order) =>  {
    //             shops.map((s) => {
    //                 if (order.shop_id === s._id)
    //                 {
    //                    // console.log("YALAAA YA HAKIIIM111", s)
    //                     // setArray(...array, L.latLng([s.latitude, s.longitude]))
    //                     arrayShops.push([s.latitude, s.longitude])
    //                     console.log("YALAAA YA FAYCELLL", arrayShops)
    //                     // console.log("YALAAA YA KARIIIM", array)
    //                 }
    //
    //             })
    //         })
    //
    // }, [orders])


    const shopList = useSelector (state => state.shopList);
    const shops = shopList.shops

    useEffect(() => {
        dispatch(listShops())

    }, [dispatch])



    return (
        <Card>

            <MapContainer className="m-2" center={position} zoom={7} scrollWheelZoom={true} maxZoom={18} minZoom={0}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <EsriLeafletGeoSearch
                    style={{backgroundColor: 'green'}}
                    useMapBounds={false}
                    position="topleft"
                    providers={{
                        arcgisOnlineProvider: {
                            countries: ['TUN'],
                            token: "AAPK5c00f9e4346042b1ae6b1d86b0a3e6d9XWpcln8YHFo7Sq2PtJj4p5rNkgHd3w9x9NDSBugNbGT9ks0ZRtoG588BXwzXSHHm",
                            label: "Found Results",
                            maxResults: 10
                        },
                    }}
                />
                <>


                    {shops.map((row) =>
                        <Marker position={[row.latitude, row.longitude]} icon={myIcon}>
                            <Popup >
                                <Card  style={{  height:"20%"}} border="light" className="shadow-sm mb-2" >
                                    {/*<div style={{  backgroundImage: `url(${Profile1})`}}  className="profile-cover rounded-top" />*/}
                                    {/*<div className="profile-cover rounded-top" />*/}
                                    {row.image ? (
                                        <div style={{  backgroundImage: `url(${row.image})`}}  className="profile-cover rounded-top" />
                                    ) :  <div style={{  backgroundImage: `url(${ProfileCover})`}}  className="profile-cover rounded-top" />}
                                    <Card.Body className="pb-2" >
                                        {/*<Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />*/}
                                        <Card.Title>{row.name}</Card.Title>
                                        <Card.Subtitle className="fw-normal mb-2">{row.streetNumber},{row.streetName}</Card.Subtitle>
                                        <Card.Text className="text-gray mb-2">{row.country}, {row.city}</Card.Text>
                                        <Button variant="secondary" size="sm" onClick={() =>  history.push(`/shops/shopDetails/${row._id}`)}>Details</Button>
                                    </Card.Body>
                                </Card>

                            </Popup>
                        </Marker>
                    )}

                    <Marker position={depotCentre} icon={myWarehouse}>
                        <Popup >
                            <Card  style={{  height:"20%"}} border="light" className="shadow-sm mb-2" >

                                <div style={{  backgroundImage: `url(${WarehouseCover})`}}  className="profile-cover rounded-top" />
                                <Card.Body className="pb-2" >
                                    {/*<Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />*/}
                                    <Card.Title>Warehouse</Card.Title>
                                    <Card.Subtitle className="fw-normal mb-2"> Center Region </Card.Subtitle>
                                </Card.Body>
                            </Card>

                        </Popup>
                    </Marker>
                    <Marker position={depotNord} icon={myWarehouse}>
                        <Popup >
                            <Card  style={{  height:"20%"}} border="light" className="shadow-sm mb-2" >

                                <div style={{  backgroundImage: `url(${WarehouseCover})`}}  className="profile-cover rounded-top" />
                                <Card.Body className="pb-2" >
                                    {/*<Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />*/}
                                    <Card.Title>Warehouse</Card.Title>
                                    <Card.Subtitle className="fw-normal mb-2"> North Region </Card.Subtitle>
                                </Card.Body>
                            </Card>

                        </Popup>
                    </Marker>
                    <Marker position={depotSud} icon={myWarehouse}>
                        <Popup >
                            <Card  style={{  height:"20%"}} border="light" className="shadow-sm mb-2" >

                                <div style={{  backgroundImage: `url(${WarehouseCover})`}}  className="profile-cover rounded-top" />
                                <Card.Body className="pb-2" >
                                    {/*<Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />*/}
                                    <Card.Title>Warehouse</Card.Title>
                                    <Card.Subtitle className="fw-normal mb-2"> South Region </Card.Subtitle>
                                </Card.Body>
                            </Card>

                        </Popup>
                    </Marker>

                    {/*<RoutingMachine depotSud={depotSud} depotNord={depotNord} depotCentre={depotCentre}  array={array}/>*/}
                    <Routing2 depotSud={depotSud} depotNord={depotNord} depotCentre={depotCentre} missionIdSelected={missionIdSelected}  />


                </>
            </MapContainer>
        </Card>
    );
};