import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup } from '@themesberg/react-bootstrap';
import {ListShop} from "./components/ShopComponents/ListShop";
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import AddShopForm from "./components/ShopComponents/AddShopForm";
import {ListManagers} from "./components/ShopManagerComponents/ListManagers";

export default () => {

    //search
    const [search, setSearch] = useState('');

    // Dialogue Stats
    const [dialogueForm, setDialogueForm] = useState(false);
    const handleCloseDialogue = value => {
        setDialogueForm(false);
    };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Venvis</Breadcrumb.Item>
                        <Breadcrumb.Item active>Managers</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Your Shop Managers</h4>
                    <p className="mb-0">Your web analytics dashboard template.</p>
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

            <ListManagers search={search} />

            <Dialog
                fullWidth
                open={dialogueForm}
                onClose={handleCloseDialogue}
                aria-labelledby="draggable-dialog-title"
                // TransitionComponent={Transition}
            >
                <DialogTitle id="draggable-dialog-title">
                    Add A New Shop
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <AddShopForm />
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </>
    );
};
