import React, { Component } from "react";
import { Link,Outlet } from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
      <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid bg-dark">
        <a className="navbar-brand text-light" href="/">NewsLog</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link active text-light" aria-current="page" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link active text-light" aria-current="page" to="/business">Business</Link></li>
            <li className="nav-item"><Link className="nav-link active text-light" aria-current="page" to="/entertainment">Entertainment</Link></li>
            <li className="nav-item"><Link className="nav-link active text-light" aria-current="page" to="/health">Health</Link></li>
            <li className="nav-item"><Link className="nav-link active text-light" aria-current="page" to="/science">Science</Link></li>
            <li className="nav-item"><Link className="nav-link active text-light" aria-current="page" to="/sports">Sports</Link></li>
            <li className="nav-item"><Link className="nav-link active text-light" aria-current="page" to="/technology">Technology</Link></li>
          </ul>
        </div>
      </div>to
    </nav>

    <Outlet/>
    </>





      // <div className="navbar">
      //   <div className="logo">NewsLog</div>
      //   <nav>
      //     <li>
      //       <a href="/">Home</a>
      //     </li>
      //     <li>
      //       <a href="/">About</a>
      //     </li>
      //     <li>
      //       <a href="/">business</a>
      //     </li>
      //     <li>
      //       <a href="/">entertainment</a>
      //     </li>
      //     <li>
      //       <a href="/">general</a>
      //     </li>
      //     <li>
      //       <a href="/">health</a>
      //     </li>
      //     <li>
      //       <a href="/">science</a>
      //     </li>
      //     <li>
      //       <a href="/">sports</a>
      //     </li>
      //     <li>
      //       <a href="/">technology</a>
      //     </li>
      //   </nav>
      // </div>
    );
  }
}
