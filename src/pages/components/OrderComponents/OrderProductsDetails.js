import { Col, Row} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {CardContent, Card} from "@mui/material";


export const OrderProductsDetails = ({product}) => {


    return (
        <Col xs={12} sm={6} lg={4}>
            <Card border="light" className="border-light shadow-hover mb-4 rounded" >
                <CardContent>
                <div className=" p-3">
                    <Row className="justify-content-start">
                        <Col>
                            <h6 className="fw-bolder " style={{color:"#4974a5"}}>Name:</h6>

                            <h6 className="fw-normal text-primary">{product.name}</h6>
                        </Col>
                    </Row>

                    <Row className="justify-content-start">
                        <Col>
                            <h6 className="fw-bolder "  style={{color:"#4974a5"}}>Desc:</h6>

                            <h6 className="fw-normal text-primary">{product.description}</h6>
                        </Col>
                    </Row>

                    <Row className="justify-content-start">
                        <Col>
                            <h6 className="fw-bolder" style={{color:"#4974a5"}}>Category:</h6>
                        </Col>
                        <Col>
                            <h6 className="fw-bolder "  style={{color:"#4974a5"}}>{product.family.toUpperCase()}</h6>
                        </Col>
                    </Row>
                    <h4 className="mt-2"  style={{color:"#262b40"}}>TND{product.price}</h4>

                </div>
                </CardContent>
            </Card>
        </Col>
    );
};