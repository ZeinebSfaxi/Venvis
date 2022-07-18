import {Button, Card, Image} from "@themesberg/react-bootstrap";
import React, {useState} from "react";
import {Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateShop} from "../../../actions/shopAction";
import {affectManagerToShop, GetManagerByShop} from "../../../actions/shopManagerAction";
import {useParams} from "react-router-dom";
import {faUserCheck, faUserEdit, faUserSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const AffectManagerCard = ({manager}) => {

    const routeParams = useParams();
    const idShop = routeParams.shopId;

    const [updatedManager, setUpdatedManager] = useState({
        name: manager.name,
        lastName: manager.lastName,
        email: manager.email,
        shop_id: idShop
    });
    console.log("hedha shop id", idShop)

    const dispatch = useDispatch()
    const affect = () => {
        if (manager._id ) {
            dispatch (affectManagerToShop(manager._id, updatedManager))
            dispatch(GetManagerByShop(idShop))
        }
        // window.location.reload();
    };
    return (

        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <div className="d-xl-flex align-items-center">
                    <div className="user-avatar xl-avatar">
                        {/*<Image fluid rounded src={} />*/}
                    </div>
                    <div className="file-field">
                        <div className="d-flex justify-content-xl-center ms-xl-3">
                            <div className="d-flex">
                                    <div className="d-md-block text-start">
                                    <div className="fw-normal text-dark mb-1">{manager.name} {manager.lastName}</div>
                                    <div className="text-gray small">{manager.email}</div>
                                    <div className="text-gray small">{manager.phoneNumber}</div>
                                        { manager.shop_id ?
                                            <>
                                           <Typography style={{color: "#D64541"}} className="mt-2">Already affected
                                                to a shop!</Typography>
                                            <div className="mt-3">
                                                <Button variant="danger" size="sm" onClick={(e) => {
                                                    e.preventDefault();
                                                    affect();

                                                }}>
                                                    <FontAwesomeIcon icon={faUserSlash} className="me-1" />
                                                    Re-affect</Button>
                                            </div>
                                            </>:
                                            <div className="mt-3">
                                            <Button variant="primary"  size="sm" onClick={(e) => {
                                                e.preventDefault();
                                                affect();

                                            }}>
                                                <FontAwesomeIcon icon={faUserCheck} className="me-1" />
                                                Affect</Button>
                                            </div>
                                            }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};