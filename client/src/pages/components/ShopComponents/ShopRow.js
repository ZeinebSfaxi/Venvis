import React, {useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useHistory} from "react-router";

export default ({shop}) => {

    //goToDetails
    const shopId = shop._id;
    const history = useHistory ();
    const goToSingleShop = () => {

        history.push(`/shops/shopDetails/${shopId}`);
    };



  return (
    <>
        <tr>
            <td>
          <span className="fw-normal">
          PVC-{shop._id?.slice(0, 10).toUpperCase()}

          </span>
            </td>
            <td>
         <span className="fw-normal">
           {shop.name}
          </span>

            </td>
            <td>

          <span className="fw-normal">
          {shop.streetNumber}, {shop.streetName}
          </span>
            </td>
            <td>
          <span className="fw-normal">
          {shop.country}
          </span>

            </td>

            <td>
        <span className="fw-normal">
          {shop.phoneNumber}
          </span>

            </td>

            <td>
                <FontAwesomeIcon  icon={faEye}
                                  style={{color: "#00aa9b"}}
                                  onClick={() => goToSingleShop()}
                                 className="me-2"/>
                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ef4641"}} className="me-2"/>
            </td>
        </tr>
    </>


  );
};