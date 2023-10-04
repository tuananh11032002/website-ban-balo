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
      if (JSON.stringify(data) != JSON.stringify(category)) {
        dispatch({ type: reducerCases.SET_CATEGORY, category: data });
      }
    };
    fetchData();
  }, [category]);

  return (
    <Container>
      {category?.map(({ image, imageReplace, name, id }, index) => (
        <div className="image" key={index}>
          <Image
            id_image={id}
            src={image}
            message={name}
            replace={imageReplace}
            key={index}
            key_name={index}
          ></Image>
        </div>
      ))}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  flex-wrap: wrap;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  * {
    user-select: none;
  }
  .image {
    height: 100px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      border-right: 1px solid #eeeeee;
    }
  }

  @media screen and (max-width: 756px) {
    .image {
      border: none;
      margin: auto;
      &:not(:last-child) {
        border-right: none;
      }
    }
    /* .image:not(:last-child) {
      border-right: none;
    } */
  }
`;

export default Controller;
