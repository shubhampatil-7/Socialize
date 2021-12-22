import "./closeFriend.css"

export default function CloseFriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
            <li className="sidebarFriend">
                <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="person img" />
                <span className="sidebarFriendName">{user.username}</span>
            </li>
        </div>
    )
}
