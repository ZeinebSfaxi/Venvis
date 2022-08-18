import React, {useEffect, useState} from "react";
import moment from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useHistory} from "react-router";
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Popover
} from "@mui/material";
import {deleteShop, GetshopDetails, listShops} from "../../../actions/shopAction";
import {useDispatch, useSelector} from "react-redux";
import {faBan, faCheck, faCheckCircle, faCircle, faCross, faStore} from "@fortawesome/free-solid-svg-icons";
import {ListOrder} from "../../../actions/orderAction";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import {Card} from "@themesberg/react-bootstrap";
import {ShopDetailsCard} from "./ShopDetailsCard";


export default ({order}) => {

    const dispatch = useDispatch();

    //goToDetails
    let shopId = order.shop_id;
    const history = useHistory ();
    const goToSingleShop = () => {

        history.push(`/shops/shopDetails/${shopId}`);
    };

    // //validation color
    // const [validation, setValidation] = useState("")

    //get shop name

    // const [shopName , setShopName] = useState("")
    //
    // useEffect(() => {
    //         dispatch(GetshopDetails(shopId))
    //
    //     }, [dispatch, shopId])
    //
    // const singleShopDetails = useSelector(state => state.shopDetails)

    // see a shop name
    const [showDetails, setShowDetails] = useState(false)


// today
    const today = new Date ()
    let  tomorrow = new Date (today)
    tomorrow.setDate(tomorrow.getDate()+1)


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

                <td  onMouseEnter={() => setShowDetails(true) }   onMouseLeave={() => setShowDetails(false)}>
          <span className="fw-normal"  >
                 PVC-{order.shop_id?.slice(order.shop_id.length -5, order.shop_id.length).toUpperCase()}
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
                        <ShopDetailsCard key= {order._id} order={order} />
                    </Popover>
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
                    <FontAwesomeIcon  icon={faEye}
                                      style={{color: "#00aa9b"}}
                                       onClick={() => goToSingleShop()}
                                      className="me-2"/>
                    {order.validated === 'to review'    ?
                        (<> <FontAwesomeIcon  icon={faCheck}
                                          style={{color: "#0aae0d"}}
                            // onClick={() => goToSingleShop()}
                                          className="me-2"/>
                        <FontAwesomeIcon  icon={faBan}
                                          style={{color: "#ef4641"}}
                            // onClick={() => goToSingleShop()}
                                          className="me-2"/>
                                          </>) : (

                        <> <FontAwesomeIcon  icon={faCheck}
                        style={{color: "#a2a1a1"}}
                        className="me-2"/>
                        <FontAwesomeIcon  icon={faBan}
                        style={{color: "#a2a1a1"}}
                        className="me-2"/>

                     </>
                        )
                    }

                </td>
            </tr>





        </>


    );
};