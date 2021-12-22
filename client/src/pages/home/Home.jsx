import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import "./Home.css";

export default function home() {
    return (
        <div>
           <Topbar/>
           <div className="homeContainer">
               <Sidebar />
               <Feed />
               <Rightbar />
           </div>
        </div>
    )
}
