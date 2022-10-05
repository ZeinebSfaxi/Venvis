import React, {useEffect} from 'react';
import {Avatar} from "@mui/material";
import {GetAgentDetails} from "../../../actions/agentAction";
import {useDispatch, useSelector} from "react-redux";
import {GetshopManagerDetails} from "../../../actions/shopManagerAction";

const ConversationRow = ({convo, userId}) => {

    const dispatch = useDispatch();
    const friendId = convo.members.find((m) => m!== userId);


    console.log("FRIIIEND", friendId)
    console.log("ENAAA", userId)
    console.log("CONVOOO", convo)


    useEffect(() => {
        if (friendId.includes("-")) {
            dispatch(GetAgentDetails (friendId))
        }
        else {
             dispatch(GetshopManagerDetails(friendId))
        }

    }, [friendId])

    const singleAgentDetails = useSelector(state => state.agentDetails)
    const loading = singleAgentDetails.loading
    const agent = singleAgentDetails.agent
    const error = singleAgentDetails.error

    const singleManagerDetails = useSelector(state => state.shopManagerDetails)
    const loading2 = singleManagerDetails.loading
    const manager = singleManagerDetails.shopManager
    const error2 = singleManagerDetails.error

    const array = []

    useEffect(() =>{

    }, [agent, manager])

    return (
        <>
           {agent &&
            <tr>

                    <>
                    <td>
                        <Avatar sx={{ bgcolor: "#03807b" }}>{agent.firstName?.charAt(0).toUpperCase()}{agent.lastName?.charAt(0).toUpperCase()}</Avatar>

                    </td>
                    <td>
                        <span className="fw-normal">

                            {agent.firstName}
                    </span>
                        <span className="fw-normal">

                            {agent.lastName}
                        </span>
                    </td>
                    </>

            </tr>
            }
            {manager &&
            <tr>

                <>
                    <td>
                        <Avatar
                            sx={{bgcolor: "#03807b"}}>{manager.name?.charAt(0).toUpperCase()}{manager.lastName?.charAt(0).toUpperCase()}</Avatar>

                    </td>
                    <td>
                    <span className="fw-normal">

                {manager.name}
                    </span>
                        <span className="fw-normal">

                {manager.lastName}
                    </span>
                    </td>
                </>

            </tr>
            }

        </>
    );
};

export default ConversationRow;