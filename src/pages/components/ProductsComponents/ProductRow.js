import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import moment from "moment";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Popover} from "@mui/material";
import {deleteShop, listShops} from "../../../actions/shopAction";
import {faBan, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {listSavs, updateSAV} from "../../../actions/savAction";
import {ShopDetailsCard} from "../OrderComponents/ShopDetailsCard";

const SavRow = ({product}) => {

    const dispatch = useDispatch();

    //goToDetails
    // const goToSingleShop = () => {
    //
    //     history.push(`/shops/shopDetails/${shopId}/${productId}`);
    // };

    //validate


// // today

    return (
        <>

            <tr>
                <td>
          <span className="fw-normal">
          {product.item_code?.slice(product.item_code.length -5, product.item_code.length).toUpperCase()}

          </span>
                </td>
                <td>
         <span className="fw-normal">
           {product.description}
          </span>

                </td>
                <td>

          <span className="fw-normal">
          {product.sales_price} TND
          </span>
                </td>
                <td>

          <span className="fw-normal">
          {product.unit}
          </span>
                </td>

                <td>

          <span className="fw-normal">
          {product.qty_in_stock}
          </span>
                </td>


            </tr>



        </>


    );
};

export default SavRow;