import {Card, Col, Row} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export const OrderProductsDetails = ({product}) => {


    return (
        <Col xs={12} sm={6} lg={4}>
            <Card className="bg-white shadow-soft text-primary rounded" >
                <div className=" p-3">
                    <Row className="justify-content-start">
                        <Col>
                            <h6 className="fw-bolder text-primary">Name:</h6>
                        </Col>
                        <Col>
                            <h6 className="fw-normal text-primary">{product.name}</h6>
                        </Col>
                    </Row>

                    <Row className="justify-content-start">
                        <Col>
                            <h6 className="fw-bolder text-primary">Desc:</h6>

                            <h6 className="fw-normal text-primary">{product.description}</h6>
                        </Col>
                    </Row>

                    <Row className="justify-content-start">
                        <Col>
                            <h6 className="fw-bolder text-primary" style={{color:"#4974B9"}}>Category:</h6>
                        </Col>
                        <Col>
                            <h6 className="fw-bolder text-primary">{product.family.toUpperCase()}</h6>
                        </Col>
                    </Row>
                    <h4 className="mt-2">${product.price}</h4>

                </div>
            </Card>
        </Col>
    );
};