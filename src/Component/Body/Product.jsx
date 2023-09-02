import React, { useEffect, useState } from "react";
import { useStateProvider } from "../../StateProvider/StateProvider";
import {
  getProductAPI,
  getProdctFromCategoryApi,
  getCATEGORYAPI,
  getProductAndCategory,
  getProductAndCategoryOption,
} from "../../Axios/web";
import { reducerCases } from "../../StateProvider/reducer";
import { styled } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [{ product, category }, dispatch] = useStateProvider();
  const [isValue, setIsValue] = useState(1);
  useEffect(() => {
    if (!params.categoryName || params.categoryName == null) {
      const fetchData = async () => {
        const data = await getProductAndCategory();
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
      if (category?.length > 0) {
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

  const hanlderClick = (e, productId) => {
    if (
      !e.target.classList.contains("product-element_color") &&
      e.target.parentNode.classList != "product-element_color"
    ) {
      navigate(`/products/${productId}`);
    }
  };
  const colors = [
    "#e4d3be", // hồng nhẹ
    "#000000", // đen
    "#9b5513", // nâu
    "#c99541", // nâu cam
    "#13014d", // danh dương đậm
    "#f5b79f", // hồng
    "#005e1f", // xanh lá
    "#c7c7c7", // xám
  ];
  const getProductWithOption = async (categoryName, option) => {
    // const categoryApi = await getCATEGORYAPI();
    // dispatch({ type: reducerCases.SET_CATEGORY, category: categoryApi });
    const data = await getProductAndCategoryOption(categoryName, option);
    dispatch({ product: data, type: reducerCases.SET_PRODUCT });
  };
  return (
    <Container>
      {product?.map((product, index) => (
        <>
          <div
            key={index}
            className="product-categoryName"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                params.categoryName || params.categoryName != null
                  ? "space-between"
                  : "none",
            }}
          >
            <h2>{product.name}</h2>{" "}
            {!params.categoryName || params.categoryName == null ? (
              <hr style={{ flex: 1 }} />
            ) : (
              <span>
                Sắp xếp theo:
                <select
                  value={isValue}
                  style={{ fontSize: "14px" }}
                  onChange={(e) => {
                    setIsValue(e.target.value);
                    getProductWithOption(params.categoryName, e.target.value);
                  }}
                >
                  <option value="1" selected>
                    Sản phẩm bán chạy
                  </option>
                  <option value="2">Giá từ thấp tới cao</option>
                  <option value="3">Giá từ cao tới thấp</option>
                </select>
              </span>
            )}
          </div>
          <div className="product-element">
            <ul>
              {product?.product?.map((p, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    hanlderClick(e, p.id);
                  }}
                >
                  <div className="product-element_name">
                    <img src={p.image} alt="" />
                  </div>
                  <div className="product-element_image">{p.name}</div>
                  <div className="product-element_price">
                    {p.price.toLocaleString()}đ
                  </div>
                  <div className="product-element_color">
                    {colors.map((color, i) => (
                      <div
                        key={i}
                        className="product-element_color__child "
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                  {p.soluong == 0 ? (
                    <span className="stock-label">Hết</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 80px;
  img {
    width: 267px;
    height: 267px;
  }
  .product-categoryName {
    select {
      width: 140px;
      height: 40px;
    }
    &:first-child {
      padding-top: 20px;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; /* Thay vì space-between */
    align-items: stretch; /* Thay vì center */

    li {
      list-style-type: none;
      height: 383px;
      width: 277;
      flex-basis: 22%;
      margin: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & {
        position: relative;
        /* Other styles for the product */
      }

      .stock-label {
        position: absolute;
        top: 0;
        right: 0;

        color: white;
        padding: 5px 10px;
        border-radius: 50%;
        font-weight: bold;
        text-align: center;
        background-color: black;
      }
      .product-element_color {
        display: flex;
        flex-wrap: wrap;
        .product-element_color__child {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          &:hover {
            transform: scale(1.5);
          }
          &:first-child {
            border: 1px solid red; /* Áp dụng style cho phần tử đầu tiên */
          }
        }
      }

      &:hover {
        cursor: pointer;
        img {
          width: 280px;
          height: 280px;
        }
      }
    }
  }
  @media screen and (max-width: 765px) {
    padding: 0;
    ul {
      padding: 0;
      li {
        flex-basis: none;

        img {
        }
      }
    }
  }
`;
export default Product;
