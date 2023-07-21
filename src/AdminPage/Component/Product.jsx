import React, { useEffect } from "react";
import { styled } from "styled-components";
import { createProductAPI, getCATEGORYAPI } from "../../Axios/web";
import axios from "axios";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
const Product = () => {
  const [{ category, product }, dispatch] = useStateProvider();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCATEGORYAPI();

        dispatch({ type: reducerCases.SET_CATEGORY, category: data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const HandlerSend = async () => {
    const inputs = document.querySelectorAll('input[type="text"]');
    const values = Array.from(inputs).map((input) => input.value);
    const response = await createProductAPI(
      {
        id: 0,
        name: values[1],
        description: values[2],
        price: values[3],
        Image: values[4],
        createdAt: values[5],
      },
      1
    );
  };
  return (
    <Container>
      <div>id</div>
      <input type="text" />
      <div>name</div>

      <input type="text" />
      <div>Descritpion</div>

      <input type="text" />
      <div>Price</div>

      <input type="text" />
      <div>Image</div>

      <input type="text" />
      <div>Create At</div>

      <input type="text" />
      <button
        id="button"
        onClick={() => {
          HandlerSend();
        }}
      >
        Gửi
      </button>
      <ul></ul>
    </Container>
  );
};

const Container = styled.div``;
export default Product;
