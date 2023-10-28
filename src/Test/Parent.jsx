import React, { useState } from "react";

const Parent = ({ Child, indexActive }) => {
  const [index, setIndex] = useState(1);
  return (
    <div>
      <div>index {indexActive}</div>
      {<Child index={index} />}
    </div>
  );
};

export default Parent;
