import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {listCompetitors} from "../../../actions/competitorAction";
import {Card, Col, Nav, Pagination, Row, Table} from "@themesberg/react-bootstrap";
import {Box, Button, CardActions, CircularProgress, Divider, Icon, Stack, Typography} from "@mui/material";
import {Alert} from "@mui/lab";
import ShopRow from "../ShopComponents/ShopRow";
import CardContent from "@mui/material/CardContent";
import {CounterWidget} from "../../../components/Widgets";
import {faChartLine} from "@fortawesome/free-solid-svg-icons";
import ProfileCover from "../../../assets/img/profile-cover.jpg";

export const CompetitorCard = ({competitor}) => {

    return (
        <>
                    <Card   border="light" className="shadow-sm mb-2" >
                        {competitor.image ? (
                            <div style={{  backgroundImage: `url(${competitor.image})`}}  className="profile-cover rounded-top" />
                        ) :  <div style={{  backgroundImage: `url(${ProfileCover})`}}  className="profile-cover rounded-top" />}
                        <Card.Body className="pb-2" >
                            <Card.Title>{competitor.title}</Card.Title>
                            <Card.Subtitle className="fw-normal mb-2"> <strong> {competitor.price}</strong></Card.Subtitle>
                            {/*<Button variant="secondary" size="sm" onClick={ (e) => { e.preventDefault(); window.open(`url(${competitor.link}`)}}>Check</Button>*/}
                        </Card.Body>
                    </Card>
        </>
    );
};