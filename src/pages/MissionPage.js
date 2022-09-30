import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Card, Table} from '@themesberg/react-bootstrap';
import {ListShop} from "./components/ShopComponents/ListShop";
import {Box, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Stack} from "@mui/material";
import AddShopForm from "./components/ShopComponents/AddShopForm";



import {ListMission} from "./components/MissionsComponents/ListMission";
import {useDispatch, useSelector} from "react-redux";
import {MissionCalendar} from "./components/MissionsComponents/MissionCalendar";
import {Alert, Pagination} from "@mui/lab";
import MissionRow from "./components/MissionsComponents/MissionRow";
import AddMissionForm from "./components/MissionsComponents/AddMissionForm";
import MapMissions from "./components/MissionsComponents/MapMissions";
import {ListMissions} from "../actions/missionAction";




export default () => {

    //display managers
    const dispatch = useDispatch();

    const missionList = useSelector (state => state.missionList);
    const missions = missionList.missions
    const loading = missionList.loading
    const error = missionList.error

    useEffect(() => {
        dispatch(ListMissions())

    }, [dispatch])



    //search
    const [search, setSearch] = useState('');

    // Dialogue Stats
    const [dialogueForm, setDialogueForm] = useState(false);
    const handleCloseDialogue = value => {
        setDialogueForm(false);
    };

    const [missionIdSelected, setMissionIdSelected ] = useState();



    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Venvis</Breadcrumb.Item>
                        <Breadcrumb.Item active>Shops</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Your Missions</h4>
                    <p className="mb-0">Here you can plan all your missions.</p>
                    <p className="mb-0 fw-bolder">Note: It is impossible to edit or delete a mission after 48h.</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                        <Button variant="outline-primary" size="sm">Share</Button>
                        <Button variant="outline-primary" size="sm">Export</Button>
                    </ButtonGroup>
                </div>
            </div>

            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Search"    onChange={(e) => setSearch(e.target.value)}/>
                        </InputGroup>
                    </Col>
                    <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
                        <Button variant="secondary" size="sm" onClick={() => {
                            setDialogueForm(true)
                        }} className="text-dark ">
                            <FontAwesomeIcon
                                className="justify-content-between flex-md-nowrap" icon={faPlus}/> New
                        </Button>
                    </Col>
                </Row>
            </div>
            <Row>
                <ListMission setMissionIdSelected={setMissionIdSelected} missions={missions} error={error} loading={loading} search={search} />

            </Row>
            <Row>

               <MissionCalendar setDialogueForm={setDialogueForm} />

            </Row>
            <Row>
                <MapMissions missions={missions} missionIdSelected={missionIdSelected} />
            </Row>
            <Dialog
                fullWidth
                open={dialogueForm}
                onClose={handleCloseDialogue}
                aria-labelledby="draggable-dialog-title"
                // TransitionComponent={Transition}
            >
                <DialogTitle id="draggable-dialog-title">
                    Add A New Mission
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <AddMissionForm />
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </>
    );
};
