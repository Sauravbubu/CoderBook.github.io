import React from 'react'
import {Route,Routes} from "react-router-dom"
import Account from '../Account'
import Addquestion from '../Addquestion'
import Completed from '../Completed'
import Home from '../Home'
import OwnStore from '../OwnStore'



const AllRoutes = () => {

    
  return (
    <Routes>
    <Route path="/" element={<Home/>} />
    {/* <Route path="/home"     element={<Home/>} /> */}
<Route path='/bookmarked' element={<Account/>} />
<Route path='/addquestion' element={<Addquestion/>}  />
<Route path='/ownstore' element={<OwnStore/>} />
<Route path="/completed" element={<Completed/>} />
    </Routes>
  )
}

export default AllRoutes

