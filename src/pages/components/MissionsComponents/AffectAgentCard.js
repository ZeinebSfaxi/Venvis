import React, {useEffect, useState} from 'react';
import {Button, Card} from "@themesberg/react-bootstrap";
import {Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck, faUserSlash} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {GetMissionDetails} from "../../../actions/missionAction";
import { GetManagerByShop, listManagers} from "../../../actions/shopManagerAction";
import {listAgents} from "../../../actions/agentAction";
import {affectAgentToMission} from "../../../actions/missionAction";


const AffectAgentCard = ({row, setDialogueForm}) => {

    const missionList = useSelector (state => state.missionList);
    const missions = missionList.missions

    const routeParams = useParams();
    // const idAgent = routeParams.agentId;
    const idMission = routeParams.missionId;

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(GetMissionDetails(idMission))
    }, [dispatch, idMission])

    const singleMissionDetails = useSelector(state => state.missionDetails)
    const loading = singleMissionDetails.loading
    const mission = singleMissionDetails.mission
    const error = singleMissionDetails.error

    const [assigned, setAssigned] = useState(false)

    useEffect(() => {
        missions.map((m) => {
            if (m.deliveryDate === mission.deliveryDate && row.id === m.agent_id)
            {
                setAssigned(true)
            }
        })
    }, [row])

    // console.log("hedhi mission1", mission)
    // console.log("hedhi list mission", missions)
    const history = useHistory();


    const affect = async () => {
        if (row.id ) {
            await dispatch (affectAgentToMission (idMission, {agent_id: row.id}))
            await dispatch(GetMissionDetails(idMission))
            await dispatch(listAgents())
            await history.push(`/missions/missionDetails/${idMission}/${row.id}`);
        }
        //window.location.reload();
    };

    console.log("AAA HEDHI ASSIGNED", assigned)

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <div className="d-xl-flex align-items-center">
                    <div className="user-avatar xl-avatar">
                        {/*<Image fluid rounded src={} />*/}
                    </div>
                    <div className="file-field">
                        <div className="d-flex justify-content-xl-center ms-xl-3">
                            <div className="d-flex">
                                <div className="d-md-block text-start">
                                    <div className="fw-normal text-dark mb-1">{row.firstName} {row.lastName}</div>
                                    <div className="text-gray small">{row.email}</div>
                                    <div className="text-gray small">{row.attributes?.phone}</div>
                                    { assigned ?
                                        <>
                                            <Typography style={{color: "#D64541"}} className="mt-2"> Unavailable </Typography>

                                        </>:
                                        <div className="mt-3">
                                            <Button variant="primary"  size="sm" onClick={(e) => {
                                                e.preventDefault();
                                                affect();
                                                setDialogueForm(false);


                                            }}>
                                                <FontAwesomeIcon icon={faUserCheck} className="me-1" />
                                                Assign</Button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AffectAgentCard;