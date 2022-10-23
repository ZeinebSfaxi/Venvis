import {Button, Card, Col, Nav, Row} from "@themesberg/react-bootstrap";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import Profile1 from "../../../assets/img/team/profile-picture-1.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect ,useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {affectManagerToShop, GetManagerByShop, listManagers} from "../../../actions/shopManagerAction";
import {
    Avatar,
    Box,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import {Alert} from "@mui/lab";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import moment from "moment-timezone";
import {ListMissions} from "../../../actions/missionAction";
import MissionRow from "./MissionRow";
import {useKeycloak} from "@react-keycloak/web";


export const MissionCalendar = ({setDialogueForm}) => {


    //display managers
    const dispatch = useDispatch();

    const missionList = useSelector (state => state.missionList);
    const missions = missionList.missions
    const loading = missionList.loading
    const error = missionList.error


    // const missionId =  mission._id?.slice(mission._id.length -5, mission._id.length).toUpperCase()


    useEffect(() => {
        dispatch(ListMissions())

    }, [dispatch])

    const [events, setEvents] = useState([])

    const keycloak = useKeycloak();
    const userId = keycloak.keycloak.subject;

    useEffect(() => {
        if (  userId === "032f27f2-22f4-436a-b697-b02c710ec22e" ) {
            missions.map((mission) => (
                events.push(
                    {
                        title: "MIS-" + mission._id?.slice(mission._id.length - 5, mission._id.length).toUpperCase(),
                        start: moment(mission.deliveryDate).format("YYYY-MM-DD"),
                    }
                )

            ))
         } else {
            missions.filter((row) => {
               if (row.agent_id === userId) {
                    return row;
                }
            }).map((mission) => (
                events.push(
                    {
                        title: "MIS-" + mission._id?.slice(mission._id.length - 5, mission._id.length).toUpperCase(),
                        start: moment(mission.deliveryDate).format("YYYY-MM-DD"),
                    }
                )

            ))
        }

    }, [missions])


    console.log("hedhom events",events)

    // const [events, setEvents] = useState()




    return (
        <>
            <Card border="light" className=" p-5 mt-4 mb-4" >
                {events.length !== 0 &&
                    <FullCalendar
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay"
                        }}
                        dateClick={() => {
                            setDialogueForm(true)
                        }}
                        eventClick={() => {
                            console.log("ya3")
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        events={events}
                        eventBackgroundColor="#00aa9b"

                    />
                }

            </Card>


        </>

    );
};