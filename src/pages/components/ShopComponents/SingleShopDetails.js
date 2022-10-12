import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {  Divider, Typography} from "@mui/material";
import {Button, Col, Form, Row} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit} from "@fortawesome/free-regular-svg-icons";
import {createShop, updateShop} from "../../../actions/shopAction";
import {useDispatch} from "react-redux";
import {faUpload, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {useKeycloak} from "@react-keycloak/web";


export default ({shop}) => {

    // display data
    const [data, setData] = useState({
        _id: "",
        name:"",
        streetName: "",
        streetNumber: "",
        city:"",
        phoneNumber: "",
        country: "Tunisia",
        latitude:"",
        longitude:"",
        zipcode:"",
        image: ""
    })

    useEffect(() => {
        if(!data.name) {
            setData({
                _id:  shop._id,
                name: shop.name,
                streetName: shop.streetName,
                streetNumber: shop.streetNumber,
                city: shop.city,
                phoneNumber: shop.phoneNumber,
                country: shop.country,
                zipcode: shop.zipcode,

            })
        }
    })

    // edit
    const [editable, setEditable] = useState(false)
    const dispatch = useDispatch()
    const edit = () => {
      if (data._id) {
          dispatch (updateShop(data._id, data))
          window.location.reload();
      }
    };


    // Form validation
    const [errorAll, setErrorAll] = useState(false)
    const [errorName, setErrorName] = useState(false)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false)
    const [errorStreetName, setErrorStreetName] = useState(false)
    const [errorStreetNumber, setErrorStreetNumber] = useState(false)
    const [errorCity, setErrorCity] = useState(false)
    const [errorCountry, setErrorCountry] = useState(false)
    const [errorZip, setErrorZip] = useState(false)
    const [disab, setDisab] = useState(true)

    useEffect(() => {
        if (errorName
            || errorPhoneNumber
            || errorStreetName
            || errorStreetNumber
            || errorCountry
            || errorZip)
        {
            setDisab(true);

        } else setDisab(false);

    }, [errorName, errorPhoneNumber, errorStreetName, errorStreetNumber,  errorCountry , errorZip]);

    //cloudinary
    const [url, setUrl] = useState('');
    const [photo, setPhoto] = useState();

    const setTheImageToURL =  () => {
        const data = new FormData();
        data.append("file", photo);
        data.append('upload_preset', 'inetum_sales_force');
        data.append('cloud_name', 'duca2eu6g');

        fetch('https://api.cloudinary.com/v1_1/duca2eu6g/image/upload', {
            method: 'post',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url);
                console.log ("haaaaaaaaaaaaaa333", url)
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (url) {
            setData({ ...data, image: url });

        }
        if (data.image ) {
            setUrl('');
            console.log('shop:', data);
            dispatch(updateShop(data._id, data));

        }

    }, [url, data, dispatch]);


    const keycloak = useKeycloak();
    const userId = keycloak.keycloak.subject;


    return (
        <>

        {editable? (
            <Card border="light" className="bg-white shadow-lg mb-4">
                <CardContent>
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col className="col-auto">
                            <h5 className="mb-4" style={{color:"#4974a5"}} >Shop: PVC-{data._id.slice(data._id.length -5, data._id.length).toUpperCase()}</h5>
                        </Col>
                        <Col className="col-auto">
                            {disab?  <Button  disabled variant="secondary" size="sm" className="me-2" >
                                <FontAwesomeIcon icon={faCheckCircle} className="me-1" /> Save
                            </Button>:
                                <Button  variant="secondary" size="sm" className="me-2" onClick={(e) => {
                                    e.preventDefault();
                                    setEditable(!editable);
                                    edit();
                                    // console.log("houniii dispatchi el update")
                                }}>
                                    <FontAwesomeIcon icon={faCheckCircle} className="me-1" /> Save
                                </Button>
                            }


                        </Col>
                    </Row>
                    <Form>
                        <Row>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                            <Form.Label> <Typography style={{color:"#04B3AC"}}>Name: </Typography></Form.Label>
                                            <Form.Control required type="text" placeholder="Enter shop name"
                                                          isInvalid={errorName}
                                                          value={data.name}
                                                          onChange={(e) => {setData({
                                                              ...data,
                                                              name: e.target.value
                                                          })
                                                              if (e.target.value.length === 0 ||/^\d+$/.test(e.target.value)) {
                                                              setErrorName(true);
                                                          } else setErrorName(false);
                                                          }}
                                            />
                                    <Form.Control.Feedback type="invalid" >
                                        Name is invalid !
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">

                                            <Form.Label> <Typography style={{color:"#04B3AC"}}>Phone: </Typography></Form.Label>
                                            <Form.Control required type="number" placeholder="Enter shop number"
                                                          isInvalid={errorPhoneNumber}
                                                          value={data.phoneNumber}
                                                          onChange={(e) => {setData({
                                                              ...data,
                                                              phoneNumber: e.target.value
                                                          })
                                                              if (e.target.value.length !== 8 ) {
                                                              setErrorPhoneNumber(true);
                                                          } else setErrorPhoneNumber(false);
                                                          }}
                                            />
                                    <Form.Control.Feedback type="invalid" >
                                        Phone number is invalid !
                                    </Form.Control.Feedback>

                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                            <Form.Group id="image">
                                <Form.Label>Image:</Form.Label>
                                <Form.Control type="file"

                                              onChange={(e) => {
                                                  setPhoto(e.target.files[0]) }
                                              }                        />
                                <Form.Control.Feedback type="invalid" >
                                    Please select an image for your shop !
                                </Form.Control.Feedback>

                            </Form.Group>
                            </Col>
                            <Col md={6} className="mt-3 mb-3">
                                {!data.image &&
                                <Button  variant="secondary" size="sm" className="me-2" onClick={(e) => {
                                    e.preventDefault();
                                   setTheImageToURL();
                                    // console.log("houniii dispatchi el update")
                                }}>

                                    <FontAwesomeIcon icon={faUpload} className="me-1" /> upload
                                </Button>
                                }
                            </Col>

                        </Row>

                        <Divider className="m-3"/>

                        <h5 className="my-4"  style={{color:"#4974a5"}}>Address</h5>

                        <Row>
                            <Col sm={9} className="mb-3">

                                <Form.Group id="address">
                                            <Form.Label> <Typography style={{color:"#04B3AC"}}>Street: </Typography></Form.Label>
                                            <Form.Control required type="text" placeholder="Enter your shop's street name"
                                                          isInvalid={errorStreetName}
                                                          value={data.streetName}
                                                          onChange={(e) => {setData({
                                                              ...data,
                                                              streetName: e.target.value
                                                          })
                                                              if (e.target.value.length === 0 ) {
                                                                  setErrorStreetName(true);
                                                              } else setErrorStreetNumber(false);
                                                          }}
                                            />
                                    <Form.Control.Feedback type="invalid" >
                                        Street name is invalid !
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col sm={3} className="mb-3">
                                <Form.Group id="addressNumber">

                                            <Form.Label><Typography style={{color:"#04B3AC"}}>No. </Typography></Form.Label>
                                            <Form.Control required type="number" placeholder="No."
                                                          isInvalid={errorStreetNumber}
                                                          value={data.streetNumber}
                                                          onChange={(e) => {setData({
                                                              ...data,
                                                              streetNumber: e.target.value
                                                          })
                                                              if (e.target.value.length === 0 ) {
                                                                  setErrorStreetNumber(true);
                                                              } else setErrorStreetNumber(false);
                                                          }}
                                            />
                                    <Form.Control.Feedback type="invalid" >
                                        Street number is invalid !
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            {/*dropdown countries*/}
                            <Col sm={4} className="mb-3">
                                <Form.Group id="country">

                                            <Form.Label><Typography style={{color:"#04B3AC"}}>Country: </Typography></Form.Label>

                                            <Form.Control required as="select"   defaultValue={data.country}  value={data.country} placeholder="Country"
                                                          isInvalid={errorCountry}
                                            >
                                                <option value="Tunisia">Tunisia</option>
                                            </Form.Control>
                                    <Form.Control.Feedback type="invalid" >
                                        Country is invalid !
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col sm={4} className="mb-3">

                                <Form.Group id="city">
                                    <Form.Label><Typography style={{color:"#04B3AC"}}>City: </Typography></Form.Label>
                                    <Form.Control required as="select" placeholder="City" defaultValue={data.city}  value={data.city}

                                                  onChange={(e) =>{ setData({
                                                      ...data,
                                                      city: e.target.value
                                                  }) }}
                                    >
                                        <option value="Tunis">Tunis</option>
                                        <option value="Bizerte">Bizerte</option>
                                        <option value="Ariana">Ariana</option>
                                        <option value="Manouba">Manouba</option>
                                        <option value="Ben Arous">Ben Arous</option>
                                        <option value="Zaghouan">Zaghouan</option>
                                        <option value="Nabeul">Nabeul</option>
                                        <option value="Siliana">Siliana</option>
                                        <option value="Beja">Beja</option>
                                        <option value="Jendouba">Jendouba</option>
                                        <option value="Kef">Kef</option>
                                        <option value="Sousse">Sousse</option>
                                        <option value="Monastir">Monastir</option>
                                        <option value="Mahdia">Mahdia</option>
                                        <option value="Kairouan">Kairouan</option>
                                        <option value="Kaisserine">Kaisserine</option>
                                        <option value="Sidi Bouzid">Sidi Bouzid</option>
                                        <option value="Sfax">Sfax</option>
                                        <option value="Gabes">Gabes</option>
                                        <option value="Medenine">Medenine</option>
                                        <option value="Tataouine">Tataouine</option>
                                        <option value="Gafsa">Gafsa</option>
                                        <option value="Tozeur">Tozeur</option>
                                        <option value="Kebili">Kebili</option>

                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" >
                                        City is invalid !
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Col>
                            <Col sm={4}>
                                <Form.Group id="zip">

                                            <Form.Label><Typography style={{color:"#04B3AC"}}>ZIP: </Typography></Form.Label>

                                            <Form.Control required type="tel" placeholder="ZIP"
                                                          isInvalid={errorZip}
                                                          value={data.zipcode}
                                                          onChange={(e) =>{ setData({
                                                              ...data,
                                                              zipcode: e.target.value
                                                          })
                                                              if (e.target.value.length === 0 ) {
                                                              setErrorZip(true);
                                                          } else setErrorZip(false);
                                                          }}
                                            />
                                    <Form.Control.Feedback type="invalid" >
                                        Zipcode is invalid !
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>

                </CardContent>

            </Card>

            ) : (

            <Card border="light" className="bg-white shadow-soft mb-4">

                <CardContent>
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col className="col-auto">
                            <h5 className="mb-4" style={{color:"#4974a5"}} >Shop: PVC-{data._id.slice(data._id.length -5, data._id.length).toUpperCase()}</h5>
                        </Col>
                        {userId === "032f27f2-22f4-436a-b697-b02c710ec22e" &&
                        <Col className="col-auto">

                                <Button variant="primary" size="sm"  className="me-2"  onClick={() => {
                                    setEditable(true)
                                }}>
                                    <FontAwesomeIcon icon={faEdit} className="me-1" /> Edit
                                </Button>

                        </Col> }
                    </Row>
                    <Form>
                        <Row>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                            <Form.Label> <Typography style={{color:"#4974a5"}}>Name: </Typography></Form.Label>
                                            <Form.Control required type="text" placeholder="Enter shop name"
                                                          value={data.name}
                                                          disabled
                                            />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                            <Form.Label><Typography style={{color:"#4974a5"}}>Phone: </Typography></Form.Label>
                                            <Form.Control required type="text" placeholder="Enter shop number"
                                                          value={data.phoneNumber}
                                                          disabled
                                            />

                                </Form.Group>
                            </Col>

                        </Row>
                        <Divider className="m-3"/>

                        <h5 className="my-4"  style={{color:"#4974a5"}}>Address</h5>

                        <Row>
                            <Col sm={9} className="mb-3">

                                <Form.Group id="address">

                                            <Form.Label><Typography style={{color:"#4974a5"}}>Street: </Typography> </Form.Label>
                                            <Form.Control required type="text" placeholder="Enter shop name"
                                                          value={data.streetName}
                                                          disabled
                                            />
                                </Form.Group>
                            </Col>
                            <Col sm={3} className="mb-3">
                                <Form.Group id="addressNumber">


                                        <Form.Label><Typography style={{color:"#4974a5"}}>No. </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"
                                                      value={data.streetNumber}
                                                      disabled
                                        />

                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            {/*dropdown countries*/}
                            <Col sm={4} className="mb-3">
                                <Form.Group id="country">

                                   <Form.Label><Typography style={{color:"#4974a5"}}>Country: </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"
                                                      value={data.country}
                                                      disabled
                                        />
                                </Form.Group>
                            </Col>
                            <Col sm={4} className="mb-3">

                                <Form.Group id="city">


                                        <Form.Label><Typography style={{color:"#4974a5"}}>City: </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"
                                                      value={data.city}
                                                      disabled
                                        />

                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group id="zip">


                                        <Form.Label><Typography style={{color:"#4974a5"}}>ZIP: </Typography></Form.Label>
                                        <Form.Control required type="text" placeholder="Enter shop name"

                                                      value={data.zipcode}
                                                      disabled
                                        />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>

                </CardContent>

            </Card>
            )}
            </>

    );
};