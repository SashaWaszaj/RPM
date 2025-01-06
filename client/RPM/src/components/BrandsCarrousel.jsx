import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gulf from '../uploads/Gulf.png';
import kenda from '../uploads/kenda.jpg';
import km from '../uploads/KM.png';
import mmg from '../uploads/MMG.jpg';
import myk from '../uploads/MYK.jpg';
import ngk from '../uploads/NGK-Logo.jpg';
import narva from '../uploads/Narva.jpg';
import protork from '../uploads/protork.png';
import rcx from '../uploads/rcx.jpg';
import riffel from '../uploads/Riffel.jpg';
import rinaldi from '../uploads/Rinaldi.jpg';
import shiro from '../uploads/shiro.png';
import '../CSS-Styles/BrandsCarrousel.css';

function BrandsCarrousel() {
  let sliderRef = useRef(null);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className="slider-container">
      <h2 style={{textAlign: 'center', fontSize: 'xx-large'}}>Marcas</h2>
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
            <div className="img-carrousel">
            <img src={gulf} alt="Gulf"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={kenda} alt="Kenda"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={km} alt="KM"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={mmg} alt="MMG"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={myk} alt="MYK"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={ngk} alt="NGK"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={narva} alt="Narva"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={protork} alt="Protork"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={rcx} alt="RCX"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={riffel} alt="Riffel"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={rinaldi} alt="Rinaldi"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
            <div className="img-carrousel">
            <img src={shiro} alt="Shiro"  style={{ width: "auto", height: "100px", border: 'none' }} />
            </div>
      </Slider>
    </div>
  );
}
export default BrandsCarrousel;
