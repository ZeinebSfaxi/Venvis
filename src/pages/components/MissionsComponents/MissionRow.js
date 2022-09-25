import React, {useEffect, useState} from "react";
import moment from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useHistory} from "react-router";
import {
    Alert, AlertTitle,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Popover, Snackbar
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {GetOrdesrByMission, unaffectOrderFromMission} from "../../../actions/orderAction";
import {deleteMission} from "../../../actions/missionAction";
import {ListMission} from "./ListMission";


export default ({mission}) => {

    const dispatch = useDispatch();

    //goToDetails
    let agentId = mission.agent_id;
    let missionId = mission._id;
    const history = useHistory ();
    // const goToSingleShop = () => {
    //
    //     history.push(`/shops/shopDetails/${shopId}/${orderId}`);
    // };


    //alert
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    };

    // see a shop name
    const [showDetails, setShowDetails] = useState(false)

    // Dialogue Stats
    const [dialogue, setDialogueForm] = useState(false);
    const handleCloseDialogue = value => {
        setDialogueForm(false);
    };


// // today
    const today = new Date()



    const orderList = useSelector (state => state.ordersByMission);
    const orders = orderList.ordersByMission
    const loading = orderList.loading
    const error = orderList.error

    useEffect(() => {
        orders.map((o) => console.log("orderssss",o._id))
    }, [orders])



    return (
        <>
            <tr>
                <td>
          <span className="fw-normal">
          MIS-{mission._id?.slice(mission._id.length -5, mission._id.length).toUpperCase()}

          </span>
                </td>
                <td>
         <span className="fw-normal">
            {moment(mission.sendingDate).format('DD-MM-YYYY')}
          </span>
                </td>
                <td>

          <span className="fw-normal">
           {moment(mission.deliveryDate).format('DD-MM-YYYY')}
          </span>
                </td>



                {mission.agent_id ?
             (    <td>      <span className="fw-bolder" style={{color: "#00aa9b"}}>
           Assigned
          </span>
                 </td>
             ) : (
                    <td>
                          <span className="fw-bolder"  style={{color: "#ef4641"}}>
           Not Assigned
          </span>
                    </td>
                    )
                }



                <td>
                    { mission.state === 'standby' ?

                        <Chip label="Stand by" className="fw-bolder" style={{backgroundColor: "#CCCCCC"}} />
                        : mission.state=== 'delivered' ?
                            <Chip label="Delivered" className="fw-bolder" style={{backgroundColor: "#0aae0d"}} />
                            : mission.state=== 'on going' ?
                                <Chip label="On going" className="fw-bolder" style={{backgroundColor: "#adfcad"}} />
                                    : mission.state ==='late' &&
                                    <Chip label="Late"  className="fw-bolder" style={{backgroundColor: "#f6a01e"}} />
                    }
                </td>



                <td>

                    <FontAwesomeIcon  icon={faEye}
                                      style={{color: "#00aa9b"}}
                                      onClick={() => history.push(`/missions/missionDetails/${missionId}/${agentId}`)}
                                      className="me-2"/>



                    {mission.state !== 'standby' || moment(today).format('DD-MM-YYYY') > moment(mission.sendingDate).add(2,'days').format('DD-MM-YYYY')  ?
                        (

                            <> <FontAwesomeIcon  icon={faTrashAlt}
                                                 style={{color: "#a2a1a1"}}
                                                 className="me-2"/>

                            </>
                        )  : (<>
                            <FontAwesomeIcon  icon={faTrashAlt}
                                              style={{color: "#ef4641"}}
                                              onClick={() => {
                                                  setDialogueForm(true)
                                              }}
                                              className="me-2"/>
                        </>)
                    }

                </td>
            </tr>

            {/*Refuse Dialogue*/}
            <Dialog open={dialogue} onClose={handleCloseDialogue} style={{width: '100%'}}>
                <DialogTitle>
                    Are You Sure You Want To Delete This Mission ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this mission? Note that all the assignments related will be erased.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        size="sm"
                        variant="primary" type="submit"
                        onClick={handleCloseDialogue}
                    >
                        Cancel
                    </Button>
                    <Button size="sm" variant="contained" color="error" type="submit"
                            onClick={(e) => {
                                dispatch(deleteMission(mission._id))
                                dispatch(GetOrdesrByMission(mission._id))
                                 console.log("aveee mariaa", mission._id)
                                orders.map((o) => dispatch(unaffectOrderFromMission(o._id)))
                                window.location.reload();
                            }}
                    >Delete</Button>

                </DialogActions>

            </Dialog>







        </>


    );
};