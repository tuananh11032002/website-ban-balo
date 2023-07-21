import React, { useEffect } from "react";
import { getProductAPI } from "../../Axios/web";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
import { styled } from "styled-components";
import { GrUpdate } from "react-icons/gr";
import { BsFillTrashFill } from "react-icons/bs";

const ListProduct = () => {
  const handlerGrUpdate = (product) => {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs[0].value = product.id;
    inputs[1].value = product.name;
    inputs[2].value = product.description;
    inputs[3].value = product.price;
    inputs[4].value = product.image;
    inputs[5].value = product.createdAt;
  };
  const [{ product }, dispatch] = useStateProvider();
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getProductAPI();
      dispatch({ product: data, type: reducerCases.SET_PRODUCT });
    };

    fetchdata();
  }, []);
  return (
    <Container>
      <ul>
        {product?.map((product, index) => {
          return (
            <li key={index}>
              <div>
                <span>{product.id}</span>
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
                  <BsFillTrashFill />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
const Container = styled.div`
  img {
    height: 10%;
    width: 10%;
  }
  li {
    list-style: none;
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
`;
export default ListProduct;
