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



export default ({order, ArrayToremove, setArrayToremove, ArrayOrders ,setArrayOrders}) => {

    const dispatch = useDispatch();

    //goToDetails
    let orderId = order._id;
    const history = useHistory ();
    // const goToSingleShop = () => {
    //
    //     history.push(`/shops/shopDetails/${shopId}/${orderId}`);
    // };

    //alert
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
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

    useEffect(() => {
        if (order.mission_id) {
            setSelected(true)
        }
        else {
            setSelected(false)
        }


    },[])

    useEffect(() => {
        if (order.mission_id) {
            setSelected(true)
        }
        else {
            setSelected(false)
        }

    },[])



    // see a shop name
    const [showDetails, setShowDetails] = useState(false)


// // today
    const today = new Date()

    console.log("hedhi array orders", ArrayOrders)
    console.log("hedhi array to remove", ArrayToremove)
    console.log("hedhi id", orderId)


    return (
        <>
            {selected? (
                <>
                    <tr onClick={()=> {setSelected(false)
                            if (ArrayOrders.includes(orderId)) {
                            setArrayOrders(ArrayOrders.filter( item => item !== orderId))
                        }
                        setArrayToremove([...ArrayToremove,orderId])

                    }}
                        style={{backgroundColor: "#72ddd8"}}>
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
                            { order.state === 'to review' ?

                                <Chip label="Stand by" className="fw-bolder" style={{backgroundColor: "#CCCCCC"}} />
                                : order.state=== 'delivered' ?
                                    <Chip label="Delivered" className="fw-bolder" style={{backgroundColor: "#0aae0d"}} />
                                    : order.state=== 'on going' ?
                                        <Chip label="On going" className="fw-bolder" style={{backgroundColor: "#adfcad"}} />
                                        : order.state=== 'rejected' ?
                                            <Chip label="Rejected"  className="fw-bolder" style={{backgroundColor: "#d61d1d"}} />
                                            : order.state ==='late' &&
                                            <Chip label="Late"  className="fw-bolder" style={{backgroundColor: "#f6a01e"}} />
                            }
                        </td>


                        <td>

                            <FontAwesomeIcon  icon={faEye}
                                              style={{color: "#00aa9b"}}
                                // onClick={() => goToSingleShop()}
                                              className="me-2"/>



                        </td>
                    </tr>


                </>
            ) : (
                <>
                    <tr style={{
                        backgroundColor: order.mission_id ? "#d6e2e1" : 'white'
                    }} onClick={()=> {setSelected(true)
                        setArrayOrders([...ArrayOrders, orderId])
                        if (ArrayToremove.includes(orderId)) {
                            setArrayToremove(ArrayToremove.filter( item => item !== orderId))
                        }

                    }}>
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
                            { order.state === 'to review' ?

                                <Chip label="Stand by" className="fw-bolder" style={{backgroundColor: "#CCCCCC"}} />
                                : order.state=== 'delivered' ?
                                    <Chip label="Delivered" className="fw-bolder" style={{backgroundColor: "#0aae0d"}} />
                                    : order.state=== 'on going' ?
                                        <Chip label="On going" className="fw-bolder" style={{backgroundColor: "#adfcad"}} />
                                        : order.state=== 'rejected' ?
                                            <Chip label="Rejected"  className="fw-bolder" style={{backgroundColor: "#d61d1d"}} />
                                            : order.state ==='late' &&
                                            <Chip label="Late"  className="fw-bolder" style={{backgroundColor: "#f6a01e"}} />
                            }
                        </td>


                        <td>

                            <FontAwesomeIcon  icon={faEye}
                                              style={{color: "#00aa9b"}}
                                // onClick={() => goToSingleShop()}
                                              className="me-2"/>



                        </td>
                    </tr>


                </>
            )}

        </>


    );
};