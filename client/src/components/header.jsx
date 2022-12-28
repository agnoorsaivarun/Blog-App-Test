import { Link } from "react-router-dom";
import Logout from "./logout";

export default function Header(){

    return(
        <div className="blogheader">
            <h1>Blog</h1>
            <div>
                <Link to="/"><div>Home</div></Link> 
                <Link to="/createblog"><div>Create</div></Link>
                <div><Logout/></div>
            </div>
        </div>
    )
}