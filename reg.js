import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import Dashboard from "./Dashboard"

const P=({c})=>{
 const t=localStorage.getItem("t")
 return t?c:<Navigate to="/login"/>
}

export default function App(){
 return(
  <BrowserRouter>
   <Routes>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={<P c={<Dashboard/>}/>}/>
   </Routes>
  </BrowserRouter>
 )
}