import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {faCheckCircle, faEdit, faEye, faStore} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router";

import {
    Button,
    TextField,
    Alert,
    AlertTitle, DialogActions, DialogContentText, DialogTitle, Dialog, DialogContent
} from "@mui/material";

import {getToken, listAgents, updateAgent} from "../../../actions/agentAction";

export default ({agent}) => {


    const history = useHistory ();
    const [agentId, setAgentId] = useState(agent._id);

    //delete manager
    const dispatch = useDispatch();
    const [dialogue, setDialogue]= useState(false)
    const managerDelete = useSelector (state => state.agentDelete);
    const loading = managerDelete.loading
    const handleCloseDialogue = value => {
        setDialogue(false);
    };

    //edit
    const [editable, setEditable] = useState(false);
    const [data, setData] = useState({
        id: agent.id,
        attributes: {phone: agent.attributes?.phone},
        firstName: agent.firstName,
        lastName: agent.lastName,
        username: agent.username,
        email: agent.email,
        enabled: agent.enabled,
        groups: ["agents"],
    })



    const handleEdit = async (e) => {
        if (!errorFirstName || !errorLastName  || !errorEmail  || !errorPhoneNumber ) {
            e.preventDefault();
            e.stopPropagation();
            setEditable(!editable);
            if (agent.id) {

                await dispatch(updateAgent(agent.id, data));
                await  dispatch(listAgents());
            }}
        };

    //alert
    // const [open, setOpen] = React.useState(false);
    // const [open2, setOpen2] = React.useState(false);
    // const handleClick = () => {
    //     setOpen(true);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //
    //     setOpen(false);
    //
    // };
    //
    //Form validation

    const [errorFirstName, setErrorFirstName] = useState(false)
    const [errorLastName, setErrorLastName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false)
    const [disab, setDisab] = useState(true)

    useEffect(() => {
        if (errorFirstName || errorLastName  || errorEmail  || errorPhoneNumber ) {
            setDisab(true);


        } else setDisab(false)


    }, [errorFirstName, errorLastName, errorEmail, errorPhoneNumber]);

    return (
        <>
            <tr>
                <td>
          <span className="fw-normal">
          AGT-{agent.id?.slice(agent.id.length -5, agent.id.length).toUpperCase()}

          </span>
                </td>
                <td>
                    {editable ? (
                        <>
                            { errorFirstName ?
                                <TextField
                                    error
                                    helperText="First name is invalid."
                                    inputProps={{style: {fontSize: 14}}}
                                    variant="standard"
                                    id="standard-size-small"
                                    size="small"

                                    value={data.firstName}
                                    onChange={e =>
                                    {setData({
                                        // object that we want to update
                                        ...data, // keep all other key-value pairs
                                        firstName: e.target.value // update the value of specific key
                                    })
                                        if (e.target.value.length === 0 ||/^\d+$/.test(e.target.value)) {
                                            setErrorFirstName(true);
                                        } else setErrorFirstName(false);
                                    }}
                                /> :
                                <TextField
                                    inputProps={{style: {fontSize: 14}}}
                                    variant="standard"
                                    id="standard-size-small"
                                    size="small"

                                    value={data.firstName}
                                    onChange={e =>
                                    { setData({
                                        // object that we want to update
                                        ...data, // keep all other key-value pairs
                                        firstName: e.target.value // update the value of specific key
                                    })
                                        if (e.target.value.length === 0 ||/^\d+$/.test(e.target.value)) {
                                            setErrorFirstName(true);
                                        } else setErrorFirstName(false);
                                    }}
                                />
                            }
                        </>

                    ) :
                     (<span className="fw-normal">
           {agent.firstName}
          </span>
                ) }
                </td>
                <td>

                    {editable ? (
                        <>
                            {errorLastName?
                                <TextField
                                    error
                                    helperText="Last name is invalid."
                                    inputProps={{style: {fontSize: 14}}}
                                    variant="standard"
                                    id="standard-size-small"
                                    size="small"

                                    value={data.lastName}
                                    onChange={e =>
                                    {setData({
                                        // object that we want to update
                                        ...data, // keep all other key-value pairs
                                        lastName: e.target.value // update the value of specific key
                                    })
                                        if (e.target.value.length === 0 ||/^\d+$/.test(e.target.value)) {
                                            setErrorLastName(true);
                                        } else setErrorLastName(false);
                                    }}
                                /> :
                                <TextField
                                    inputProps={{style: {fontSize: 14}}}
                                    variant="standard"
                                    id="standard-size-small"
                                    size="small"

                                    value={data.lastName}
                                    onChange={e =>
                                    {     setData({
                                        // object that we want to update
                                        ...data, // keep all other key-value pairs
                                        lastName: e.target.value // update the value of specific key
                                    })
                                        if (e.target.value.length === 0 ||/^\d+$/.test(e.target.value)) {
                                            setErrorLastName(true);
                                        } else setErrorLastName(false);
                                    }}
                                />}

                        </>
                    ) :
                       ( <span className="fw-normal">
           {agent.lastName}
          </span>) }

                </td>
                <td>
                    {editable ? (
                        <>
                            {errorEmail?
                                <TextField
                                    error
                                    helperText="E-mail is invalid."
                                    inputProps={{style: {fontSize: 14}}}
                                    variant="standard"
                                    id="standard-size-small"
                                    size="small"

                                    value={data.email}
                                    onChange={e =>
                                    {setData({
                                        // object that we want to update
                                        ...data, // keep all other key-value pairs
                                        email: e.target.value // update the value of specific key
                                    })
                                        if (e.target.value.length === 0 || !e.target.value.includes("@")) {
                                            setErrorEmail(true);
                                        } else setErrorEmail(false);
                                    }}
                                /> :
                                <TextField
                                    inputProps={{style: {fontSize: 14}}}
                                    variant="standard"
                                    id="standard-size-small"
                                    size="small"

                                    value={data.email}
                                    onChange={e =>
                                    {   setData({
                                        // object that we want to update
                                        ...data, // keep all other key-value pairs
                                        email: e.target.value // update the value of specific key
                                    })
                                        if (e.target.value.length === 0 || !e.target.value.includes("@")) {
                                            setErrorEmail(true);
                                        } else setErrorEmail(false);
                                    }}
                                />
                            }

                        </>
                    ) :
                     (   <span className="fw-normal">
           {agent.email}
          </span>)
                    }

                </td>

                <td>
                    {editable ? (
                        <>
                            {errorPhoneNumber?
                                <TextField
                                    error
                                    type="number"
                                    helperText="Phone number is invalid."
                                    inputProps={{style: {fontSize: 14}}}
                                    variant="standard"
                                    id="standard-size-small"
                                    size="small"
                                    value={data.attributes.phone}
                                    onChange={e =>
                                    { setData({
                                        // object that we want to update
                                        ...data, // keep all other key-value pairs
                                        attributes: {...data.attributes, phone: e.target.value} // update the value of specific key
                                    })
                                        if (e.target.value.length !== 8 ) {
                                            setErrorPhoneNumber(true);
                                        } else setErrorPhoneNumber(false);
                                    }}
                                /> :
                                <TextField
                                    inputProps={{style: {fontSize: 14}}}
                                    variant="standard"
                                    id="standard-size-small"
                                    size="small"
                                    type="number"
                                    value={data.attributes.phone}
                                    onChange={e =>
                                    { setData({
                                        // object that we want to update
                                        ...data, // keep all other key-value pairs
                                        attributes: {...data.attributes, phone: e.target.value} // update the value of specific key
                                    })
                                        if (e.target.value.length !==8 ) {
                                            setErrorPhoneNumber(true);
                                        } else setErrorPhoneNumber(false);
                                    }}
                                />
                            }

                        </>
                    ) : (
                        <span className="fw-normal">
           {agent.attributes?.phone}
          </span> ) }
                </td>

                <td>

                    {agent.enabled ? (

                        <Button variant="success"  style={{backgroundColor:"#00aa9b", color:"white"}} size="sm" onClick={() => {
                            getToken();

                            dispatch(updateAgent(agent.id, {enabled:false}));
                            dispatch(listAgents());

                        }
                        }>Active
                            </Button>
                    ) : (

                        <Button variant="danger" style={{backgroundColor:"#ef4641" , color:"white"}} size="sm" onClick={() => {
                            getToken();

                            dispatch(updateAgent(agent.id, {enabled:true}));
                            dispatch(listAgents());
                        }}>Disabled</Button>
                    )}
                </td>


                <td>
                   <FontAwesomeIcon icon={faEye}
                                                       style={{color: "#00aa9b"}}
                                                       // onClick={() => history.push(`/shops/shopDetails/${manager.shop_id}`)}
                                                       className="me-2"/>

                    {editable?
                        <>
                            {disab ?   ( <FontAwesomeIcon  icon={faCheckCircle}
                                                           style={{color: "#55615c"}}
                                                           className="me-2"/>
                                ) :
                                <FontAwesomeIcon  icon={faCheckCircle}
                                                  style={{color: "#2ecc87"}}
                                                  onClick={ handleEdit}
                                                  className="me-2"/>

                            }
                        </>
                        :
                        <FontAwesomeIcon  icon={faEdit}
                                          style={{color: "#434b70"}}
                                          onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              setEditable(!editable);

                                          }}
                                          className="me-2"/>
                    }


                    <FontAwesomeIcon icon={faTrashAlt}
                                     style={{color: "#ef4641"}}
                                     onClick={()=> setDialogue(true)}
                                     className="me-2"/>

                </td>
            </tr>

            {/*Delete Dialogue*/}
            <Dialog open={dialogue} onClose={handleCloseDialogue} style={{width: '100%'}}>
                <DialogTitle>
                    Are You Sure You Want To Remove This Agent ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to definitely delete
                        :<strong> {agent.firstName} {agent.lastName} </strong> ?
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
                            // onClick={(e) => {
                            //     e.preventDefault();
                            //
                            //     dispatch(deleteManager(agent.id))
                            //     if (loading === false) {
                            //         dispatch(listManagers())
                            //     }
                            //     handleCloseDialogue()
                            //     window.location.reload();
                            // }}
                    >Delete</Button>

                </DialogActions>

            </Dialog>

            {/*/!*alert ASSINGMENT component*!/*/}
            {/*<Snackbar open={open}  autoHideDuration={6000} sx={{ backgroundColor: "#F57C00", color:"#F57C00" }} onClose={handleClose}>*/}
            {/*    <Alert variant="filled" severity="warning" sx={{ width: '100%' }} onClose={handleClose}>*/}
            {/*        <AlertTitle>Warning!</AlertTitle>*/}
            {/*        Manager <strong> {manager.name} {manager.lastName} </strong>  is not assigned to a shop yet!*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}

            {/*/!*alert EDIT SUCCESS component*!/*/}
            {/*<Snackbar open={open2}  autoHideDuration={6000} sx={{ backgroundColor: "#00aa9b", color:"#00aa9b" }} onClose={handleClose}>*/}
            {/*    <Alert variant="filled" severity="error" sx={{ width: '100%' }} onClose={handleClose}>*/}
            {/*        <AlertTitle>Success!</AlertTitle>*/}
            {/*        Your manager <strong> {manager.name} {manager.lastName} </strong> has been updated!*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}

        </>
    );
};