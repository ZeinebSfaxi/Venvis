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
import {useDispatch} from "react-redux";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {ListOrder, stateOrder, validateOrder} from "../../../actions/orderAction";
import {ShopDetailsCard} from "../OrderComponents/ShopDetailsCard";



export default ({order, AA, setAA}) => {

    const dispatch = useDispatch();

    //goToDetails
    let shopId = order.shop_id;
    let orderId = order._id;

    // see a shop name
    const [showDetails, setShowDetails] = useState(false)


    const [selected, setSelected] = useState(false)


    // useEffect(()=> {
    //     // setAA([])
    //     setSelected(false)
    // },[])


    useEffect(()=> {
        if (selected === true) {
            // setAA([...AA, orderId])
            console.log("hedhi el selected", selected)
            console.log("hedhi el AA", AA)
        } else if (selected === false) {
            console.log("rahi false", AA)
        }

    },[selected])



    return (
        <>
            { selected ?

                (
                    <tr onClick={() => {setSelected(false);
                        if (AA.includes(orderId)) {
                           setAA(AA.filter( item => item !== orderId))
                        }
                    }}
                        style={{backgroundColor: "#72ddd8"}}
                >

                    <td >
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






                </tr>) : (

                    <tr onClick={() => {
                        setSelected(true);
                         setAA([...AA, orderId]);
                    }}
                    >
                        <td >
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






                    </tr>
                )

            }







        </>


    );
};