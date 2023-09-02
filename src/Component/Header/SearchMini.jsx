import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchMini = ({ dataProduct, setProductSearch, inputRef }) => {
  const navigate = useNavigate();
  const handlerClick = (data, inputRef, setProductSearch) => {
    navigate(`/products/${data.id}`);
    setProductSearch([]);
    inputRef.current.value = "";
  };

  return (
    <Container>
      {dataProduct?.map((data, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              handlerClick(data, inputRef, setProductSearch);
            }}
          >
            <img src={data.image} alt={data.name} />
            <div>
              <div>{data.name}</div>
              <div style={{ color: "red" }}>{data.price.toLocaleString()}đ</div>
            </div>
          </li>
        );
      })}
      {dataProduct?.length == 0 && <div>No Product With This Key</div>}
    </Container>
  );
};

const Container = styled.ul`
  width: 100%;
  padding-inline-start: 0;
  li {
    width: 100%;
    text-decoration: none;
    list-style-type: none;
    border-bottom: 1px solid;
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
export default SearchMini;
