import React, { useEffect, useState } from 'react'
import apiConfig from './config';
import { Navigate, useNavigate } from 'react-router-dom';
import { useReducer } from "react";
import reducer, { initialState } from "../Components/Reducers";

export default function LogHoc(Component) {
    function NewComponent() {
        const nav = useNavigate()
        const [state, dispatch] = useReducer(reducer, initialState);
        useEffect(() => {
            fetch(`${apiConfig.authapi}/authenticate`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': localStorage.getItem('token')
                }
            }).then(res => res.json()).then(data => {
                if (data.status === 200) {
                    // console.log("HHHHHHHHHHHHHHHHHH")
                    // console.log("returning component")
                    // console.log("setting verification")
                    // localStorage.setItem("verification", true)
                    nav("/")
                }
                else {
                    //  localStorage.setItem("verification", false)
                    // dispatch({ type: 'LOGOUT' })
                    // localStorage.clear()
                   
                   
                    return (<Component />)


                    // console.log("Passport verif failed")
                    // if (localStorage.getItem("type") !== null && localStorage.getItem("type") === "google") {
                    //     fetch(`${apiConfig.authapi}/authenticategoogle/${localStorage.getItem('id')}`, {
                    //         method: "POST",
                    //         headers: {
                    //             'Content-Type': "application/json"
                    //         }
                    //     }).then(data=>data.json()).then(data=>{
                    //         if(data.status===200){
                    //             localStorage.setItem("verification",true)
                    //             return (<Component />)
                    //         }
                    //     })
                    // }
                    // else {
                    //     localStorage.setItem("verification", false)
                    //     dispatch({ type: 'LOGOUT' })
                    //     localStorage.clear()
                    //     nav("/login")
                    // }
                }
            })
        }, []);
        return <Component />;
    }
    return NewComponent;
}


