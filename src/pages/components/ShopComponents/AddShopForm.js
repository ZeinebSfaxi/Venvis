import {Button, Card, Col, Form, Row} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createShop, listShops} from "../../../actions/shopAction";
import {Box, CircularProgress} from "@mui/material";
import {Alert} from "@mui/lab";

export default () => {
    const dispatch = useDispatch();
    const [shopData, setShopData] = useState({
        name: '',
        latitude: '',
        longitude: '',
        country: '',
        city: '',
        streetName:'' ,
        streetNumber: '',
        phoneNumber: '',
        zipcode: '',
        image:''

    });
    const shopCreate = useSelector (state => state.shopCreate);
    const loading = shopCreate.loading
    const error = shopCreate.error
    const handleSubmit = () => {
                dispatch(createShop(shopData));
    }

    useEffect(()=> {
        if (loading === false) {
            dispatch(listShops());
        }
    },[loading])

// Cloudinary API to get the url of the image *******************
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
            setShopData({ ...shopData, image: url });

        }
        if (shopData.image ) {
            setUrl('');
            console.log('shop:', shopData);
            dispatch(createShop(shopData));

            setShopData({...shopData,  name: '',
                latitude: '',
                longitude: '',
                country: '',
                city: '',
                streetName:'' ,
                streetNumber: '',
                phoneNumber: '',
                zipcode: '',
                image:'', })

        }

    }, [url, shopData, dispatch]);

    // Form validation
    const [errorAll, setErrorAll] = useState(false)
    const [errorName, setErrorName] = useState(false)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false)
    const [errorStreetName, setErrorStreetName] = useState(false)
    const [errorStreetNumber, setErrorStreetNumber] = useState(false)
    const [errorCity, setErrorCity] = useState(false)
    const [errorCountry, setErrorCountry] = useState(false)
    const [errorZip, setErrorZip] = useState(false)
    const [errorImage, setErrorImage] = useState(false)
    const [disab, setDisab] = useState(true)

    useEffect(() => {
        if (shopData.name !== ''
            && shopData.streetName !== ''
            && shopData.streetNumber !== ''
            && shopData.city !== ''
            && shopData.country !== ''
            && shopData.zipcode !== ''
            && shopData.phoneNumber.length === 8
            // && shopData.image !== ''
        )
        {
            setDisab(false);

        } else setDisab(true);

    }, [shopData]);



    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add a new Shop</h5>
                <Form>
                    <Row>
                        <Form.Group id="firstName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control required type="text" placeholder="Enter shop name"
                                          isInvalid={errorName}
                                          value={shopData.name}
                                          onChange={(e) => {
                                              setShopData({
                                                  ...shopData,
                                                  name: e.target.value
                                              })
                                              if (e.target.value.length === 0 ||/^\d+$/.test(e.target.value)) {
                                                  setErrorName(true);
                                              } else setErrorName(false);
                                          }}/>
                            <Form.Control.Feedback type="invalid" >
                                Name is invalid !
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>

                        <Form.Group id="phone">
                            <Form.Label>Phone Number:</Form.Label>
                            <Form.Control required type="number" placeholder="+216 89 456 123"
                                          isInvalid={errorPhoneNumber}
                                          value={shopData.phoneNumber}
                                          onChange={(e) => {setShopData({
                                              ...shopData,
                                              phoneNumber: e.target.value
                                          })
                                              if (e.target.value.length !== 8) {
                                                  setErrorPhoneNumber(true);
                                              } else setErrorPhoneNumber(false);
                                          }}/>
                            <Form.Control.Feedback type="invalid" >
                                Phone number is invalid !
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group id="image">
                            <Form.Label>Image:</Form.Label>
                            <Form.Control type="file"
                                          isInvalid={errorImage}
                                           onChange={(e) => {
                                               setPhoto(e.target.files[0]) }
                                           }                        />
                            <Form.Control.Feedback type="invalid" >
                                Please select an image for your shop !
                            </Form.Control.Feedback>

                        </Form.Group>

                    </Row>

                    <h5 className="my-4">Address</h5>
                    <Row>
                        <Col sm={9} className="mb-3">
                            <Form.Group id="address">
                                <Form.Label>Street Name:</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your shop's street name"
                                              isInvalid={errorStreetName}
                                              value={shopData.streetName}
                                              onChange={(e) => {setShopData({
                                                  ...shopData,
                                                  streetName: e.target.value
                                              })
                                                  if (e.target.value.length === 0 ) {
                                                      setErrorStreetName(true);
                                                  } else setErrorStreetName(false);
                                              }}
                                />
                                <Form.Control.Feedback type="invalid" >
                                    Street name is invalid !
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col sm={3} className="mb-3">
                            <Form.Group id="addressNumber">
                                <Form.Label>No.</Form.Label>
                                <Form.Control required type="number" placeholder="No."  value={shopData.streetNumber}
                                              isInvalid={errorStreetNumber}
                                              onChange={(e) =>{ setShopData({
                                                  ...shopData,
                                                  streetNumber: e.target.value
                                              })
                                                  if (e.target.value.length === 0 ) {
                                                  setErrorStreetNumber(true);
                                              } else setErrorStreetNumber(false);
                                              }}
                                />
                                <Form.Control.Feedback type="invalid" >
                                    Street Number is invalid !
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        {/*dropdown countries*/}
                        <Col sm={4} className="mb-3">
                            <Form.Group id="country">
                                <Form.Label>Country:</Form.Label>
                                <Form.Control required type="text" placeholder="Country"  value={shopData.country}
                                              isInvalid={errorCountry}
                                              onChange={(e) =>{ setShopData({
                                                  ...shopData,
                                                  country: e.target.value
                                              })
                                                  if (e.target.value.length === 0  ||/^\d+$/.test(e.target.value) ) {
                                                      setErrorCountry(true);
                                                  } else setErrorCountry(false);
                                              }}

                                />
                                <Form.Control.Feedback type="invalid" >
                                    Country is invalid !
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mb-3">

                            <Form.Group id="city">
                                <Form.Label>City:</Form.Label>
                                <Form.Control required type="text" placeholder="City"  value={shopData.city}
                                              isInvalid={errorCity}
                                              onChange={(e) =>{ setShopData({
                                                  ...shopData,
                                                  city: e.target.value
                                              })
                                                  if (e.target.value.length === 0  ||/^\d+$/.test(e.target.value)) {
                                                  setErrorCity(true);
                                              } else setErrorCity(false);
                                              }}
                                />
                                <Form.Control.Feedback type="invalid" >
                                   City is invalid !
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group id="zip">
                                <Form.Label>ZIP:</Form.Label>
                                <Form.Control required type="number" placeholder="ZIP"  value={shopData.zipcode}
                                              isInvalid={errorZip}
                                              onChange={(e) => { setShopData({
                                                  ...shopData,
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



                    <div className="mt-3">
                        <>
                        { loading ? (
                            <Box className="m-5" sx={{ display: 'flex',alignItems: 'center',
                                justifyContent: 'center',  }} >
                                <CircularProgress style={{color:"#323854"}} />
                            </Box>
                        ) : error ? (

                            <Alert className="m-2" sx={{ width: '100%' }} variant="filled" severity="error">
                            Ay ay ay! looks like you have network problems :(
                            <ul>
                            <li> try reloading your page </li>
                            <li>  try checking your internet connection</li>
                            </ul>
                        {"\n"} <strong>Error: {error} </strong>
                            </Alert>

                        ) : (
                                <>
                             {disab ?  (<Button disabled variant="primary" type="submit" >Add Shop</Button>)
                                :
                              (  <Button variant="primary" type="submit" onClick={(e) =>  {
                                  if (photo) { e.preventDefault();
                                      setTheImageToURL();
                                      }
                                 else {
                                     e.preventDefault();
                                     handleSubmit();
                                  }

                                }}>Add Shop</Button>)} </>
                            ) }
                        </>


                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};