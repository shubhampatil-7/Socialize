import "./online.css"

export default function online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
            <li className="rightbarFriend">
                       <div className="rightbarProfileImgContainer">
                           <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
                           <span className="rightbarOnline"></span>
                       </div>
                       <span className="righbarUsername">{user.username}</span>
                   </li>
        </div>
    )
}
