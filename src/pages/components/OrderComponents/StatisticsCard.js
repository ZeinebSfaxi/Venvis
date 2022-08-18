import {Card, Col} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export const Statistics = (props) => {
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