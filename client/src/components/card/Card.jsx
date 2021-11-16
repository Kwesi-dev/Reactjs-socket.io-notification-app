import './card.css'
import Heart from '../../img/heart.svg'
import HeartFilled from '../../img/heartFilled.svg'
import Comment from '../../img/comment.svg'
import Share from '../../img/share.svg'
import Info from '../../img/info.svg'
import { useState } from 'react'

const Card = ({ data, socket, user }) => {
    const [liked, setLiked] = useState(false)
    const handleNotification = (type)=>{
        setLiked(true)
        socket.emit("sendNotification", {
            senderName: user,
            receiverName: data.username,
            type,
        })
    }
    return (
        <div className="card">
            <div className="info">
                <img src={data.userImg} alt="" className="userImg"/>
                <span>{data.fullname}</span>
            </div>
            <img src={data.postImg} alt="" className="postImg"/>
            <div className="interactions">
                {liked ? 
                <img src={HeartFilled} alt="" className="cardIcon"/> :
                <img src={Heart} alt="" className="cardIcon" onClick={()=>handleNotification(1)}/> 
                }
                <img src={Comment} alt="" className="cardIcon" onClick={()=>handleNotification(2)}/>
                <img src={Share} alt="" className="cardIcon" onClick={()=>handleNotification(3)}/>
                <img src={Info} alt="" className="cardIcon infoIcon" />
            </div>
        </div>
    )
}

export default Card
