import React, {useEffect, useState} from 'react';
import {Card} from "@mui/material";
import moment from "moment-timezone";

const Message = ({message, own}) => {




    return (
        <>

            {own? (
                <div style={{marginRight:0, marginLeft:300,}} className="mt-2">
                <Card style={{ backgroundColor:"#b4b5b5", borderRadius:50, }}  className="m-2 p-3">

                    <span style={{color: "white"}}> {message.text}  </span>
                </Card>



            </div>
            ) : (
                <div style={{marginLeft:0, marginRight:300}} >
                    <Card style={{ backgroundColor:"#04B3AC" , borderRadius:50}} className="m-2 p-3">

                        <span className="mb-2 fw-bolder" style={{color: "white"}}> {message.text} </span>
                    </Card>

                </div>
            )}



        </>
    );
};

export default Message;