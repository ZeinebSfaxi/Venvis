import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {deleteShop, GetshopDetails, listShops} from "../../../actions/shopAction";
import {faShopify} from "@fortawesome/free-brands-svg-icons";
import {faEdit, faStore} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router";
import {Row} from "@themesberg/react-bootstrap";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {deleteManager, listManagers} from "../../../actions/shopManagerAction";

export default ({manager}) => {

    const history = useHistory ();
    const managerId = manager.id;

    //delete manager
    const dispatch = useDispatch();
    const [dialogue, setDialogue]= useState(false)
    const managerDelete = useSelector (state => state.managerDelete);
    const loading = managerDelete.loading
    const handleCloseDialogue = value => {
        setDialogue(false);
    };

    //edit
    const [editable, setEditable] = useState(false)


    return (
        <>
            <tr>
                <td>
          <span className="fw-normal">
          MAN-{manager._id?.slice(0, 10).toUpperCase()}

          </span>
                </td>
                <td>
                    {editable ? (
                        <TextField
                            inputProps={{style: {fontSize: 14}}}
                            variant="standard"
                            id="standard-size-small"
                            size="small"
                            // onKeyDown={editWhenClick}
                            // value={agentData.firstName}
                            // onChange={e =>
                            //     setAgentData({
                            //         // object that we want to update
                            //         ...agentData, // keep all other key-value pairs
                            //         firstName: e.target.value // update the value of specific key
                            //     })
                            // }
                        />
                    ) : (<span className="fw-normal">
           {manager.name}
          </span>)}

                </td>
                <td>

          <span className="fw-normal">
          {manager.lastName}
          </span>
                </td>
                <td>
          <span className="fw-normal">
          {manager.email}
          </span>

                </td>

                <td>
        <span className="fw-normal">
          {manager.phoneNumber}
          </span>
                </td>

                <td>
                        <FontAwesomeIcon  icon={faStore}
                                          style={{color: "#00aa9b"}}
                                          onClick={() => history.push(`/shops/shopDetails/${manager.shop_id}`)}
                                          className="me-2"/>


                    <FontAwesomeIcon  icon={faEdit}
                                      style={{color: "#434b70"}}
                                      onClick={(e) => {
                                          e.preventDefault();
                                          setEditable(true);
                                      }}
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
                    Are You Sure You Want To Remove This Manager ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to definitely delete
                        :<strong> {manager.name} {manager.lastName} </strong> ?
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
                                dispatch(deleteManager(managerId))
                                if (loading === false) {
                                    dispatch(listManagers())
                                }
                                handleCloseDialogue()
                                window.location.reload();
                            }}>Delete</Button>

                </DialogActions>

            </Dialog>
        </>
    );
};