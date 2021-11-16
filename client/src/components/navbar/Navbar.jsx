import './navbar.css'
import Notification from '../../img/notification.svg'
import Message from '../../img/message.svg'
import Settings from '../../img/settings.svg'
import { useState, useEffect } from 'react'
const Navbar = ({socket}) => {
    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false)

    const handleRead = ()=>{
        setNotifications([])
        setOpen(false)
    }

    useEffect(()=>{
        socket.on("getNotification", (data)=>{
            setNotifications((prev)=> [...prev, data])
        })
    },[socket])
   
    console.log(notifications);
    const displayNotifications = ({ senderName, type })=>{
        let action;
        if(type === 1){
            action = "liked"
        }else if(type === 2){
            action = "commented"
        }else{
            action = "shared"
        }

        return(
            <span className="notification">{`${senderName} ${action} your post`}</span>
        )
    }

    return (
        <div className="navbar">
            <span className="logo">Kwesi App</span>
            <div className="icons">
                <div className="icon" onClick={()=>setOpen(!open)}>
                    <img src={Notification} alt="" className="iconImg"/>
                    {
                        notifications.length > 0 && <div className="counter">{notifications.length}</div>
                    }
                </div>
                <div className="icon">
                    <img src={Message} alt="" className="iconImg"/>
                </div>
                <div className="icon">
                    <img src={Settings} alt="" className="iconImg"/>
                </div>
            </div>
            {open && 
                <div className="notifications">
                    {notifications.map((n)=> displayNotifications(n))}
                    <button className="nbtn" onClick={handleRead}>Mark as read</button>
                </div>
            }
        </div>
    )
}

export default Navbar
