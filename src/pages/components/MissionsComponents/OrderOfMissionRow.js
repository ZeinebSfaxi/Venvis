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



export default ({order}) => {

    const dispatch = useDispatch();

    //goToDetails
    let orderId = order._id;
    const history = useHistory ();
    // const goToSingleShop = () => {
    //
    //     history.push(`/shops/shopDetails/${shopId}/${orderId}`);
    // };

    // const [data , setData] = useState({
    //     _id: '',
    //     deliverDate: '',
    //     sendingDate: '',
    //     state: '',
    //     validated:'',
    //     shop_id: '',
    //     affectedToMission: ''
    // })
    //
    // useEffect(() => {
    //     if (data2) {
    //         setData({
    //             _id: data2._id,
    //             deliverDate: data2.deliverDate,
    //             sendingDate: data2.sendingDate,
    //             state: data2.state,
    //             validated: data2.validated,
    //             shop_id: data2.shop_id,
    //             affectedToMission: data2.affectedToMission
    //         })
    //     }
    //
    // }, [data2])


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


// // today
    const today = new Date()





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

            {/*Refuse Dialogue*/}
            {/*<Dialog open={dialogue} onClose={handleCloseDialogue} style={{width: '100%'}}>*/}
            {/*    <DialogTitle>*/}
            {/*        Are You Sure You Want To Reject This Order ?*/}
            {/*    </DialogTitle>*/}
            {/*    <DialogContent>*/}
            {/*        <DialogContentText id="alert-dialog-slide-description">*/}
            {/*            Please provide below a reason for the rejection. This will be sent to the shop's manager.*/}

            {/*            <Form.Group controlId="exampleForm.ControlTextarea1" required type="text" placeholder="Enter Your message here">*/}
            {/*                <Form.Label>Your Message </Form.Label>*/}
            {/*                <Form.Control as="textarea" rows="3" />*/}
            {/*            </Form.Group>*/}

            {/*        </DialogContentText>*/}
            {/*    </DialogContent>*/}
            {/*    <DialogActions>*/}
            {/*        <Button*/}
            {/*            size="sm"*/}
            {/*            variant="primary" type="submit"*/}
            {/*            onClick={handleCloseDialogue}*/}
            {/*        >*/}
            {/*            Cancel*/}
            {/*        </Button>*/}
            {/*        <Button size="sm" variant="contained" color="error" type="submit"*/}
            {/*                onClick={(e) => {*/}
            {/*                    e.preventDefault();*/}
            {/*                    refuseValidation();*/}
            {/*                    handleCloseDialogue();*/}
            {/*                }}>Reject</Button>*/}

            {/*    </DialogActions>*/}

            {/*</Dialog>*/}


            {/*<Snackbar open={open}  autoHideDuration={6000} sx={{ backgroundColor: "#0aae0d", color:"#0aae0d" }} onClose={handleClose}>*/}
            {/*    <Alert variant="filled" severity="success" sx={{ width: '100%' }} onClose={handleClose}>*/}
            {/*        <AlertTitle>Success!</AlertTitle>*/}
            {/*        You just accepted a new order!*/}
            {/*        <strong>   PVC-{order.shop_id?.slice(order.shop_id.length -5, order.shop_id.length).toUpperCase()}</strong>*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}




        </>


    );
};