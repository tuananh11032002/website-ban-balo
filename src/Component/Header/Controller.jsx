import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "./Image";
import { getCATEGORYAPI, getCategoryApi } from "../../Axios/web";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
import { useNavigate } from "react-router-dom";
const Controller = () => {
  const [{ category }, dispatch] = useStateProvider();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCATEGORYAPI();
      setData(data);
      dispatch({ type: reducerCases.SET_CATEGORY, category: data });
    };
    fetchData();
  }, []);

  return (
    <Container>
      {data?.map(({ image, imageReplace, name, id }, index) => (
        <Image
          id_image={id}
          src={image}
          message={name}
          replace={imageReplace}
          key={index}
          key_name={index}
        ></Image>
      ))}
    </Container>
  );
};
const Container = styled.div`
  padding: 2.5vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Controller;
