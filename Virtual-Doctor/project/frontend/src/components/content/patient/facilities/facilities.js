import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Carousel } from "antd";
import './index.css';
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import img7 from "./7.jpg";
import img8 from "./8.jpg";
import img9 from "./9.jpg";
import img10 from "./10.jpg";


export class Facilities extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div style={{padding:10,border :"2px black solid"}}>
        <Carousel  effect="fade" autoplay>
            <img src={img1} alt="img1"/>
            <img src={img2} alt="img2"/>
            <img src={img3} alt="img3"/>
            <img src={img9} alt="img9"/>
            <img src={img10} alt="img10"/> 
            <img src={img4} alt="img4"/>
            <img src={img5} alt="img5"/>
            <img src={img6} alt="img6"/>
            <img src={img7} alt="img7"/>
            <img src={img8} alt="img8"/>
        </Carousel>
      </div>
    );
  }
}

export default Facilities;
