import L from "leaflet";
import {createControlComponent} from "@react-leaflet/core";
import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {GetOrdesrByMission} from "../../../actions/orderAction";
import {listShops} from "../../../actions/shopAction";

export const Routing2 = ({ depotNord, depotCentre,depotSud, missionIdSelected}) => {

/********************************/
    const dispatch = useDispatch()

    //show orders
    const orderList = useSelector (state => state.ordersByMission);
    const orders = orderList.ordersByMission

    useEffect(() => {
        if (missionIdSelected) {
            dispatch(GetOrdesrByMission(missionIdSelected))
        }
    }, [missionIdSelected])


    const shopList = useSelector (state => state.shopList);
    const shops = shopList.shops

    useEffect(() => {
        dispatch(listShops())

    }, [dispatch])


    const [array , setArray] = useState([]);
    const arrayShops = [];
    useEffect(() => {
        if(orders) {
            if (orders[0]?.region === "north") {
                arrayShops.splice(0,0,depotNord)
            } else if (orders[0]?.region === "center"){
                arrayShops.splice(0,0,depotCentre)
            } else if (orders[0]?.region === "south") {
                arrayShops.splice(0,0,depotSud)
            }

        }
        orders.map((order) =>  {
            shops.map((s) => {
                if (order.shop_id === s._id)
                {
                    // console.log("YALAAA YA HAKIIIM111", s)
                    // setArray(...array, L.latLng([s.latitude, s.longitude]))
                    arrayShops.push(L.latLng([s.latitude, s.longitude]))
                    console.log("YALAAA YA FAYCELLL", arrayShops)
                    // console.log("YALAAA YA KARIIIM", array)
                }

            })
        })

    }, [orders])




/********************************/

    useEffect(() => {
        createLayer( arrayShops)

    }, [])

    let instance = L.Routing.control({
        waypoints: arrayShops,
        lineOptions: {
            styles: [{ color: "#5d90e9", weight: 5 }]
        },
    });




    const createLayer = (arrayShops) => {


        instance.getPlan().setWaypoints(arrayShops)

        console.log("total timeee", arrayShops)
        // instance.on('routesfound', (e) => {
        //     let routes = e.routes;
        //     let summary = routes[0].summary;
        //     let totalTime = moment.utc(1000 * summary.totalDistance).format("H[h] mm[m]")
        //     console.log('total time: ', totalTime);
        //     let totalDistance = Math.floor(summary.totalDistance / 1000)
        //     // dispatch(setTime(totalTime))
        //     // dispatch(setDistance(totalDistance))
        // });

        return instance;
    };

    useEffect(() => {
        createLayer(arrayShops)
    }, [arrayShops])

    // console.log("toootal", array)
    const RoutingMachine2 = createControlComponent(createLayer);

    return <RoutingMachine2 />
};