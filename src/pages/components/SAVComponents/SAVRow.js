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

const SavRow = ({rec}) => {

    const dispatch = useDispatch();

    //goToDetails
    let shopId = rec.shop_id;
    let recId = rec._id;
    const history = useHistory ();

    // const goToSingleShop = () => {
    //
    //     history.push(`/shops/shopDetails/${shopId}/${recId}`);
    // };

    //validate
    const [accept, setAccept] =useState({validated: "accepted"});
    const [refuse, setRefuse] =useState({validated: "rejected"});
    const [rejectedState, setRejectedState] =useState({state: "rejected"});
    const [reviewState, setReviewState] =useState({state: "to review"});

    const [dialogue, setDialogue] =useState(false);

    const handleCloseDialogue = value => {
        setDialogue(false);
    };


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

    return (
        <>

            <tr>
                <td>
          <span className="fw-normal">
          PVC-{rec._id?.slice(rec._id.length -5, rec._id.length).toUpperCase()}

          </span>
                </td>

                <td>
         <span className="fw-normal">
            {moment(rec.sendingDate).format('DD-MM-YYYY')}
          </span>

                </td>

                <td>
         <span className="fw-normal">
           {rec.title}
          </span>

                </td>
                <td>

          <span className="fw-normal">
          {rec.desc}
          </span>
                </td>

                <td onMouseEnter={() => setShowDetails(true)} onMouseLeave={() => setShowDetails(false)}>
          <span className="fw-normal">
                 PVC-{rec.shop_id?.slice(rec.shop_id.length - 5, rec.shop_id.length).toUpperCase()}
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
                        <ShopDetailsCard key={rec._id} order={rec}/>
                    </Popover>
                </td>

                <td>
                    { rec.state === 'to review' ?
                        <span className="fw-bolder" style={{color: "#f6a01e"}}>
                        To Review
                        </span> : rec.state=== 'treated' ?
                            <span className="fw-bolder" style={{color: "#00aa9b"}}>
                        Treated
                        </span> : rec.state ==='rejected' &&
                            <span className="fw-bolder" style={{color: "#ef4641"}}>
                        Rejected
                        </span> }
                </td>

                <td>
                    {/*<FontAwesomeIcon  icon={faEye}*/}
                    {/*                  style={{color: "#00aa9b"}}*/}
                    {/*                  onClick={() => goToSingleShop()}*/}
                    {/*                  className="me-2"/>*/}

                    <FontAwesomeIcon icon={faCheckCircle}
                                     style={{color: "#00aa9b"}}
                                     onClick={()=> {
                                         dispatch(updateSAV(rec._id, {state: "treated"}))
                                         dispatch(listSavs())
                                     }}
                                     className="me-2"/>

                    <FontAwesomeIcon icon={faBan}
                                     style={{color: "#ef4641"}}
                                     onClick={()=> setDialogue(true)}
                                     className="me-2"/>

                </td>
            </tr>

            {/*Delete Dialogue*/}
            <Dialog open={dialogue} onClose={handleCloseDialogue} style={{width: '100%'}}>
                <DialogTitle>
                    Are You Sure You Want To Reject This complaint ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to reject this complaint ?
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
                                dispatch(updateSAV(rec._id, {state: "rejected"}))
                                dispatch(listSavs())
                                handleCloseDialogue()
                                // window.location.reload();
                            }}>Reject</Button>

                </DialogActions>

            </Dialog>


        </>


    );
};

export default SavRow;