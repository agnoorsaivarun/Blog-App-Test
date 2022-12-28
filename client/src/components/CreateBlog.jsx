import Header from "./header";
import '../App.css'
import { useNavigate } from "react-router-dom";

export default function CreateBlog(){
    const navigate = useNavigate();

    async function  handleSubmit(e){
        e.preventDefault()
        let data =e.target
        let formData=new FormData(data)
        await fetch('https://blog-test-server.onrender.com/createblog',{method:"POST",body:formData})
        .then(res=> res.json()).then((d)=>{
            alert("blog created successful")
            console.log(d);
        }).catch((e)=>{console.log(e.message)}).finally(()=>{navigate("/")})
    }
    return(
        <div className="cbcontainer" >
        <Header/>
         <div className="createblog">
            <form onSubmit={handleSubmit}>
              <input name="title" required placeholder="enter title"/>
              <input placeholder="enter image url" required name="pickImage"/>
              <textarea name="paragraph" required placeholder="enter description"/>
              <button type="submit">Create Post</button>
            </form>
         </div>
        </div>
    )
}