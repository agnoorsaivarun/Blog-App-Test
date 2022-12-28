import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import {Cookies} from "react-cookie"
export default function Blog(){
    const [blogs,updateBlogs]=useState([])
    const cookies = new Cookies();
    const token = cookies.get("jwt");
      useEffect(()=>{
    //   axios.get("http://localhost:8080/blogs")
    //   .then((data)=>updateBlogs(data))
    //   .catch((e)=>{
    //     console.log(e.message);
    //   })
    axios({
        method: "get",
        url:  "https://blog-test-server.onrender.com/blogs",
        headers: {
            Accept: "application/json",
            authorization: token,
            "Content-Type": "application/json",
          },
          credentials: "include" 
      })
        .then((response) => {
            console.log(response.data);
          updateBlogs(response.data)
        })
        .catch((err) => {
          console.log(err.message);
        }).finally(()=> console.log(1));
    },[token])
    return(
        <>
        <Header/>
        <div>{blogs.map((e,i)=>{
            return (
            <div key={i}>
            <div>{e.title}</div>
            <img src={e.pickImage} alt="blog pic"/>
            <div>{e.paragraph}</div>
            </div>
        )
        })}</div>
        </>
    )
}