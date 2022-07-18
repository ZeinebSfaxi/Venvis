import {Button, Card, Col} from "@themesberg/react-bootstrap";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import Profile1 from "../../../assets/img/team/profile-picture-1.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect ,useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {affectManagerToShop, GetManagerByShop, listManagers} from "../../../actions/shopManagerAction";
import {Box, Checkbox, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Alert} from "@mui/lab";
import {AffectManagerCard} from "./AffectManagerCard";

function CategoryOutlinedIcon() {
    return null;
}

function CategoryIcon() {
    return null;
}

export const ShopManagerCard = () => {

    const routeParams = useParams();
    const idShop = routeParams.shopId;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetManagerByShop(idShop))
    }, [dispatch, idShop])

    const ManagerbyShopDetails = useSelector(state => state.managerByShop)
    const loading = ManagerbyShopDetails.loading
    const shopmanager = ManagerbyShopDetails.manager[0]
    const error = ManagerbyShopDetails.error


    // Dialogue Stats
    const [dialogueForm, setDialogueForm] = useState(false);
    const handleCloseDialogue = value => {
        setDialogueForm(false);
    };
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    //get managers list
    const managerList = useSelector (state => state.managerList);
    const managers = managerList.managers
    const loadingList = managerList.loading
    const errorList = managerList.error

    useEffect(() => {
        dispatch(listManagers())

    }, [dispatch])


    return (
        <>
            <Card border="light" className="text-center p-0 mb-4">


        {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (

            <Alert sx={{ width: '100%' }} variant="filled" severity="error">
                Ay ay ay! looks like you have network problems :(
                try reloading your page
                try checking your internet connection
                Error: {error}
            </Alert>

            ) : (
                <>
                    { shopmanager ?
                    (
                        <>
                        <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
                        <Card.Body className="pb-5">
                            <Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
                            <Card.Title>{shopmanager.name} {shopmanager.lastName}</Card.Title>
                            <Card.Subtitle className="fw-normal">{shopmanager.email}</Card.Subtitle>
                            <Card.Text className="text-gray mb-4">{shopmanager.phoneNumber}</Card.Text>

                            <Button variant="primary" size="sm" className="me-2"  onClick={() => {
                                setDialogueForm(true)
                            }}>
                                <FontAwesomeIcon icon={faUserEdit} className="me-1" /> Replace
                            </Button>
                            <Button variant="secondary" size="sm">Send Message</Button>
                        </Card.Body>
                        </>

                    ) : (
                            <Card.Body className="pb-5">
                                <Card.Title> No managers for this shop</Card.Title>
                                <Card.Subtitle className="fw-normal">No manager is available for this shop</Card.Subtitle>
                                <Card.Text className="text-gray mb-4">Would you like to affect a new one ?</Card.Text>

                                <Button variant="primary" size="sm" className="me-2" onClick={() => {
                                    setDialogueForm(true)
                                }}>
                                    <FontAwesomeIcon icon={faUserEdit} className="me-1" /> Affect
                                </Button>
                            </Card.Body>
                        ) }
                </>
            )}
            </Card>

            {/*************Dialogue*/}

            <Dialog
                fullWidth
                open={dialogueForm}
                onClose={handleCloseDialogue}
                aria-labelledby="draggable-dialog-title"
                // TransitionComponent={Transition}
            >
                <DialogTitle id="draggable-dialog-title">
                   Affect A Manager
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       {loading ? (
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        ) : error ? (

                            <Alert variant="filled"  sx={{ width: '100%' }} severity="error">
                                Ay ay ay! looks like you have network problems :(
                                try reloading your page
                                try checking your internet connection
                                Error: {error}
                            </Alert>

                        ) : (
                            <>
                                <div className=" m-2 ">
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                     Show unassigned managers only
                                </div>
                                { checked?
                                  (  managers?.map((manager) => (
                                    // <ShopRow key= {shop._id} shop={shop}/>
                                      !manager.shop_id &&
                                    <AffectManagerCard key= {manager._id} manager={manager} />
                                )))
                                     :
                                    (
                                        managers?.map((manager) => (
                                    // <ShopRow key= {shop._id} shop={shop}/>
                                    <AffectManagerCard key= {manager._id} manager={manager} />
                                    )))
                                }

                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </>

    );
};