import {useKeycloak} from "@react-keycloak/web";
import React, {useEffect} from "react";
import {Presentation} from "../pages/Presentation";
import {Button, Card, Col, Container, Image, Row} from "@themesberg/react-bootstrap";
import {Link} from "react-router-dom";

import logout from "../assets/img/illustrations/logout.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Routes} from "../routes";

const PrivateRoute = ({children}) => {
    const {keycloak} = useKeycloak();

    const isLoggedIn = keycloak.authenticated;
    useEffect(() => {
    }, [isLoggedIn]);

    return (<div>{isLoggedIn ? (children) : (<main>
        <section className="vh-100 d-flex align-items-center justify-content-center">
            <Container>
                <Row>
                    <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
                        <div>
                            <Card.Link as={Link} to={Routes.DashboardOverview.path}>
                                <Image src={logout} className="img-fluid w-75"/>
                            </Card.Link>
                            <h1 className="text-primary mt-5">
                                <span className="fw-bolder">Good Job today!</span>
                            </h1>
                            <p className="lead my-4">
                                See you soon !
                            </p>
                            <Button as={Link} variant="primary" className="animate-hover"
                                    to={Routes.Presentation.path}>
                                <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2"/>
                                Go Back Home
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </main>)}</div>);
};

export default PrivateRoute;