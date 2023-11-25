import React, { useEffect, useState } from 'react';
import { useStateProvider } from '../../StateProvider/StateProvider';
import { getProductApiWithNameCategory, getCategoryApi } from '../../Axios/web';
import { reducerCases } from '../../StateProvider/reducer';
import { styled } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import processApiImagePath from '../../Helper/EditLinkImage';
import { v4 as uuidv4 } from 'uuid';
import RatingStars from './RatingStar';
import processPrice from '../../Helper/ProcessPrice';
const Product = () => {
   const params = useParams();
   const { id } = params;
   const [{ product, category }, dispatch] = useStateProvider();

   const navigate = useNavigate();
   const [isValue, setIsValue] = useState(1);
   const fetchData = async () => {
      if (id !== undefined) {
         window.scrollTo(0, 200);
         if (!category) {
            const categoryApi = await getCategoryApi();

            dispatch({
               type: reducerCases.SET_CATEGORY,
               category: categoryApi.result,
            });
         }

         const dataProduct = await getProductApiWithNameCategory(
            id,
            '',
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
   useEffect(() => {
      fetchData();
   }, [id, isValue]);
   const hanlderClick = (e, productId) => {
      if (
         !e.target.classList.contains('product-element_color') &&
         e.target.parentNode.classList !== 'product-element_color'
      ) {
         navigate(`/products/${productId}`);
      }
   };

   return (
      <Container>
         {product?.map((product, index) => (
            <div key={index}>
               <div
                  className="category-title"
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent:
                        params.id || params.id != null
                           ? 'space-between'
                           : 'none',
                  }}
               >
                  <h2>{product.name}</h2>
                  {!params.categoryName || params.categoryName == null ? (
                     <hr style={{ flex: 1 }} />
                  ) : (
                     <span>
                        Sắp xếp theo:
                        <select
                           value={isValue}
                           style={{ fontSize: '14px' }}
                           onChange={(e) => {
                              setIsValue(e.target.value);
                           }}
                        >
                           <option value="popularity" selected>
                              Sản phẩm bán chạy
                           </option>
                           <option value="priceasc">Giá từ thấp tới cao</option>
                           <option value="pricedesc">
                              Giá từ cao tới thấp
                           </option>
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
                           <div>{p.name}</div>
                           <RatingStars
                              rating={p.ratingPoint}
                              totalRating={p.totalRating}
                           />
                           <div style={{ fontWeight: 'bold' }}>
                              {p.priceNow.toLocaleString()}đ
                           </div>

                           {p.soLuong === 0 ? (
                              <span className="stock-label">Hết</span>
                           ) : null}
                           {p.soLuong !== 0 ? (
                              <div className="percent-discount">
                                 -{processPrice(p.price, p.discount)}%
                              </div>
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
   .category-title {
      padding: 20px;
   }
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
      }
      li .product-element_image img {
         width: 100%;
         max-height: 267px;
         box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
      }
      li .stock-label {
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
      li .percent-discount {
         position: absolute;
         top: 0;
         right: 0;
         color: red;
         color: white;
         background-color: green;
         padding: 5px 10px;
         border-radius: 5px;
      }

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
         border: 1px solid red;
      }

      li > div {
         padding: 5px;
         font-size: 16px;
      }
      li {
         margin: 5px;
         list-style-type: none;
         max-width: 20%;
         width: 20%;
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         margin-bottom: 20px;
         box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
      }
   }
   @media screen and (max-width: 1260px) {
      ul {
         li .product-element_image img {
            min-width: 45% !important;
         }
      }
      ul {
         li {
            min-width: 45% !important;
         }
      }
   }
`;
export default Product;
