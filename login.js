import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function Login(){
 const [e,setE]=useState("")
 const [p,setP]=useState("")
 const nav=useNavigate()

 const s=async(x)=>{
  x.preventDefault()
  const r=await axios.post("http://localhost:5000/login",{email:e,password:p})
  localStorage.setItem("t",r.data.token)
  nav("/dashboard")
 }

 return(
  <form onSubmit={s}>
   <input onChange={x=>setE(x.target.value)}/>
   <input onChange={x=>setP(x.target.value)}/>
   <button>Login</button>
  </form>
 )
}