import React, {useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt} from "@fortawesome/free-regular-svg-icons";

export default ({shop}) => {

    //goToDetails



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
                <FontAwesomeIcon  icon={faEye} style={{color: "#00aa9b"}}
                                 className="me-2"/>
                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#ef4641"}} className="me-2"/>
            </td>
        </tr>
    </>


  );
};