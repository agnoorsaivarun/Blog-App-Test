import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Protected from "./components/protected";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Protected />}>
            <Route path="/" element={<Blog />} />
            <Route path="/createblog" element={<CreateBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;