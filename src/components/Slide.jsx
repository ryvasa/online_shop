import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import image1 from "../img/fashionable-charming-girl-checkered-dress-laughing-red-wall-photo-female-model-wearing-heart-shaped-glasses-wicker-bag.jpg";
import image2 from "../img/magnificent-woman-long-bright-skirt-dancing-studio-carefree-inspired-female-model-posing-with-pleasure-yellow.jpg";
import image3 from "../img/fashionable-model-stylish-hat-red-coat-boots-posing-white-wall-studio.jpg";
import image4 from "../img/portrait-handsome-confident-stylish-hipster-lambersexual-modelman-dressed-black-jacket-jeans-fashion-male-posing-studio-near-grey-wall.jpg";
const data = [
  {
    img: image1,
    arrow: "#",
    title: "New collection!",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quidem neque impedit similique adipisci velit assumenda.",
  },
  {
    img: image2,
    title: "Trending Fashion",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit Nostrum quidem neque impedit similique adipisci velit assumenda",
  },
  {
    img: image3,
    title: "Big Sale",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quidem neque impedit similique adipisci velit assumenda.",
  },
  {
    img: image4,
    title: "Top Products",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quidem neque impedit similique adipisci velit assumenda.",
  },
];

const Slide = () => {
  const [slide, setData] = useState(data);
  return (
    <div className="carousel w-full h-screen">
      <div id="1" className="carousel-item relative w-full h-full">
        <img src={slide[2].img} className="w-full h-screen object-cover" />
        <div className=" pl-20 text-white top-1/2 z-[1] absolute w-1/3">
          <h1 className="text-5xl font-bold">{slide[0].title}</h1>
          <p>{slide[0].text}</p>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#4">
            <FaAngleLeft className="text-white h-10 w-5" />
          </a>
          <a href="#2">
            <FaAngleRight className="text-white h-10 w-5" />
          </a>
        </div>
      </div>
      <div id="2" className="carousel-item relative w-full h-full">
        <img src={slide[1].img} className="w-full h-screen object-cover" />
        <div className=" pl-20 text-white top-1/2 z-[1] absolute w-1/3">
          <h1 className="text-5xl font-bold">{slide[1].title}</h1>
          <p>{slide[1].text}</p>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#1">
            <FaAngleLeft className="text-white h-10 w-5" />
          </a>
          <a href="#3">
            <FaAngleRight className="text-white h-10 w-5" />
          </a>
        </div>
      </div>
      <div id="3" className="carousel-item relative w-full h-full">
        <img src={slide[0].img} className="w-full h-screen object-cover" />
        <div className=" pl-20 text-black top-1/2 z-[1] absolute w-1/3">
          <h1 className="text-5xl font-bold">{slide[2].title}</h1>
          <p>{slide[2].text}</p>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#2">
            <FaAngleLeft className="text-white h-10 w-5" />
          </a>
          <a href="#4">
            <FaAngleRight className="text-white h-10 w-5" />
          </a>
        </div>
      </div>
      <div id="4" className="carousel-item relative w-full h-full">
        <img src={slide[3].img} className="w-full h-screen object-cover" />
        <div className=" pl-20 text-black top-1/2 z-[1] absolute w-1/3">
          <h1 className="text-5xl font-bold">{slide[3].title}</h1>
          <p>{slide[3].text}</p>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#3">
            <FaAngleLeft className="text-white h-10 w-5" />
          </a>
          <a href="#1">
            <FaAngleRight className="text-white h-10 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Slide;
