import { Carousel } from "react-bootstrap" 
import { useState, useEffect } from "react";
const CaroselFunction = () => {

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const words = ["Coffee Scene","Hangout place", "Study Spot","Datenight Bar", "Vibe."]

//  the blinking effect for the homepage 
  useEffect(() => {
    if (index === words.length - 1 && subIndex === words[index].length) {
      return;
    }

    if (
      subIndex === words[index].length + 1 && 
      index !== words.length - 1 && 
      !reverse 
    ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 :
                150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);


  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);








  

//////////////////////////////////////////////////////////////////////// HERE IS YOUR RETURN /////////////////////////////////////////////////////////////////////////////////

    return (
        <>
        <div id="imgAbout">
        <Carousel className="carousel">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.designsponge.com/wp-content/uploads/2018/11/never1.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3 id="h3">Find All Of Your Favourites</h3>
      <p></p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i2-prod.mirror.co.uk/incoming/article22820485.ece/ALTERNATES/s615/0_people-talking-and-toasting-in-a-pub-with-the-beers.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Discover Something New</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.comunicaffe.com/wp-content/uploads/2017/05/london-coffee.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Get Rid of The Distractions </h3>
      <p></p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bakan-restaurante-mexcano-madrid-elle-4-1638198264.jpg?"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Know The Vibe.</h3>
      <p></p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<div className="text">
<h2 id="about1">
  <h1>Kelp.</h1>
Find your 
 {` ${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
</h2>
<h5 id="about1">Here is some information about this site more information </h5>
</div>
</div>
</>
    )
}

export default CaroselFunction;