import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Chip, Divider, Typography} from "@mui/material";
import {Button, Col, Form, InputGroup, Nav, Row, Table} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit} from "@fortawesome/free-regular-svg-icons";
import {createShop, updateShop} from "../../../actions/shopAction";
import {useDispatch, useSelector} from "react-redux";
import {faCalendarAlt, faCheck, faTruck, faUpload, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import Datetime from "react-datetime";
import moment from "moment-timezone";
import {OrderProductsDetails} from "../OrderComponents/OrderProductsDetails";
import {Pagination} from "@mui/lab";
import OrderRow from "../OrderComponents/OrderRow";
import OrderOfMissionRow from "./OrderOfMissionRow";
import {
    affectOrderToMission,
    unaffectOrderFromMission,
    GetOrdesrByMission,
    GetOrdesrByRegion,
    GetOrdesrByShop, stateOrder
} from "../../../actions/orderAction";
import {GetMissionDetails, ListMissions, updateMission, UpdateMissionState} from "../../../actions/missionAction";
import OrderOfMissionEdit from "./OrderOfMissionEdit";
import {useKeycloak} from "@react-keycloak/web";



export default ({mission}) => {


    const missionId = mission._id;
    const today = new Date();
    const deadline = moment(today).add(2, "days")

    // display data
    const [data, setData] = useState({
        _id: "",
        deliveryDate:"",
        sendingDate:""
    })

    useEffect(() => {
        if(!data.name) {
            setData({
                _id: mission._id,
                deliveryDate: mission.deliveryDate,
                sendingDate: mission.sendingDate
            })
        }
    },[])

    // edit
    const [editable, setEditable] = useState(false)
    const [date, setDate] = useState("")
    const [ArrayOrders, setArrayOrders] = useState([])
    const [ArrayToremove, setArrayToremove] = useState([])
    const dispatch = useDispatch()

    const [disab, setDisab] = useState(false)
    const [region, setRegion] = useState([])


    //show orders
     const orderList = useSelector (state => state.ordersByMission);
    const orders = orderList.ordersByMission
    const loading = orderList.loading
    const error = orderList.error

    const orderByRegionList = useSelector (state => state.ordersByRegion);
    const ordersByRegion = orderByRegionList.ordersByRegion
    const loading2 = orderByRegionList.loading
    const error2 = orderByRegionList.error



//region
    useEffect(() => {
            if (orders) {
                orders.map(o => {
                    setRegion(o.region)
                })
        }
        console.log("hedhom region", region)
    }, [orders,region])

    useEffect(() => {
        if (missionId) {
            dispatch(GetOrdesrByMission(missionId))
        }
    }, [dispatch])

    //order by region to edit

    useEffect(() => {
        dispatch(GetOrdesrByRegion(region))
    }, [dispatch, region])

    //date entry
    const [ErrorDate, setErrorDate] = useState(false)

    useEffect(() => {
        if(date!=="") {
            if (moment(date).isAfter(deadline) ) {
                setData( {
                    ...data,
                    deliveryDate: moment(date).format("YYYY-MM-DD")
                })
                setErrorDate(false)
            }  else setErrorDate(true)

        }


        console.log("hedhi data", data)

    }, [date, ErrorDate])

    //arrayorders de base

    useEffect(() => {

            orders.map((o) => {
               if (!ArrayOrders.includes(o._id)) {
                   ArrayOrders.push(o._id)
               }
                console.log("eee", o._id)
            })

    },[orders])



    const [ErrorOrder, setErrorOrder] = useState(false)
    const [changed, setChanged] = useState(false)

    useEffect(() => {
      if ( (ArrayToremove.length >= orders.length) && (ArrayOrders.length===0)) {
          setErrorOrder(true)
      } else setErrorOrder(false)
    }, [ArrayToremove, ArrayOrders])


    useEffect(() => {
        if (ErrorOrder || ErrorDate ) {
            setDisab(true)

        } else setDisab(false);

    }, [ErrorOrder, ErrorDate]);

    console.log("error date",ErrorDate)

    const keycloak = useKeycloak();
    const userId = keycloak.keycloak.subject;



    return (
        <>

            {editable? (
                <Card border="light" className="bg-white shadow-lg mb-4">
                    <CardContent>
                        <Row className="d-flex justify-content-between align-items-center">
                            <Col className="col-auto">
                                <h5 className="mb-2" style={{color:"#4974a5"}} >Mission: MIS-{data._id.slice(data._id.length -5, data._id.length).toUpperCase()}</h5>
                                <p className="mb-4 fw-lighter">Note: It is impossible to edit or delete a mission after 48h.</p>
                            </Col>



                                <Col className="col-auto">
                                    {disab?  (<Button  disabled variant="secondary" size="sm" className="me-2" >
                                            <FontAwesomeIcon icon={faCheckCircle} className="me-1" /> Save
                                        </Button>):
                                        (<Button  variant="secondary" size="sm" className="me-2" onClick={(e) => {
                                            e.preventDefault();
                                             dispatch(updateMission(data._id, {deliveryDate: data.deliveryDate}))
                                            ArrayOrders.map(item => {
                                                dispatch (affectOrderToMission(item, {mission_id: missionId}))
                                            })
                                            ArrayToremove.map(item => {
                                                dispatch (unaffectOrderFromMission(item))
                                            } )
                                            // dispatch(GetOrdesrByMission(missionId))
                                            // setEditable(!editable);

                                            window.location.reload();
                                        }}>
                                            <FontAwesomeIcon icon={faCheckCircle} className="me-1" /> Save
                                        </Button>)
                                    }


                                </Col>



                        </Row>
                        <Form>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="firstName">
                                        <Form.Label> <Typography style={{color:"#04B3AC"}}>Creation Date: </Typography></Form.Label>
                                        <Datetime
                                            timeFormat={false}
                                            renderInput={(props, openCalendar) => (
                                                <InputGroup>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                    <Form.Control
                                                        disabled
                                                        required
                                                        type="text"
                                                        value={data.sendingDate ? moment(data.sendingDate).format("MM/DD/YYYY") : ""}
                                                        placeholder="mm/dd/yyyy"
                                                        onFocus={openCalendar}
                                                        onChange={() => { }} />
                                                </InputGroup>
                                            )} />

                                    </Form.Group>
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Group className="mb-2" id="birthday">
                                        <Form.Label>Due Date:</Form.Label>

                                        <Datetime
                                            timeFormat={false}
                                            onChange={setDate}
                                            renderInput={(props, openCalendar) => (
                                                <InputGroup>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        isInvalid={ErrorDate}
                                                        type="text"
                                                        value={data.deliveryDate ? moment(data.deliveryDate).format("DD/MM/YYYY") : ""}
                                                        placeholder="mm/dd/yyyy"
                                                        onFocus={openCalendar}
                                                         />
                                                    <Form.Control.Feedback type="invalid" >
                                                        Date  is invalid ! Please leave an interval of two days
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            )} />

                                    </Form.Group>


                                </Col>


                            </Row>


                            <Divider className="m-3"/>

                            <h5 className="my-4"  style={{color:"#4974a5"}}>Orders: ({orders.length})</h5>

                            <Row className="mt-3 ">
                                <Table hover className="user-table align-items-center">
                                    <thead>
                                    <tr>

                                        <th className="border-bottom">ID</th>
                                        <th className="border-bottom">Reception Date</th>
                                        <th className="border-bottom">Due Date</th>
                                        <th className="border-bottom">Shop ID</th>
                                        <th className="border-bottom">Validated</th>
                                        <th className="border-bottom" >State</th>
                                        <th className="border-bottom">Action</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                {ordersByRegion?.filter((row) => {
                                    if ((!row.mission_id || row.mission_id===missionId) && row.validated === "accepted" && (row.state === "to review" || row.state === "late" )) {
                                        return row;
                                    }
                                }).map((order) => (

                                    <OrderOfMissionEdit key= {order._id} missionId={missionId} setArrayToremove={setArrayToremove} ArrayToremove={ArrayToremove} ArrayOrders ={ArrayOrders} setArrayOrders={setArrayOrders} order={order} region={region} />
                                    // <OrderProductsDetails product={product} />
                                ))}
                                    </tbody>
                                </Table>

                                {/*<Pagination*/}
                                {/*    count={Math.trunc(order.products?.length / 3)}*/}
                                {/*    page={activePage}*/}
                                {/*    onChange={handleChange}*/}
                                {/*    color="primary"*/}
                                {/*    variant="outlined" shape="rounded"*/}
                                {/*/>*/}
                            </Row>
                        </Form>
                        {   ErrorOrder &&
                            <span style={{color:"red"}}>Please select an order</span>

                        }
                    </CardContent>

                </Card>

            ) : (

                <Card border="light" className="bg-white shadow-soft mb-4">

                    <CardContent>
                        <Row className="d-flex justify-content-between align-items-center">
                            <Col className="col-auto">
                                <Row>
                                    <Col>
                                    <h5 className="mb-3" style={{color:"#4974a5"}} >Mission: MIS-{data._id.slice(data._id.length -5, data._id.length).toUpperCase()}</h5>
                                    </Col>
                                    <Col className="col-auto mb-3">
                                        { data.state === 'standby' ?

                                            <Chip label="Stand by" className="fw-bolder" style={{backgroundColor: "#CCCCCC"}} />
                                            : data.state=== 'confirmed' ?
                                                <Chip label="Confirmed" className="fw-bolder" style={{backgroundColor: "#1dbbca"}} />
                                            : data.state=== 'delivered' ?
                                                <Chip label="Delivered" className="fw-bolder" style={{backgroundColor: "#0aae0d"}} />
                                                : data.state=== 'on going' ?
                                                    <Chip label="On going" className="fw-bolder" style={{backgroundColor: "#adfcad"}} />
                                                    : data.state=== 'rejected' ?
                                                        <Chip label="Rejected"  className="fw-bolder" style={{backgroundColor: "#d61d1d"}} />
                                                        : data.state ==='late' &&
                                                        <Chip label="Late"  className="fw-bolder" style={{backgroundColor: "#f6a01e"}} />
                                        }
                                    </Col>
                                </Row>

                                <p className="mb-4 fw-lighter">Note: It is impossible to edit or delete a mission after 48h fron its creation.</p>
                            </Col>
                            {/*{moment(data.sendingDate).format("MM/DD/YYYY") >= deadline &&*/}



                            {userId === "032f27f2-22f4-436a-b697-b02c710ec22e" ?
                           ( <Col className="col-auto">
                                {mission.state === "standby" ?
                                (<Button variant="primary" size="sm" className="me-2" onClick={() => {
                                    setEditable(true)
                                    setArrayToremove([]);
                                    setArrayOrders([]);
                                }}>
                                    <FontAwesomeIcon icon={faEdit} className="me-1"/> Edit
                                </Button> ) : (
                                        <Button variant="primary" size="sm"  disabled  className="me-2" >
                                            <FontAwesomeIcon icon={faEdit} className="me-1"/> Edit
                                        </Button>
                                    )
                                }


                            </Col> ) : (
                                    <Col className="col-auto">
                                        {mission.state === "confirmed" ?
                                            (<Button variant="primary" style={{backgroundColor: "#91e291", borderColor:"#91e291"}} size="sm" className="me-2" onClick={() => {
                                             dispatch(UpdateMissionState(mission._id, {state: "on going"}) )

                                                dispatch(GetMissionDetails(mission._id));
                                                 setChanged(true)
                                                window.location.reload()
                                            }}>
                                                <FontAwesomeIcon icon={faTruck} className="me-1"/> On going
                                            </Button> ) : mission.state === "on going" && (
                                                <Button variant="primary" size="sm"  style={{backgroundColor: "#0aae0d", borderColor:"#0aae0d"}} onClick={() => {
                                                    dispatch(UpdateMissionState(mission._id, {state: "delivered"}) )

                                                    dispatch(GetMissionDetails(mission._id));
                                                    setChanged(true)
                                                    window.location.reload()

                                                }}  className="me-2" >
                                                    <FontAwesomeIcon icon={faCheck} className="me-1"/> Delivered
                                                </Button>
                                            )
                                        }


                                    </Col>
                                )}

                        </Row>
                        <Form>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="firstName">
                                        <Form.Label><Typography style={{color:"#4974a5"}}>Creation Date: </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop number"
                                                      value={data.sendingDate ? moment(data.sendingDate).format("DD/MM/YYYY") : ""}
                                                      disabled
                                        />

                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group id="firstName">
                                        <Form.Label> <Typography style={{color:"#4974a5"}}>Due Date: </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"
                                                      value={data.deliveryDate ? moment(data.deliveryDate).format("DD/MM/YYYY") : ""}
                                                      disabled
                                        />
                                    </Form.Group>
                                </Col>


                            </Row>
                            <Divider className="m-3"/>

                            <h5 className="my-4"  style={{color:"#4974a5"}}>Orders: ({orders.length})</h5>


                            <Row className="mt-3 ">
                                {/*{data.delieveredOrders?.slice((activePage - 1) * 3, activePage * 3).map((product) => (*/}
                                <Table hover className="user-table align-items-center">
                                    <thead>
                                    <tr>

                                        <th className="border-bottom">ID</th>
                                        <th className="border-bottom">Reception Date</th>
                                        <th className="border-bottom">Due Date</th>
                                        <th className="border-bottom">Shop ID</th>
                                        <th className="border-bottom">Validated</th>
                                        <th className="border-bottom" >State</th>
                                        {/*<th className="border-bottom">Action</th>*/}
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {orders?.map((order) => (
                                        <OrderOfMissionRow key= {order._id} setChanged={setChanged} changed={changed} mission={mission}  order={order} />
                                        // <OrderProductsDetails product={product} />
                                    ))}
                                    </tbody>
                                </Table>

                                {/*<Pagination*/}
                                {/*    count={Math.trunc(order.products?.length / 3)}*/}
                                {/*    page={activePage}*/}
                                {/*    onChange={handleChange}*/}
                                {/*    color="primary"*/}
                                {/*    variant="outlined" shape="rounded"*/}
                                {/*/>*/}
                            </Row>

                        </Form>

                    </CardContent>

                </Card>
            )}



        </>

    );
};