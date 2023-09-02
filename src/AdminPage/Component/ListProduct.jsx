import React, { useEffect, useRef, useState } from "react";
import {
  deleteProductApi,
  getProductAPI,
  getProductAndCategory,
} from "../../Axios/web";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
import { styled } from "styled-components";
import { GrUpdate } from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";

const ListProduct = ({ openComponent2 }) => {
  console.log("listproduct");
  const handlerGrUpdate = (product) => {
    openComponent2();
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[type="text"]');
      const inputDate = document.querySelector('input[type="date"]');

      if (inputs.length > 0) {
        inputs[0].value = product.name;
        inputs[2].value = product.price;
        inputs[1].value = product.description;
        inputs[3].value = product.image;

        inputDate.value = formatDate(product.createdAt)
          ? formatDate(product.createdAt)
          : new Date("2023-09-30");
        if (inputDate.value === "")
          inputDate.value = new Date().toISOString().split("T")[0];
      }
    }, 0);
  };
  function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const handlerDelete = async (productId) => {
    const response = await deleteProductApi(productId);
    if (response) {
      const arr = product.map((p) => {
        return p.id == productId;
      });
      dispatch({ product: arr, type: reducerCases.SET_PRODUCT });
    }
  };
  const [{ product }, dispatch] = useStateProvider();
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getProductAndCategory();
      if (JSON.stringify(data) != JSON.stringify(product))
        dispatch({ product: data, type: reducerCases.SET_PRODUCT });
    };

    fetchdata();
  }, [product]);

  const [checkboxState, setCheckboxState] = useState(
    [].concat(
      ...product.map((category) => category.product.map((cate) => false))
    )
  );

  const handleItemClick = (index) => {
    setIndexTemp(indexTemp + 1);

    const newCheckboxState = [...checkboxState];
    newCheckboxState[index] = !newCheckboxState[index];
    setCheckboxState(newCheckboxState);
  };

  const [indexTemp, setIndexTemp] = useState(0);
  return (
    <Container>
      {product?.map((pro, index) => (
        <div key={index}>
          <div className="product-name">
            <h2>{pro.name} &nbsp;</h2>
            <hr />
          </div>
          <ul className="product-list">
            {pro.product?.map((product, index) => {
              return (
                <>
                  <li
                    key={indexTemp}
                    onClick={() => {
                      handleItemClick(indexTemp);
                    }}
                  >
                    <div>
                      <span>
                        <input
                          className="checkbox-item"
                          type="checkbox"
                          style={{ display: "none" }}
                          checked={checkboxState[index]}
                        />
                        {product.id}
                      </span>
                      <span>{product.name}</span>
                      <span>{product.price.toLocaleString()}đ</span>
                      <span>
                        <img src={product.image}></img>
                      </span>
                      <span>
                        <GrUpdate
                          onClick={() => {
                            handlerGrUpdate(product);
                          }}
                        />
                      </span>
                      <span>
                        <BsFillTrashFill
                          onClick={() => {
                            handlerDelete(product.id);
                          }}
                        />
                      </span>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      ))}
    </Container>
  );
};
const Container = styled.div`
  * {
    user-select: none;
  }
  img {
    height: 100%;
    width: 78px;
  }
  ul {
    padding: 0;
  }
  li {
    height: auto;
    list-style: none;
    margin-bottom: 20px;
    &:hover {
      background-color: rgba(220, 220, 220, 0.5);
    }
    div {
      display: flex;
      flex-direction: row;
      justify-items: space-between;
      align-items: center;
      span {
        flex: 1;
        margin-right: 10px;
      }
    }
  }
  .product-list {
    li {
      div {
        * {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .product-name {
    display: flex;
    hr {
      flex: 1;
    }
  }
`;
export default ListProduct;
