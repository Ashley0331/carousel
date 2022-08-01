import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { Picture } from "../model/picture";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Image from "./image";

const Carousel: FC = memo(() => {
  const [leftValue, setLeftValue] = useState(-400);
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState("all 0.5s ease-in-out");
  // const leftValue=useRef(0);
  const images: Array<Picture> = [
    { id: 1, bgc: "#9cadb3", content: "1" },
    { id: 2, bgc: "#a994a7", content: "2" },
    { id: 3, bgc: "#cfdada", content: "3" },
  ];
  const handleLeftClick = useCallback(() => {
    if (leftValue === 0) {
      setCurrent(3);
      setTransition("");
      setLeftValue(-(images.length * 400));
    } else {
      leftValue === -400 ? setCurrent(3) : setCurrent(current - 1);
      setLeftValue(leftValue + 400);
    }
  }, [leftValue, current]);
  const handleRightClick = useCallback(() => {
    if (leftValue === -1600) {
      setTransition("");
      setLeftValue(-400);
    } else {
      leftValue === -1200 ? setCurrent(1) : setCurrent(current + 1);
      setLeftValue(leftValue - 400);
    }
  }, [leftValue, current]);
  const handleSpotClick = useCallback((n: number) => {
    setLeftValue(-400 * n);
    setCurrent(n);
  }, []);
  useEffect(() => {
    const autoPlay = setInterval(() => {
      if (leftValue <= -1600) {
        setTransition("");
        setLeftValue(-400);
      } else {
        if (leftValue === -1200) {
          setCurrent(1);
        } else if (leftValue === 0) {
          setCurrent(1);
        } else {
          setCurrent(current + 1);
        }
        setTransition("all 0.5s ease-in-out");
        setLeftValue(leftValue - 400);
      }
    }, 1500);
    return () => {
      clearInterval(autoPlay);
    };
  });
  return (
    <div className="images-list">
      <ul
        className="picture-list"
        style={{
          transform: `translateX(${leftValue}px)`,
          transition: transition,
          width: (images.length + 2) * 400,
        }}
      >
        <Image picture={images[images.length - 1]} />
        {images.map((temp) => {
          return <Image key={temp.id} picture={temp} />;
        })}
        <Image key="1" picture={images[0]} />
      </ul>
      <div className="arrow">
        <button className="left" onClick={handleLeftClick}>
          <AiFillCaretLeft />
        </button>
        <button className="right" onClick={handleRightClick}>
          <AiFillCaretRight />
        </button>
      </div>
      <div className="point">
        <ul>
          {images.map((temp) => {
            return (
              <li
                key={temp.id}
                onClick={(e) => handleSpotClick(temp.id)}
                style={{
                  backgroundColor:
                    current === temp.id ? "black" : "rgb(207, 207, 207)",
                }}
              ></li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});
export default Carousel;
