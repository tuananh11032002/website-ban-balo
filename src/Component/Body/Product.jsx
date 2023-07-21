import React, { useEffect } from "react";
import { useStateProvider } from "../../StateProvider/StateProvider";
import {
  getProductAPI,
  getProdctFromCategoryApi,
  getCATEGORYAPI,
} from "../../Axios/web";
import { reducerCases } from "../../StateProvider/reducer";
import { styled } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [{ product, category }, dispatch] = useStateProvider();

  useEffect(() => {
    if (!params.categoryName || params.categoryName == null) {
      const fetchData = async () => {
        const data = await getProductAPI();
        dispatch({ product: data, type: reducerCases.SET_PRODUCT });
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const categoryApi = await getCATEGORYAPI();
        dispatch({ type: reducerCases.SET_CATEGORY, category: categoryApi });
      };
      fetchData();
    }
  }, [params.categoryName]);

  // useEffect để theo dõi thay đổi trong state.category và thực hiện các thao tác cần thiết sau khi cập nhật xong.
  useEffect(() => {
    const fetchDataBasedOnCategory = async () => {
      if (category.length > 0) {
        const data = category.filter((cat) => {
          return cat.name == params.categoryName;
        });
        if (data.length > 0) {
          const categoryById = await getProdctFromCategoryApi(data[0]?.id);
          dispatch({ type: reducerCases.SET_PRODUCT, product: categoryById });
        }
      }
    };
    fetchDataBasedOnCategory();
  }, [category, params.categoryName]);

  const hanlderClick = (productId) => {
    navigate(`/products/${productId}`);

    // Thực hiện bất kỳ xử lý khác liên quan đến việc bấm vào `li` nếu cần

    // Điều hướng đến trang sản phẩm với ID sản phẩm cụ thể
  };
  return (
    <Container>
      <ul>
        {product?.map((product, index) => {
          return (
            <li key={index} onClick={() => hanlderClick(product.id)}>
              <img src={product.image} alt="" />
              <span>{product.name}</span>
              <span className="price">{product.price.toLocaleString()}đ</span>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  padding-left: 4rem;
  padding-right: 4rem;
  .price {
    font-weight: bold;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    &:hover {
      cursor: pointer;
      background-color: #f9f7f7;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    text-decoration: none;
    list-style-type: none;
    flex: 1 0 23%;
    max-width: 23%;
    height: 22rem;
    box-sizing: border-box;
    margin: 0.5%;
    img {
      height: 90%;
      width: 90%;
    }
  }

  @media only screen and (max-width: 768px) {
    li {
      flex: 1 0 31%;
      max-width: 31%;
    }
  }
`;
export default Product;
