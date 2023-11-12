import React, { useEffect, useState } from "react";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { getProductApiWithNameCategory, getCategoryApi } from "../../Axios/web";
import { reducerCases } from "../../StateProvider/reducer";
import { styled } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import processApiImagePath from "../../Helper/EditLinkImage";
import { v4 as uuidv4 } from "uuid";
const Product = () => {
  const params = useParams();
  const { categoryName } = params;
  const navigate = useNavigate();
  const [{ product, category }, dispatch] = useStateProvider();
  const [isValue, setIsValue] = useState(1);
  console.log("CategoryName", categoryName);
  useEffect(() => {
    const fetchData = async () => {
      if (categoryName !== undefined) {
        window.scrollTo(0, 200);
        let categoryId;
        if (!category) {
          const categoryApi = await getCategoryApi();
          categoryId = categoryApi.result?.filter(
            (p) => p.name === categoryName
          );

          dispatch({
            type: reducerCases.SET_CATEGORY,
            category: categoryApi.result,
          });
        } else {
          categoryId = category.filter((p) => p.name === categoryName);
        }

        const dataProduct = await getProductApiWithNameCategory(
          categoryId[0].id,
          "",
          isValue,
          15,
          1
        );
        if (dataProduct.result !== product) {
          dispatch({
            type: reducerCases.SET_PRODUCT,
            product: dataProduct.result,
          });
        }
      } else {
        const dataProduct = await getProductApiWithNameCategory();
        if (dataProduct?.status) {
          if (dataProduct.result !== product) {
            dispatch({
              type: reducerCases.SET_PRODUCT,
              product: dataProduct.result,
            });
          }
        }
      }
    };

    fetchData();
  }, [categoryName, isValue]);
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

  return (
    <Container>
      {product?.map((product, index) => (
        <div key={index}>
          <div
            className="category-title"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                params.categoryName || params.categoryName != null
                  ? "space-between"
                  : "none",
            }}
          >
            <h2>{product.categoryName}</h2>
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
                  }}
                >
                  <option value="" selected>
                    Sản phẩm bán chạy
                  </option>
                  <option value="insc">Giá từ thấp tới cao</option>
                  <option value="desc">Giá từ cao tới thấp</option>
                </select>
              </span>
            )}
          </div>

          <div className="product-element" key={uuidv4()}>
            <ul>
              {product?.products.map((p, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    const { id } = p;
                    hanlderClick(e, id);
                  }}
                >
                  <div className="product-element_image">
                    <img
                      src={
                        p.image?.length > 0
                          ? processApiImagePath(p.image[0])
                          : null
                      }
                      alt=""
                    />
                  </div>
                  <div className="product-element_name">{p.name}</div>
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
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  z-index: 0;
  .category-title select {
    padding: 10px;
    font-size: 12px;
  }
  .category-title:first-child {
    padding-top: 20px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: stretch; /* Thay vì center */
    padding: 0;
    width: 100%;
    li:hover {
      cursor: pointer;
      box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
    }
    li {
      list-style-type: none;
      max-width: 25%;
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      .product-element_image img {
        width: 100%;
        max-height: 267px;
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
        }
        .product-element_color__child:hover {
          transform: scale(1.05);
          transition: transform 0.5s;
        }
        .product-element_color__child:first-child {
          border: 1px solid red; /* Áp dụng style cho phần tử đầu tiên */
        }
      }
    }
  }
  @media screen and (max-width: 1260px) {
    ul {
      li .product-element_image img {
        min-width: 50% !important;
      }
    }
    ul {
      li {
        min-width: 50% !important;
      }
    }
  }
  @media screen and (max-width: 710px) {
    /* ul {
      justify-content: center !important;

      li {
        max-width: 100%;
      }
    } */
  }
`;
export default Product;
