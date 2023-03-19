import React from "react";
import * as Chakra from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";

import backFace from "../../../public/studyGame.png";

const MemoryCardGame = (name, isBlocked) => {
  /* const [isFlipped, setIsFlipped] = useState(false); */
  const [isFlipped, setIsFlipped] = useState(name.isBlocked ? false : true);
  
  const [hasEvent, setHasEvent] = useState(true);
  const [isStarting, setIsStarting] = useState(true);
  const [timeLeft, setTimeLeft] = useState(50);

  useEffect(() => {
    if (name.unflippedCards.includes(name.number)) {
      setTimeout(() => setIsFlipped(false), 700);
    }
  }, [name.unflippedCards, name.number]);

  useEffect(() => {
    if (name.disabledCards.includes(name.number)) {
      setHasEvent(false);
    }
  }, [name.disabledCards, name.number]);

     useEffect(() => {
       if (isStarting && !name.isBlocked) {
         setIsFlipped(true);
         setTimeout(() => {
           setIsStarting(false);
           setIsFlipped(false);
         }, 3000);
       }
     }, [isStarting, !name.isBlocked]); 

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleClick = (e) => {
    const value = name.flipCard(name.name, name.number);
    if (value !== 0) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <Chakra.Box
      display="inline-block"
      margin="5px"
      height="calc(150px - 10px)"
      width="calc(200px - 10px)"
      boxShadow="0px 0px 5px 0px rgba(0,0,0,0.75)"
    >
      <ReactCardFlip isFlipped={isFlipped}>
        <Chakra.Image
          src={backFace.src}
          alt="back-face"
          height="calc(150px - 10px)"
          width="calc(200px - 10px)"
          border="1px solid black"
          onClick={hasEvent && !name.isBlocked ? handleClick : null}
        />

        {name.image ? (
          <Chakra.Box
            height="calc(150px - 10px)"
            width="calc(200px - 10px)"
            border="1px solid black"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
            }}
            onClick={hasEvent && !name.isBlocked ? handleClick : null}
          >
            <Chakra.Image
              height="calc(100px - 10px)"
              width="calc(100px - 10px)"
              src={name.image}
              alt="back-face"
            />
            <h2>{name.frontFace}</h2>
          </Chakra.Box>
        ) : (
          <Chakra.Textarea
            height="calc(150px - 10px)"
            width="calc(200px - 10px)"
            border="3px solid black"
            textAlign="center"
            fontSize="20px"
            resize="none"
            bg="#FFFFFF"
            pointerEvents="none"
            //fontFamily="Poppins"
            value={name.frontFace}
            onClick={hasEvent && !isBlocked ? handleClick : null}
          />
        )}
      </ReactCardFlip>
 {/*      <Chakra.Box position="absolute" top="500px" right="200px">
        <Chakra.Text fontSize="2xl" fontWeight="bold">
          {timeLeft}
        </Chakra.Text>
      </Chakra.Box> */}
    </Chakra.Box>
  );
};

export default MemoryCardGame;
