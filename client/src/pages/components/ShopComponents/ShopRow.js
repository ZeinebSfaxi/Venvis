import React, {useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useHistory} from "react-router";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { deleteShop, listShops} from "../../../actions/shopAction";
import {useDispatch} from "react-redux";

export default ({shop}) => {

    //goToDetails
    const shopId = shop._id;
    const history = useHistory ();
    const goToSingleShop = () => {

        history.push(`/shops/shopDetails/${shopId}`);
    };

    //delete shop
    const dispatch = useDispatch();
    const [dialogue, setDialogue]= useState(false)
    const handleCloseDialogue = value => {
        setDialogue(false);
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
                <FontAwesomeIcon icon={faTrashAlt}
                                 style={{color: "#ef4641"}}
                                 onClick={()=> setDialogue(true)}
                                 className="me-2"/>
            </td>
        </tr>

        {/*Delete Dialogue*/}
        <Dialog open={dialogue} onClose={handleCloseDialogue} style={{width: '100%'}}>
            <DialogTitle>
                Are You Sure You Want To Remove This Shop ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to definitely delete this shop
                    :<strong> {shop.name} </strong> in <strong> {shop.streetNumber},{shop.streetName} </strong> ?
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
                            e.preventDefault();
                            dispatch(deleteShop(shopId))
                            dispatch(listShops())
                        }}>Delete</Button>

            </DialogActions>

        </Dialog>


    </>


  );
};