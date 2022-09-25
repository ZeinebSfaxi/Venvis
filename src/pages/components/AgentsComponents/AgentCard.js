import {Button, Card, Col} from "@themesberg/react-bootstrap";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import Profile1 from "../../../assets/img/team/profile-picture-1.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect ,useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {affectManagerToShop, GetManagerByShop, listManagers} from "../../../actions/shopManagerAction";
import {
    Avatar,
    Box,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import {Alert} from "@mui/lab";
import {GetAgentDetails} from "../../../actions/agentAction";


function CategoryOutlinedIcon() {
    return null;
}

function CategoryIcon() {
    return null;
}

export const AgentCard = () => {

    const routeParams = useParams();
    const idAgent = routeParams.agentId;
    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(GetAgentDetails(idAgent))

    }, [dispatch, idAgent])

    const singleAgentDetails = useSelector(state => state.agentDetails)
    const loading = singleAgentDetails.loading
    const agent = singleAgentDetails.agent
    const error = singleAgentDetails.error

    // useEffect(() => {
    //     dispatch(GetManagerByShop(idShop))
    // }, [dispatch, idShop])

    // const ManagerbyShopDetails = useSelector(state => state.managerByShop)
    // const loading = ManagerbyShopDetails.loading
    // const shopmanager = ManagerbyShopDetails.manager[0]
    // const error = ManagerbyShopDetails.error


    // Dialogue Stats
    const [dialogueForm, setDialogueForm] = useState(false);
    const handleCloseDialogue = value => {
        setDialogueForm(false);
    };
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


    return (

        <>
            {idAgent=== "undefined"? (
                <>
                    <Card border="light" className="text-center p-0 mb-4">
                <Card.Body className="pb-5">
                    <Card.Title> No agents for this mission</Card.Title>
                    <Card.Subtitle className="fw-normal">No agents are available for this mission</Card.Subtitle>
                    <Card.Text className="text-gray mb-4">Would you like to assign a new agent ?</Card.Text>

                    <Button variant="primary" size="sm" className="me-2" onClick={() => {
                        setDialogueForm(true)
                    }}>
                        <FontAwesomeIcon icon={faUserEdit} className="me-1" /> Assign
                    </Button>
                </Card.Body>
                    </Card>
                </>

                ) : (

                <>


                    {loading ? (
                        <Box className="m-5" sx={{ display: 'flex',alignItems: 'center',
                            justifyContent: 'center',  }} >
                            <CircularProgress style={{color:"#323854"}} />
                        </Box>
                    ) : error ? (

                        <Alert className="m-2" sx={{ width: '100%' }} variant="filled" severity="error">
                            Ay ay ay! looks like you have network problems :(
                            <ul>
                                <li> try reloading your page </li>
                                <li>  try checking your internet connection</li>
                            </ul>
                            {"\n"} <strong>Error: {error} </strong>
                        </Alert>

                    ) : (
                        <>

                            { agent &&
                            (
                                <Card border="light" className="text-center p-0 mb-4">

                                    <>
                                        <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top"/>
                                        <Card.Body className="pb-5">
                                            <Avatar className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" sx={{ bgcolor: "#262b40", fontSize:"300%" }}>{agent.firstName?.charAt(0).toUpperCase()} {agent.lastName?.charAt(0).toUpperCase()}</Avatar>
                                            {/*<Card.Img  alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" > {shopmanager.name.charAt(0).toUpperCase()} {shopmanager.lastName.charAt(0).toUpperCase()}</Card.Img>*/}

                                            <Card.Title>{agent?.firstName} {agent?.lastName}</Card.Title>
                                            <Card.Subtitle >Commercial Agent</Card.Subtitle>
                                            <Card.Text className="text-gray mb-0">{agent?.email}</Card.Text>
                                            <Card.Text className="text-gray mb-4">{agent.attributes?.phone}</Card.Text>


                                            {/*<Button variant="primary" size="sm" className="me-2"  onClick={() => {*/}
                                            {/*    setDialogueForm(true)*/}
                                            {/*}}>*/}
                                            {/*    <FontAwesomeIcon icon={faUserEdit} className="me-1" /> Replace Manager*/}
                                            {/*</Button>*/}
                                            <Button variant="secondary" size="sm">Send Message</Button>
                                        </Card.Body>
                                    </>

                                </Card>
                            )
                            }
                        </>
                    )}
                </>

            ) }


            {/*************Dialogue*/}

            {/*<Dialog*/}
            {/*    fullWidth*/}
            {/*    open={dialogueForm}*/}
            {/*    onClose={handleCloseDialogue}*/}
            {/*    aria-labelledby="draggable-dialog-title"*/}
            {/*    // TransitionComponent={Transition}*/}
            {/*>*/}
            {/*    <DialogTitle id="draggable-dialog-title">*/}
            {/*        Assign a manager*/}
            {/*    </DialogTitle>*/}
            {/*    <DialogContent>*/}
            {/*        <DialogContentText>*/}
            {/*            {loading ? (*/}
            {/*                <Box sx={{ display: 'flex' }}>*/}
            {/*                    <CircularProgress />*/}
            {/*                </Box>*/}
            {/*            ) : error ? (*/}

            {/*                <Alert variant="filled"  sx={{ width: '100%' }} severity="error">*/}
            {/*                    Ay ay ay! looks like you have network problems :(*/}
            {/*                    try reloading your page*/}
            {/*                    try checking your internet connection*/}
            {/*                    Error: {error}*/}
            {/*                </Alert>*/}

            {/*            ) : (*/}
            {/*                <>*/}
            {/*                    <div className=" m-2 ">*/}
            {/*                        <Checkbox*/}
            {/*                            checked={checked}*/}
            {/*                            onChange={handleChange}*/}
            {/*                            inputProps={{ 'aria-label': 'controlled' }}*/}
            {/*                        />*/}
            {/*                        Show unassigned managers only*/}
            {/*                    </div>*/}
            {/*                    { checked?*/}
            {/*                        (  managers?.map((manager) => (*/}
            {/*                            // manager doesnt have shopID*/}
            {/*                            !manager.shop_id &&*/}
            {/*                            <AffectManagerCard key= {manager._id} dialogueForm={dialogueForm} manager={manager} />*/}
            {/*                        )))*/}
            {/*                        :*/}
            {/*                        (*/}
            {/*                            managers?.map((manager) => (*/}
            {/*                                // <ShopRow key= {shop._id} shop={shop}/>*/}
            {/*                                <AffectManagerCard key= {manager._id} setDialogueForm={setDialogueForm} manager={manager} />*/}
            {/*                            )))*/}
            {/*                    }*/}

            {/*                </>*/}
            {/*            )}*/}
            {/*        </DialogContentText>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}


        </>

    );
};