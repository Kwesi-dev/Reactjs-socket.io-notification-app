import './App.css' 
import { useState, useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import Card from './components/card/Card'
import { data } from './data'
import { io } from "socket.io-client"

const App = () =>{
    const [username, setUsername] = useState("")
    const [user, setUser] = useState("")
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        setSocket(io("http://localhost:5000"))
    }, [])

    useEffect(()=>{
        socket?.emit("newUser", user)
    },[socket, user])
    return(
        <div className="app">
            {user ? (
                <div className="container">
                    <Navbar socket={socket}/>
                    {data.map((data)=>
                        <Card key={data.id} data={data} socket={socket} user={user}/>
                    )}
                    <span className="username">{username}</span>
                </div>
            ):(
            <div className="login">
                <input type="text" placeholder="username" onChange={e=>setUsername(e.target.value)}/>
                <button onClick={()=>setUser(username)}>login</button>
            </div>
            )}
        </div>
    )
}
export default App
