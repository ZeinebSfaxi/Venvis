import {useEffect, useState} from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

import React from "react";
import {GetshopDetails} from "../../../actions/shopAction";
import {useDispatch, useSelector} from "react-redux";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [4, 4]
});

    export default function RoutingMachine({ depotSud, depotNord, depotCentre, array}) {

        const dispatch = useDispatch()
        const [ways, setWays] = useState([ L.latLng([36.815429, 10.304515]), L.latLng([34.724008, 10.780275])])

        useEffect(() => {
            if (array.length !==0)
            {
                setWays(array);
                console.log("YALAAAA", array)
            }
        }, [array])

    const map = useMap();



    useEffect(() => {
        if (!map) return;
        // map.clear();
        const routingControl = L.Routing.control({
            waypoints: ways,
            lineOptions: {
                styles: [{color: "#3470e0", weight: 4}]
            },
            routeWhileDragging: true
        }).addTo(map);

        console.log("GGGGGGGGGGG", map)

        return () => map.removeControl(routingControl);


    }, [map, ways]);
    return null;

}