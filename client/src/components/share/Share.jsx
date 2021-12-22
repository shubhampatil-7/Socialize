import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from "react";
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"

export default function Share() {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async(e) =>{
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name
            data.append("file", file)
            data.append("name", fileName)
            newPost.img = fileName;
            try{
                await axios.post("upload", data)
            }catch(error){
                console.log(error)
            }
        }

        try {
            await  axios.post("posts",newPost)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
               <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" />
                    <input placeholder={"What's on your Mind "+ user.username+ "?"} className="shareInput" ref={desc}/>
                </div> 
                <hr className="shareHr" />
               <form className="shareBottom" onSubmit={submitHandler}>
                   <label htmlFor="file" className="shareOptions">
                       <PermMediaIcon htmlColor="tomato" className="ShareIcon"/>
                       <span className="shareOptionText">Photo or Video</span>
                       <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={((e) =>setFile(e.target.files[0]))}/>
                   </label>
                   <div className="shareOptions">
                       <LabelIcon htmlColor="blue" className="ShareIcon"/>
                       <span className="shareOptionText">Tag</span>
                   </div>
                   <div className="shareOptions">
                       <RoomIcon htmlColor="green" className="ShareIcon"/>
                       <span className="shareOptionText">Location</span>
                   </div>
                   <div className="shareOptions">
                       <EmojiEmotionsIcon htmlColor="goldenrod" className="ShareIcon"/>
                       <span className="shareOptionText">Feelings</span>
                   </div>
                   <button className="shareButton" type="submit">
                       Share
                   </button>
               </form>
            </div>
        </div>
    )
}
