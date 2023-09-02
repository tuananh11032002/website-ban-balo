import React, { useState } from "react";
import "../AppTransition.css";
import { CSSTransition } from "react-transition-group";
const ExampleA = () => {
  const [enter, setEnter] = useState(false);
  return (
    <div className="containerA">
      <button
        onClick={() => {
          setEnter((v) => {
            return !v;
          });
        }}
      >
        Transition
      </button>
      <CSSTransition in={enter} timeout={5000} classNames="myclass">
        <p className="my-paragraph">Animete me</p>
      </CSSTransition>
    </div>
  );
};

export default ExampleA;
