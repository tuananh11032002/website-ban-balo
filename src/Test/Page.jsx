import React from "react";
import Parent from "./Parent";
import Child from "./Child";

const Page = () => {
  return <Parent indexActive={1} Child={Child}></Parent>;
};

export default Page;
