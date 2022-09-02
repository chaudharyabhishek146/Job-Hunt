import React from 'react'
import { useState, useEffect } from 'react'

export default function Users() {
const [users, setUsers] = useState([]);
useEffect(() => {
  fetch('https://dummyapi.io/data/v1/user?limit=10',{
    headers:{
      'app-id':'62ee0fc617a1b63fed16a799'
      
    }
  })
  .then(res => res.json())
  .then(data => setUsers(data.data));}, [])

  return (
   <div> 
    <div className="container">
    <div className="row"> 
      {
        users.map(item => <div className="col-md-3 mt-3 ">

        <div class="card" >
  <img class="card-img-top" src={item.picture} alt="Card image cap "/>
  <div class="card-body">
    <h5 class="card-title">{item.firstName}{item.lastName}</h5>
    
  </div>
</div>
        </div>)
        }
    </div>
    </div>
    </div>
    )
}
