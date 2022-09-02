import apiconfig from './config'
import { useState } from 'react'
// import { Experimental_CssVarsProvider } from '@mui/material'
// import { authenticated } from './Actiontype'
// import { notauthenticated } from './Actiontype'

// const [initialState, setinitialState] = useState(false)


// const login = async () => {
//     var initialState = false;
//     await fetch(`${apiconfig.authapi}/authenticate`, {
//         method: "POST",
//         headers: {
//             'Content-Type': "application/json",
//             'Authorization': localStorage.getItem('token')
//         }
//     }).then(
//         data => data.json()
//     ).then(data => {
//         console.log("data", data.isAuthenticated)
//         initialState = data.isAuthenticated
//     }
//     )
// }
// var initialState = false
var v = localStorage.getItem("verification")
var initialState = false

if (v != "false") {
    initialState = true
}


 //console.log(v=="false")
// console.log("initial state ", initialState)
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            state = true;
            return state;
        }
        case 'LOGOUT': {
            state = false;
            return state;
        }

    }
}

export { initialState };
export default reducer;
