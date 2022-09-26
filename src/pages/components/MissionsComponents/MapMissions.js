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
import RoutingMachine2 from "./RoutingMachine2";
import {useDispatch, useSelector} from "react-redux";
import {GetOrdesrByMission} from "../../../actions/orderAction";


export default ({missions}) => {

    const dispatch = useDispatch();

    const position = [35.8815639, 10.3272283]
    const depotNord = [36.815429, 10.304515]
    const depotSud = [34.724008, 10.780275]
    const depotCentre = [35.829300, 10.640630]


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

    const orderList = useSelector (state => state.ordersByMission);
    const orders = orderList.ordersByMission
    const loading = orderList.loading
    const error = orderList.error

    const [arrShops, setArrShops]=useState([]);

    // useEffect(() => {
    //     if (missions) {
    //         missions.map((m)=> {
    //             dispatch(GetOrdesrByMission(m._id))
    //         })
    //
    //     }
    // }, [missions])
    //
    //
    // useEffect(() => {
    //     orders.map((o)=> {
    //         if (!arrShops.includes(o))
    //         setArrShops([...arrShops, o])
    //         console.log("eeeee",o)
    //
    //     })
    // }, [orders])
    //
    // console.log("hedhi arrShops", arrShops)

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

                    <RoutingMachine depotSud={depotSud} depotNord={depotNord} depotCentre={depotCentre} />
                    {/*<RoutingMachine2 depotSud={depotSud} depotNord={depotNord} depotCentre={depotCentre} />*/}

                    {/*<Marker position={[shop.latitude, shop.longitude]} icon={myIcon}>*/}
                    {/*    <Popup >*/}
                    {/*        <Card  style={{  height:"20%"}} border="light" className="shadow-sm mb-2" >*/}
                    {/*            /!*<div style={{  backgroundImage: `url(${Profile1})`}}  className="profile-cover rounded-top" />*!/*/}
                    {/*            {shop.image ? (*/}
                    {/*                <div style={{  backgroundImage: `url(${shop.image})`}}  className="profile-cover rounded-top" />*/}
                    {/*            ) :  <div style={{  backgroundImage: `url(${ProfileCover})`}}  className="profile-cover rounded-top" />}*/}
                    {/*            <Card.Body className="pb-2" >*/}
                    {/*                /!*<Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />*!/*/}
                    {/*                <Card.Title>{shop.name}</Card.Title>*/}
                    {/*                <Card.Subtitle className="fw-normal mb-2">{shop.streetNumber},{shop.streetName}</Card.Subtitle>*/}
                    {/*                <Card.Text className="text-gray mb-2">{shop.country}, {shop.city}</Card.Text>*/}

                    {/*            </Card.Body>*/}
                    {/*        </Card>*/}

                    {/*    </Popup>*/}
                    {/*</Marker>*/}

                </>
            </MapContainer>
        </Card>
    );
};