import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faExternalLinkAlt,
  faTimesCircle,
  faCheckCircle,
  faCalendarAlt,
  faCodeBranch,
  faShoppingCart,
  faFolder,
  faMapMarkedAlt,
  faPager,
  faFileCode,
  faDownload,
  faArrowAltCircleRight, faCarAlt, faShuttleVan, faUser, faUserAlt, faUserTie, faTruck
} from "@fortawesome/free-solid-svg-icons";
import {
  faAlipay,
  faBootstrap,
  faFirstOrder,
  faFirstOrderAlt,
  faGithub,
  faJs, faProductHunt,
  faReact,
  faSass
} from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Code from "../components/CodeEditor";
import GitHubButton from 'react-github-btn';

import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/edited-venvis.png";
import LogoSizeTwo from "../assets/img/technologies/Logo_Size2.png";
import shops from "../assets/img/Shops1.png";
import orders from "../assets/img/orders2.png";
import missions from "../assets/img/Missions.png";
import employees from "../assets/img/Employees.png";
import BS5IllustrationsImg from "../assets/img/illustrations/bs5-illustrations.svg";


//keycloak integration
import { useKeycloak } from "@react-keycloak/web";


export default () => {

  const PagePreview = (props) => {
    const { name, image, link } = props;

    return (
      <Col xs={6} className="mb-5">
        <Card.Link as={Link} to={link} className="page-preview page-preview-lg scale-up-hover-2">
          <Image src={image} className="shadow-lg rounded scale" alt="Dashboard page preview" />

          <div className="text-center show-on-hover">
            <h6 className="m-0 text-center text-white">
              {name} <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2" />
            </h6>
          </div>
        </Card.Link>
      </Col>
    );
  };

  const Feature = (props) => {
    const { title, description, icon } = props;

    return (
      <Col xs={12} sm={6} lg={3}>
        <Card className="bg-white shadow-soft text-primary rounded mb-4">
          <div className="px-3 px-lg-4 py-5 text-center">
            <span className="icon icon-lg mb-4">
              <FontAwesomeIcon icon={icon} />
            </span>
            <h5 className="fw-bold text-primary">{title}</h5>
            <p>{description}</p>
          </div>
        </Card>
      </Col>
    );
  };

  const FolderItem = (props) => {
    const { name, icon, tooltip, iconColor } = props;
    const color = iconColor ? `text-${iconColor}` : "";

    return (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="left"
        overlay={<Tooltip>{tooltip}</Tooltip>}
      >
        <li data-toggle="tooltip" data-placement="left" title="Main folder that you will be working with">
          <FontAwesomeIcon icon={icon ? icon : faFolder} className={`${color} me-2`} /> {name}
        </li>
      </OverlayTrigger>
    );
  };

  const { keycloak, initialized } = useKeycloak();

  const LogoStyle ={
    paddingBottom : '20px' ,
  }

  return (
    <>
      <Navbar variant="dark" expand="lg" bg="dark" className="navbar-transparent navbar-theme-primary sticky-top">
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 d-flex align-items-center">
            <Image src={ReactHero} />
            <span className="ms-2 brand-text d-none d-md-inline"></span>
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <Navbar.Collapse id="navbar-default-primary">
              <Nav className="navbar-nav-hover align-items-lg-center">
                <Nav.Link as={HashLink} to="#home">Overview</Nav.Link>
                <Nav.Link as={HashLink} to="#features">Features</Nav.Link>
                <Nav.Link as={HashLink} to="#contact" className="d-sm-none d-xl-inline">Contact us</Nav.Link>
              </Nav>
            </Navbar.Collapse>

            {/*<Button variant="outline-white"  className="ms-3" onClick={() => keycloak.login()} ><FontAwesomeIcon icon={faDownload} className="me-1" /> Login</Button>*/}
           
            {/*{!!keycloak.authenticated && ( <Button variant="outline-white"  className="ms-3" onClick={() => keycloak.logout()}><FontAwesomeIcon icon={faDownload} className="me-1" /> Logout</Button> )}*/}


            <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
            {!keycloak.authenticated && ( <Button as={HashLink} to="#download" variant="outline-white" className="ms-3" onClick={() => keycloak.login()}><FontAwesomeIcon icon={faArrowAltCircleRight} className="me-1" /> Login</Button>)}
          </div>
        </Container>
      </Navbar>
      <section className="section-header overflow-hidden pt-5 pt-lg-6 pb-9 pb-lg-12 bg-primary text-white" id="home">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <div className="react-big-icon d-none d-lg-block"><span className="fab fa-react"></span></div>
              {/*<h1 className="fw-bolder text-secondary">Volt React Dashboard</h1>*/}
              <Container style={LogoStyle} className="container mx-auto px-4">
              <Image src={LogoSizeTwo} />
              </Container>

              <p className="text-muted fw-light mb-4 h5 ">Your Sales Force Solution</p>
              <div style={LogoStyle} className="d-flex align-items-center justify-content-center">
                {keycloak.authenticated && (
                    <Button variant="secondary" as={Link} to={Routes.DashboardOverview.path} className="text-dark me-3">
                      Access Venvis <FontAwesomeIcon icon={faExternalLinkAlt} className="d-none d-sm-inline ms-1" />
                    </Button>
                )}

                {/*<GitHubButton className="mt-lg-2" href="https://github.com/themesberg/volt-react-dashboard" data-size="large" data-show-count="true" aria-label="Star themesberg/volt-react-dashboard on GitHub">Star</GitHubButton>*/}
              </div>
              {/*<div className="d-flex justify-content-center flex-column mb-6 mb-lg-5 mt-5">*/}
              {/*  <div className="text-center">*/}
              {/*    <a href="https://themesberg.com" target="_blank">*/}
              {/*      <Image src={ThemesbergLogoIcon} height={25} width={25} className="mb-3" alt="Themesberg Logo" />*/}
              {/*      <p className="text-muted font-small m-0">A Themesberg production</p>*/}
              {/*    </a>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </Col>
          </Row>
          <figure className="position-absolute bottom-0 left-0 w-100 d-none d-md-block mb-n2">
            <svg className="fill-soft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 185.4">
              <path d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z" />
            </svg>
          </figure>
        </Container>
      </section>
      <div className="section pt-0">
        <Container className="mt-n10 mt-lg-n12 z-2">
          {/*<Row className="justify-content-center">*/}
          {/*  <Col xs={12}>*/}
          {/*    <Image src={MockupPresentation} alt="Mockup presentation" />*/}
          {/*  </Col>²*/}
          {/*</Row>*/}
          <Row className="justify-content-center mt-5 mt-lg-6">
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faShoppingCart} className="text-secondary" />
              </div>
              {/*<h3 className="fw-bolder">10</h3>*/}
              <p className="text-white">Manage Your Shops</p>
            </Col>
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faTruck} className="text-secondary" />
              </div>
              {/*<h3 className="fw-bolder">100+</h3>*/}
              <p className="text-white">Oversee Your Orders </p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="text-secondary" />
              </div>
              {/*<h3 className="fw-bolder">Workflow</h3>*/}
              <p className="text-white">Track Your Missions </p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon color="secondary" icon={faUserTie} className="text-secondary" />
              </div>
              {/*<h3 className="fw-bolder">Bootstrap 5</h3>*/}
              <p className="text-white">Lead Your Employees</p>
            </Col>
          </Row>
        </Container>
      </div>
      <section className="section section-md bg-soft pt-lg-3" id="features">
        <Container >
          <Row className="justify-content-between align-items-center mb-5 mb-lg-7">
            <Col lg={5} className="order-lg-2 mb-5 mb-lg-0">
              <h2>Managing Your Shops</h2>
              <p className="mb-3 lead fw-bold">Acquiring the control over multiple stores.</p>
              <p className="mb-4"> This feature will give you the choice to add, delete or modify every outlet and let you be the head of commercials to assign their roles and affect their details. </p>
              {/*<Button as={Link} to={Routes.DashboardOverview.path} variant="secondary" target="_blank">Live Demo <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Button>*/}
              {/*<Button as={HashLink} to="#download" variant="outline-primary" className="ms-3"><FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Download</Button>*/}
            </Col>
            <Col lg={6} className="order-lg-1">
              <Image src={shops} alt="Calendar Preview" />
            </Col>
          </Row>

          <Row className="justify-content-between align-items-center mb-5 mb-lg-7">
            <Col lg={5} className="order-lg-1 mb-5 mb-lg-0">
              <h2 className="d-flex align-items-center">Oversee Your Orders</h2>
              <p className="mb-3 lead fw-bold">Locates your orders progress in real time.</p>
              <p className="mb-4">This feature assure the security and punctuality of your on going deliveries. </p>
            </Col>
            <Col lg={6} className="order-lg-2">
              <Image src={orders} alt="MapBox Leaflet.js Custom Integration Mockup" />
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center mb-5 mb-lg-7">

            <Col lg={6}>
              <Image src={missions} alt="Calendar Preview" />
            </Col>
            <Col lg={5}>
              <h2 className="d-flex align-items-center">Track Your Missions</h2>
              <p className="mb-3 lead fw-bold">
                Upgraded calendar that shows missions on their specific date.
              </p>
              <p className="mb-4">
                Initiating the deliveries by creating a mission that has its specific orders respecting the region of that particular shop.
                User friendly that organizes your tasks efficiently.
              </p>
            </Col>

          </Row>
          <Row className="justify-content-between align-items-center">
            <Col lg={5} className="order-lg-1 mb-5 mb-lg-0">
              <h2>Lead Your Employees </h2>
              <p className="mb-3 lead fw-bold">
                Supervise your employees accordingly.
              </p>
              <p className="mb-4">
                Assign each employee his specific task respecting his role while controlling their activities and accounts.
              </p>
            </Col>
            <Col lg={6} className="col-lg-6 order-lg-2">
              <Image src={employees} alt="Front pages overview" />
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="footer py-6 bg-dark text-white" id="contact">
        <Container>
          <Row>
            <Col md={5}>
              <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 mb-3 d-flex align-items-center">
                <Image src={ReactHero} />
                {/*<span className="ms-2 brand-text">Volt React</span>*/}
              </Navbar.Brand>
              <p>Venvis is a Sales Force solution made by the great Zeineb Sfaxi or knowen as Bezbez Mysa khaleessi Queen for tanennette !</p>
            </Col>

            <Col xs={8} md={6} className="mb-5 mb-lg-0">
              <span className="h5 mb-3 d-block">Contact-us</span>
              <form action="#">
                <div className="form-row mb-2">
                  <div className="col-12">
                    <input type="email" className="form-control mb-2" placeholder="example@company.com" name="email" aria-label="Subscribe form" required />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-secondary text-dark shadow-soft btn-block" data-loading-text="Sending">
                      <span>Contact-us</span>
                    </button>
                  </div>
                </div>
              </form>
              <p className="text-muted font-small m-0">We’ll never share your details. See our <Card.Link className="text-white" href="#">Privacy Policy</Card.Link></p>
            </Col>
          </Row>
          <hr className="bg-gray my-5" />
          <Row>
            <Col className="mb-md-2">

              <div className="d-flex text-center justify-content-center align-items-center" role="contentinfo">
                <p className="font-weight-normal font-small mb-0">Copyright © Inetum <span className="current-year">2022</span>. All rights reserved.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
