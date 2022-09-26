import L from "leaflet";
import {createControlComponent} from "@react-leaflet/core";
import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import React from "react";

const createRoutineMachineLayer = ({depotSud, depotNord, depotCentre}) => {
    return L.Routing.control({
        waypoints: [
            L.latLng(depotCentre),
            L.latLng(depotSud)
        ],
        lineOptions: {
            styles: [{color: "#6fecab", weight: 4}]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false
    });
};

const RoutingMachine2 = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine2;