import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {faCheckCircle, faEdit, faStore} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    TextField,
    Alert,
    AlertTitle
} from "@mui/material";
import {deleteManager, listManagers, updateManager} from "../../../actions/shopManagerAction";
import {yellow} from "@mui/material/colors";

export default ({manager}) => {


    const history = useHistory ();
    const [managerId, setManagerId] = useState(manager._id);

    //delete manager
    const dispatch = useDispatch();
    const [dialogue, setDialogue]= useState(false)
    const managerDelete = useSelector (state => state.managerDelete);
    const loading = managerDelete.loading
    const handleCloseDialogue = value => {
        setDialogue(false);
    };

    //edit
    const [editable, setEditable] = useState(false);
    const [data, setData] = useState({
        name:manager.name,
        lastName: manager.lastName,
        email: manager.email,
        phoneNumber: manager.phoneNumber,
        shop_id: manager.shop_id
    })
    // const editWhenClick =  (e) => {
    //     if (e.key === 'Enter') {
    //         if (!errorFirstName || !errorLastName  || !errorEmail  || !errorPhoneNumber ) {
    //
    //         setEditable(!editable)
    //
    //         if (managerId) {
    //            dispatch(updateManager(managerId, data));
    //              dispatch(listManagers());
    //         }
    //     }}
    // };

    const handleEdit = async (e) => {
        if (!errorFirstName || !errorLastName  || !errorEmail  || !errorPhoneNumber ) {
        e.preventDefault();
        e.stopPropagation();
        setEditable(!editable);
        if (managerId) {

          await dispatch(updateManager(managerId, data));
          await  dispatch(listManagers());
        }
    }};

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

    //Form validation
    const [errorAll, setErrorAll] = useState(false)
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
          MAN-{manager._id?.slice(manager._id.length -5, manager._id.length).toUpperCase()}

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

                                    value={data.name}
                                    onChange={e =>
                                    {setData({
                                            // object that we want to update
                                            ...data, // keep all other key-value pairs
                                            name: e.target.value // update the value of specific key
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

                                        value={data.name}
                                        onChange={e =>
                                        { setData({
                                                // object that we want to update
                                                ...data, // keep all other key-value pairs
                                                name: e.target.value // update the value of specific key
                                            })
                                            if (e.target.value.length === 0 ||/^\d+$/.test(e.target.value)) {
                                            setErrorFirstName(true);
                                        } else setErrorFirstName(false);
                                        }}
                                    />
                            }
                        </>

                    ) : (<span className="fw-normal">
           {data.name}
          </span>)}

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
                    ) : (<span className="fw-normal">
           {data.lastName}
          </span>)}

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
                    ) : (<span className="fw-normal">
           {data.email}
          </span>)}

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

                                value={data.phoneNumber}
                                onChange={e =>
                                { setData({
                                        // object that we want to update
                                        ...data, // keep all other key-value pairs
                                        phoneNumber: e.target.value // update the value of specific key
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
                                    value={data.phoneNumber}
                                    onChange={e =>
                                    { setData({
                                            // object that we want to update
                                            ...data, // keep all other key-value pairs
                                            phoneNumber: e.target.value // update the value of specific key
                                        })
                                        if (e.target.value.length !==8 ) {
                                        setErrorPhoneNumber(true);
                                    } else setErrorPhoneNumber(false);
                                    }}
                                />
                            }

                        </>
                    ) : (<span className="fw-normal">
           {data.phoneNumber}
          </span>)}
                </td>

                <td>

                    {data.shop_id ? (

                        <span className="fw-bolder" style={{color: "#00aa9b"}}>
           Assigned
          </span>
                    ) : (

                        <span className="fw-bolder"  style={{color: "#ef4641"}}>
           Not Assigned
          </span>
                    )}
                </td>

                <td>
                    {manager.shop_id? <FontAwesomeIcon icon={faStore}
                                      style={{color: "#00aa9b"}}
                                      onClick={() => history.push(`/shops/shopDetails/${manager.shop_id}`)}
                                      className="me-2"/>:
                        <FontAwesomeIcon icon={faStore}
                                         onClick={() => handleClick()}
                                         className="me-2"/>}

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

            {/*alert ASSINGMENT component*/}
            <Snackbar open={open}  autoHideDuration={6000} sx={{ backgroundColor: "#F57C00", color:"#F57C00" }} onClose={handleClose}>
                <Alert variant="filled" severity="warning" sx={{ width: '100%' }} onClose={handleClose}>
                    <AlertTitle>Warning!</AlertTitle>
                    Manager <strong> {manager.name} {manager.lastName} </strong>  is not assigned to a shop yet!
                </Alert>
            </Snackbar>

            {/*alert EDIT SUCCESS component*/}
            <Snackbar open={open2}  autoHideDuration={6000} sx={{ backgroundColor: "#00aa9b", color:"#00aa9b" }} onClose={handleClose}>
                <Alert variant="filled" severity="error" sx={{ width: '100%' }} onClose={handleClose}>
                    <AlertTitle>Success!</AlertTitle>
                    Your manager <strong> {manager.name} {manager.lastName} </strong> has been updated!
                </Alert>
            </Snackbar>

        </>
    );
};