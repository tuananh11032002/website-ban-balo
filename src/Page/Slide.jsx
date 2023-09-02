import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "../AppTransition.css"; // Import tệp CSS bạn vừa tạo

function Slide({ child }) {
  const location = useLocation();
  const [isEnter, setIsEnter] = useState(false);

  useEffect(() => {
    setIsEnter((v) => !v);
    // setTimeout(() => {
    //   setIsEnter((v) => !v);
    // }, [4000]);
  }, [location]);
  return (
    <div className="containerA">
      <CSSTransition
        key={location.key}
        timeout={100}
        classNames="page"
        in={isEnter}
      >
        {child}
      </CSSTransition>
    </div>
  );
}

export default Slide;
