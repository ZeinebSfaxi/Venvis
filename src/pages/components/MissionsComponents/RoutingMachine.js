import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

import React from "react";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [4, 4]
});

    export default function RoutingMachine({ depotSud, depotNord, depotCentre}) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(depotNord),
                L.latLng(depotCentre),
                L.latLng(depotSud)
            ],
            lineOptions: {
                styles: [{color: "#3470e0", weight: 4}]
            },
            routeWhileDragging: true
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map]);
    return null;

}