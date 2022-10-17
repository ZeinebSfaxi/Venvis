import React, {useEffect, useState} from "react";
import moment from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useHistory} from "react-router";
import { Form} from "@themesberg/react-bootstrap";
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
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {GetOrderDetails, ListOrder, stateOrder, validateOrder} from "../../../actions/orderAction";
import {ShopDetailsCard} from "../OrderComponents/ShopDetailsCard";
import OrderOfMissionEdit from "./OrderOfMissionEdit";



export default ({order, mission, setChanged, changed}) => {

    const dispatch = useDispatch();

    //goToDetails
    let orderId = order._id;
    const history = useHistory ();


    //alert
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
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
    const [missionData, setMissionData] = useState("")


// // today
    const today = new Date()

    useEffect(() => {

        setMissionData("")
    }, [mission])

    useEffect(() => {

        setMissionData("")
    }, [changed])


    // useEffect(() => {
    // setMissionData(mission.state)
    // }, [])


    useEffect(() => {
       if(missionData ==="") {
        setMissionData(mission.state)
       }
        else {
           if (missionData === "on going") {
               dispatch(stateOrder(order._id, {state: "on going"}))
           } else if (missionData === "delivered") {
               dispatch(stateOrder(order._id, {state: "delivered"}))
           } else if (missionData === "confirmed" || missionData === "standby") {
               dispatch(stateOrder(order._id, {state: "to review"}))
           }
       }
    }, [missionData])





    return (
        <>
            <tr>
                <td>
          <span className="fw-normal">
          CMD-{order._id?.slice(order._id.length -5, order._id.length).toUpperCase()}

          </span>
                </td>
                <td>
         <span className="fw-normal">
            {moment(order.sendingDate).format('DD-MM-YYYY')}
          </span>
                </td>
                <td>

          <span className="fw-normal">
           {moment(order.deliveryDate).format('DD-MM-YYYY')}
          </span>
                </td>




                <td onMouseEnter={() => setShowDetails(true)} onMouseLeave={() => setShowDetails(false)}>
          <span className="fw-normal">
                 PVC-{order.shop_id?.slice(order.shop_id.length - 5, order.shop_id.length).toUpperCase()}
          </span>
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={showDetails}
                        anchorEl={null}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        onClose={() => setShowDetails(false)}
                        disableRestoreFocus
                    >
                        <ShopDetailsCard key={order._id} order={order}/>
                    </Popover>
                </td>




                <td>
                    { order.validated === 'to review' ?
                        <span className="fw-bolder" style={{color: "#f6a01e"}}>
                        To Review
                        </span> : order.validated=== 'accepted' ?
                            <span className="fw-bolder" style={{color: "#00aa9b"}}>
                        Accepted
                        </span> : order.validated ==='rejected' &&
                            <span className="fw-bolder" style={{color: "#ef4641"}}>
                        Rejected
                        </span> }
                </td>

                <td>
                {mission.state === "confirmed" || mission.state === "standby" ?
                        <Chip label="Stand by" className="fw-bolder" style={{backgroundColor: "#CCCCCC"}}/>
                : mission.state === "on going" ?   <Chip label="On going" className="fw-bolder" style={{backgroundColor: "#adfcad"}}/> :
                        mission.state === "delivered" ?   <Chip label="Delivered" className="fw-bolder" style={{backgroundColor: "#0aae0d"}}/> :
                            mission.state === "late" &&  <Chip label="Late" className="fw-bolder" style={{backgroundColor: "#f6a01e"}}/>
                }
                </td>

                {/*<td>*/}

                {/*    <FontAwesomeIcon  icon={faEye}*/}
                {/*                      style={{color: "#00aa9b"}}*/}
                {/*                      // onClick={() => goToSingleShop()}*/}
                {/*                      className="me-2"/>*/}


                {/*</td>*/}
            </tr>






        </>


    );
};