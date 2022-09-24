import {Button, Card, Col, Form, InputGroup, Row, Table} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createShop, listShops} from "../../../actions/shopAction";
import {Box, CircularProgress, TextField, Typography} from "@mui/material";
import {Alert, DatePicker, LocalizationProvider} from "@mui/lab";
import Datetime from "react-datetime";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
import {affectOrderToMission, GetOrdesrByMission, GetOrdesrByRegion, ListOrder} from "../../../actions/orderAction";
import OrderRow from "../OrderComponents/OrderRow";
import OrdersForMissionAdd from "./OrdersForMissionAdd";
import {addManager} from "../../../actions/shopManagerAction";
import {createMission, ListMissions} from "../../../actions/missionAction";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import CardContent from "@mui/material/CardContent";


export default () => {
    const dispatch = useDispatch();

    const today = new Date();
    const deadline = moment(today).add(3, "days").format("MM/DD/YYYY")

    const [region, setRegion] = useState("north")
    const [date, setDate] = useState("");

    const [AA, setAA] = useState([])

    const [missionData, setMissionData] = useState({

        deliveryDate: "",
        sendingDate:  moment(today).format("YYYY-MM-DD"),
        state: 'standby',
        // agent_id: '',

    });


    const orderList = useSelector (state => state.ordersByRegion);
    const orders = orderList.ordersByRegion
    const loading = orderList.loading
    const error = orderList.error



    useEffect(() => {
        dispatch(GetOrdesrByRegion(region))

    }, [dispatch, region])

    const [ErrorDate, setErrorDate] = useState(false)

    useEffect(() => {

        if (moment(date).format("MM/DD/YYYY") >= deadline) {
            setMissionData( {
                ...missionData,
                deliveryDate: moment(date).format("YYYY-MM-DD")
            })
            setErrorDate(false)
        }  else setErrorDate(true)

    }, [date, ErrorDate])


    const [disab, setDisab] = useState(true)

    useEffect(() => {
        if (  missionData.deliveryDate !== ''
            && AA.length !== 0
        )
        {
            console.log("hedhiiii AA", AA)
            setDisab(false);

        } else {
            setDisab(true);
            console.log("hedhiiii AA", AA)
        }

    }, [missionData, AA]);


    const missionCreate = useSelector (state => state.missionCreate);
    const newMissionData =  missionCreate.mission
    const loading2 = missionCreate.loading
    const error2 = missionCreate.error

    const handleSubmit = (e) => {
        if(!disab) {
            e.preventDefault();
            dispatch(createMission(missionData));
            // AA.map(item => dispatch(affectOrderToMission(item, )))
        } else {
            console.log("ee")
        }

    }


    useEffect(() => {
        if (newMissionData)
        {
            AA.map(item => {
               dispatch (affectOrderToMission(item, {mission_id: newMissionData._id}))
                console.log("hedhi missionCreate", newMissionData._id)
            })
            dispatch(ListMissions())
        }


    }, [missionCreate])


    const [ErrorOrder, setErrorOrder] = useState(false)

    useEffect(() => {
        if ( AA.length===0) {
            setErrorOrder(true)
        } else setErrorOrder(false)
    }, [AA])


    useEffect(() => {
        if (ErrorOrder || ErrorDate || date==="" ) {
            setDisab(true)

        } else setDisab(false);

    }, [ErrorOrder, ErrorDate]);


    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-2">Add a new Mission</h5>
                <p className="mb-4">Note: Your chosen region will define which warehouse provides your products</p>
                <Form>
                    <Row>
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
                                            value={moment(date).format("MM/DD/YYYY")}
                                            placeholder="mm/dd/yyyy"
                                            onFocus={openCalendar}
                                            onChange={() => { }} />
                                        <Form.Control.Feedback type="invalid" >
                                            Date  is invalid ! Please leave an interval of two days
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                )} />
                        </Form.Group>

                    </Row>

                    <Row>
                        <Form.Group id="region">

                            <Form.Label>Region: </Form.Label>

                            <Form.Control required as="select"   defa value={region} placeholder="Region"
                                          onChange={(e) =>{ setRegion( e.target.value) }} defaultValue="north"
                            >
                                <option value="north">North</option>
                                <option value="center">Center</option>
                                <option value="south">South</option>
                            </Form.Control>

                        </Form.Group>
                    </Row>



                    <h5 className="my-4">Choose Orders</h5>

                    {orders.length !== 0 ?
                   ( <>

                   <Table hover className="user-table align-items-center p-2">
                       <thead>
                       <tr>
                           <th className="border-bottom">ID</th>
                           <th className="border-bottom">Reception Date</th>
                           <th className="border-bottom">Due Date</th>
                           <th className="border-bottom">Shop</th>

                       </tr>
                       </thead>

                       <tbody>
                       {
                        orders?.filter((row) => {
                        if (!row.mission_id && row.validated === "accepted" && (row.state === "to review" || row.state === "late" )) {
                        return row;
                    }
                    }).map((order) => (
                        <OrdersForMissionAdd key={order._id} AA={AA} setAA={setAA} order={order}/>

                        ))
                    }
                       </tbody>
                   </Table>
                       </>
                    ) : (
                        <p> no orders to show</p>
                   )
                    }

                    {   ErrorOrder &&
                    <span style={{color:"red"}}>Please select an order</span>

                    }


                    <div className="mt-4">
                        <>


                                    {disab ?  (<Button disabled variant="primary" type="submit" >Add Mission</Button>)
                                        :
                                        (  <Button variant="primary" type="submit" onClick={(e) =>  {
                                    handleSubmit(e)

                                        }}>Add Mission</Button>)}
                        </>


                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};