import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import processApiImagePath from "../../Helper/EditLinkImage";

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
            <img src={processApiImagePath(data.image[0])} alt={data.name} />
            <div>
              <div>{data.name}</div>
              <div style={{ color: "red" }}>{data.price.toLocaleString()}đ</div>
            </div>
          </li>
        );
      })}
      {dataProduct?.length == 0 && (
        <NoProductMessage>No Product With This Key</NoProductMessage>
      )}
    </Container>
  );
};

const Container = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-direction: column;

  li {
    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sửa box-shadow và làm nó đổ xuống dưới */
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      max-height: 40px;
    }

    div {
      margin-top: 10px;
    }

    div:first-child {
      font-weight: bold;
    }

    div:last-child {
      /* Loại bỏ màu đỏ cho giá */
      color: #333; /* Màu văn bản tùy chỉnh */
    }
  }

  li:hover {
    background-color: #f2f2f2;
    transform: scale(1.05); /* Thêm hiệu ứng khi hover */
  }

  li:active {
    transform: scale(0.95);
  }
`;

const NoProductMessage = styled.div`
  text-align: center;
  width: 100%;
  font-weight: bold;
`;
export default SearchMini;
