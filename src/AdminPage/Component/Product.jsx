import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { createProductAPI, getCATEGORYAPI } from "../../Axios/web";
import axios from "axios";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";

const Product = ({ closeComponent2 }) => {
  console.log("product");
  const [isVisible, setIsVisible] = useState(true); // Ban đầu ẩn
  const [{ category, product }, dispatch] = useStateProvider();

  useEffect((e) => {
    const HandlerClick = (e) => {
      if (!e.target.classList.contains("container")) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", HandlerClick);
  }, []);
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
    if (values[0] != "" && values[0] != undefined) {
      const response = await createProductAPI(
        {
          id: 0,
          name: values[0],
          description: values[1],
          price: values[2],
          Image: values[3],
          createdAt: values[4],
        },
        1
      );
    }
  };
  return (
    <>
      <div
        className={`${isVisible ? "vissible" : "hidden"}`}
        style={{
          maxWidth: "100%",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "rgba(128, 128, 128, 0.5)",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2,
          overflowX: "scroll",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <button
            className="close-button"
            onClick={() => {
              closeComponent2();
            }}
          >
            X
          </button>

          <div
            style={{
              width: "100%",
              margin: "0 12px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="column-child">
              <span>Name</span>
              <input type="text" />
            </div>
            <div className="column-child">
              <span>Descritpion</span>
              <input type="text" />
            </div>
            <div className="column-child">
              <span>Price</span>
              <input type="text" />
            </div>
            <div className="column-child">
              <span>Image</span>
              <input type="text" />
            </div>

            <div className="column-child">
              <span>Create At </span>
              <input type="date" onChange={(e) => {}} />
            </div>

            <div
              className="column-child"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  userSelect: "none",
                  width: "200px",
                  border: "1px solid",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: "red",
                }}
                id="button"
                onClick={() => {
                  HandlerSend();
                }}
              >
                Gửi
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

const Container = styled.form`
  &.vissible {
    display: flex;
  }
  &.hidden {
    display: none;
  }
  display: flex;

  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: white;
  margin: auto 0;
  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px 10px;
    background-color: #e0e0e0;
    border: none;
    cursor: pointer;
    z-index: 2;
  }
  .column-child {
    display: flex;
    margin-bottom: 50px;
    &:first-child {
      margin-top: 50px;
    }
    span {
      display: inline-block;
      width: 100px;
    }
    input {
      flex: 1;
    }
  }
`;
export default Product;
