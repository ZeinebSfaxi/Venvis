import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "../../../scss/leaflet.css";
import "leaflet/dist/leaflet.css";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import L from 'leaflet';
import {Icon} from 'leaflet'
import marker from '../../../assets/img/store-circle-blue-512.png';
import {useDispatch, useSelector} from "react-redux";
// import ProfileCover from "../../assets/img/profile-cover.jpg";
import {Button, Card} from "@themesberg/react-bootstrap";
// import Profile1 from "../../assets/img/team/profile-picture-1.jpg";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faUserPlus} from "@fortawesome/free-solid-svg-icons";


export default ({shop}) => {

    const position = [36.8815639, 10.3272283]

    const myIcon = new Icon({
        iconUrl: marker,
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


    return (
        <Card>

            <MapContainer className="m-2" center={position} zoom={9} scrollWheelZoom={true} maxZoom={18} minZoom={0}>
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

                        <Marker position={[shop.latitude, shop.longitude]} icon={myIcon}>
                            <Popup >
                                <Card  style={{  height:"20%"}} border="light" className="shadow-sm mb-2" >
                                    {/*<div style={{  backgroundImage: `url(${Profile1})`}}  className="profile-cover rounded-top" />*/}
                                    <div className="profile-cover rounded-top" />
                                    <Card.Body className="pb-2" >
                                        {/*<Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />*/}
                                        <Card.Title>{shop.name}</Card.Title>
                                        <Card.Subtitle className="fw-normal mb-2">{shop.streetNumber},{shop.streetName}</Card.Subtitle>
                                        <Card.Text className="text-gray mb-2">{shop.country}, {shop.city}</Card.Text>
                                        <Button variant="secondary" size="sm">Details</Button>
                                    </Card.Body>
                                </Card>

                            </Popup>
                        </Marker>

                </>
            </MapContainer>
        </Card>
    );
};