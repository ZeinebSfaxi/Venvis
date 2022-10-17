
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faCalendar,
  faCashRegister,
  faChartLine, faCheck, faCheckCircle,
  faCloudUploadAlt,
  faDesktop, faGlasses, faMapPin, faMarker,
  faPlus,
  faRocket, faTags,
  faTasks, faTruck, faUserSecret,
  faUserShield
} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import {
  CounterWidget,
  BarChartWidget,
  TeamMembersWidget,
  ProgressTrackWidget,
  RankingWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
  AcquisitionWidget,
  SalesValueWidgetMissions,
  SalesValueWidgetMissionsPhone,
  CircleChartOrdersWidget,
  CircleChartMissionWidget,
  CircleChartShopsnWidget, CounterWidgetProducts
} from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import {useDispatch, useSelector} from "react-redux";
import {ListOrder, OrderNumberByMonth} from "../../actions/orderAction";
import moment from "moment-timezone";
import {ListMissions, MissionNumberByMonth} from "../../actions/missionAction";
import "./chartColor.css";
import {listShops} from "../../actions/shopAction";
import {listManagers} from "../../actions/shopManagerAction";
import {listAgents} from "../../actions/agentAction";
import {listCompetitors} from "../../actions/competitorAction";
import {products} from "../../data/products"
import {listSavs, SAVNumberByMonth} from "../../actions/savAction";

export default () => {

  //display managers
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(OrderNumberByMonth())

  }, [dispatch])

  const orderNumbers = useSelector (state => state.orderNumber);
  const orders = orderNumbers.orderNumber

  useEffect(() => {
    dispatch(SAVNumberByMonth())

  }, [dispatch])

  const savNumbers = useSelector (state => state.SAVNumber);
  const savs = savNumbers.savNumber

  useEffect(() => {
    dispatch(ListOrder())

  }, [dispatch])

  const orderList = useSelector (state => state.orderList);
  const ordersList = orderList.orders


  useEffect(() => {
    dispatch(ListOrder())

  }, [dispatch])

  const missionList = useSelector (state => state.missionList);
  const missionsList = missionList.missions

  useEffect(() => {
    dispatch(ListMissions())

  }, [dispatch])

  useEffect(() => {
    dispatch(MissionNumberByMonth())

  }, [dispatch])

  const missionNumbers = useSelector (state => state.missionNumber);
  const missions = missionNumbers.missionNumber

  const [arrOrder, setArrOrder] = useState([]);
  const [arrMission, setArrMission] = useState([]);
  const [arrShops, setArrShops] = useState([]);
  const [arrSav, setArrSav] = useState([]);


  const shopList = useSelector (state => state.shopList);
  const shopsList = shopList.shops

  useEffect(() => {
    dispatch(listShops())

  }, [dispatch])


  const managerList = useSelector (state => state.managerList);
  const managers = managerList.managers

  useEffect(() => {
    dispatch(listManagers())

  }, [dispatch])

  const agentList = useSelector (state => state.agentList);
  const agents = agentList.agents

  useEffect(()=> {

    dispatch(listAgents())

  }, [dispatch])

  const competitorList = useSelector (state => state.competitorList);
  const competitor = competitorList.competitors
  useEffect(()=> {

    dispatch(listCompetitors())

  }, [dispatch])


  const recList = useSelector (state => state.reclamationList);
  const recs = recList.reclamations

  useEffect(() => {
    dispatch(listSavs())

  }, [dispatch])

  useEffect(()=> {
  setArrOrder([
     { id: 1, label: "Delivered", value: ordersList.filter((o)=>o.state === "delivered").length, color: "#1b998b",  icon: faCheckCircle },
    { id: 6, label: "To review", value: ordersList.filter((o)=>o.state === "to review").length, color: "#17a5ce", icon: faGlasses },
    { id: 2, label: "Late", value: ordersList.filter((o)=>o.state === "late").length, color: "#262b40", icon: faCalendar },
    { id: 3, label: "On going", value: ordersList.filter((o)=>o.state === "on going").length, color: "#f5b759", icon: faTruck },
    { id: 4, label: "Rejected", value: ordersList.filter((o)=>o.state === "rejected").length, color: "#c96480", icon: faBan },
      ]
  )
}, [ordersList])

  useEffect(()=> {
    setArrMission([
          { id: 1, label: "Delivered", value: missionsList.filter((o)=>o.state === "delivered").length, color: "#1b998b",  icon: faCheckCircle },
          { id: 6, label: "To review", value: missionsList.filter((o)=>o.state === "standby").length, color: "#17a5ce", icon: faGlasses },
          { id: 2, label: "Late", value: missionsList.filter((o)=>o.state === "late").length, color: "#262b40", icon: faCalendar },
          { id: 3, label: "On going", value: missionsList.filter((o)=>o.state === "on going").length, color: "#f5b759", icon: faTruck },
          { id: 4, label: "Confirmed", value: missionsList.filter((o)=>o.state === "confirmed").length, color: "#c96480", icon: faCheck },
        ]
    )
  }, [missionsList])

  useEffect(()=> {
    setArrShops([
          { id: 1, label: "north", value: shopsList.filter((o)=>o.region === "north").length, color: "#1b998b",  icon: faMapPin },
          { id: 2, label: "center", value: shopsList.filter((o)=>o.region === "center").length, color: "#17a5ce", icon: faMapPin },
          { id: 3, label: "south", value: shopsList.filter((o)=>o.region === "south").length, color: "#262b40", icon: faMapPin },
        ]
    )
  }, [shopsList])

  useEffect(()=> {
    setArrSav([
          { id: 1, label: "north", value: recs.filter((o)=>o.state === "north").length, color: "#1b998b",  icon: faMapPin },
          { id: 2, label: "center", value: shopsList.filter((o)=>o.region === "center").length, color: "#17a5ce", icon: faMapPin },
          { id: 3, label: "south", value: shopsList.filter((o)=>o.region === "south").length, color: "#262b40", icon: faMapPin },
        ]
    )
  }, [shopsList])

  return (
    <>
      

      <Row   className="justify-content-md-center">
        <Col xs={6} className="mb-4 mt-5 d-none d-sm-block">
          <SalesValueWidget
            title="Orders received this year"
            value={ordersList?.length}
            percentage={10.57}
            orders={orders}
          />
        </Col>
        <Col xs={6} className="mb-4 mt-5 d-none d-sm-block">
          <SalesValueWidgetMissions
              title="Missions created this year"
              value={missionsList?.length}
              percentage={10.57}
              missions={missions}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
              title="Orders received this year"
              value={ordersList?.length}
              orders={orders}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <div >
          <SalesValueWidgetMissionsPhone
              title="Missions created this year"
              value={missionsList?.length}
              missions={missions}
          />
          </div>
        </Col>


        <Col xs={12} sm={6} xl={4} className="mb-4">

          <CircleChartOrdersWidget
              title="Orders Status"
              data={arrOrder}
              ordersList={ordersList}/>

        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartMissionWidget
              title="Mission Status"
              data={arrMission}
            missionsList={missionsList}/>
        </Col>



        <Col xs={12} sm={6} xl={4} className="mb-4">

          <CircleChartShopsnWidget
            title="Shops Regions"
            data={arrShops}
          shopsList={shopsList}/>

        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              {/*<div  className="mb-4">*/}
              {/*<CircleChartWidget*/}
              {/*    title="Traffic Share"*/}
              {/*    data={trafficShares} />*/}
              {/*</div>*/}
              <Col xs={12}  className="mb-4">
                <CounterWidgetProducts
                    category="Customers"
                    title="345k"
                    period="Feb 1 - Apr 1"
                    percentage={18.2}
                    icon={faTags}
                    iconColor="shape-secondary"
                    products={products}
                />
              </Col>

              <Col xs={12}  className="mb-4">
                <CounterWidget
                    category="Revenue"
                    title="$43,594"
                    period="Feb 1 - Apr 1"
                    percentage={28.4}
                    comp
                    icon={faUserSecret}
                    iconColor="shape-tertiary"
                    competitor={competitor}
                />
              </Col>
              <div  className="mb-4">
                <AcquisitionWidget
                    title="Traffic Share"
                    managers={managers}
                  agents={agents}/>
              </div>

            </Col>

                <Col xs={8}  className="mb-4">
                  <BarChartWidget
                    title="Customer service complaints"
                    value={recs?.length}
                    // percentage={18.2}
                    data={totalOrders}
                    savs = {savs}
                  />
                </Col>




          </Row>
        </Col>
      </Row>
    </>
  );
};
