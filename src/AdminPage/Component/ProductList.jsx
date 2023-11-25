import React, { useContext, useEffect, useState } from 'react';
import {
   AiFillDelete,
   AiOutlineClose,
   AiOutlineHome,
   AiOutlinePlus,
} from 'react-icons/ai';
import { BiSolidDiscount } from 'react-icons/bi';
import { TbAffiliate } from 'react-icons/tb';
import { MdWeb } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';

import styled from 'styled-components';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../Admin';
import {
   ChangeStockApi,
   deleteProductApi,
   getCategoryApi,
   getProductApi,
   getSalesRevenue,
} from '../../Axios/web';
import processApiImagePath from '../../Helper/EditLinkImage';

const ProductList = () => {
   const { closeMenu } = useContext(AdminContext);

   const [data, setData] = useState([
      {
         title: 'Air Jordan is a line of basketball shoes produced by Nike',
         name: 'xxxx',
         image: [
            'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png',
         ],
         categoryName: 'Shoes',
         price: '$125',
         soluong: 110,
         stock: true,
         status: 'publish',
         action: 'none',
      },
      {
         title: 'Air Jordan is a line of basketball shoes produced by Nike',

         name: 'xxxx',
         image: [
            'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png',
         ],
         categoryName: 'Shoes',
         price: '$125',
         soluong: 110,
         stock: true,
         status: 'publish',
         action: 'none',
      },
      {
         title: 'Air Jordan is a line of basketball shoes produced by Nike',

         name: 'xxxx',
         image: [
            'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png',
         ],
         categoryName: 'Shoes',
         price: '$125',
         soluong: 110,
         stock: true,
         status: 'Scheduled',
         action: 'none',
      },
      {
         title: 'Air Jordan is a line of basketball shoes produced by Nike',

         name: 'xxxx',
         image: [
            'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-9.png',
         ],
         categoryName: 'Shoes',
         price: '$125',
         soluong: 110,
         stock: true,
         status: 'Inactive',
         action: 'none',
      },
   ]);
   const [selectAll, setSelectAll] = useState(false);

   const [checkStock, setCheckStock] = useState(data.map((item) => item.stock));

   const [checkboxes, setCheckboxes] = useState(Array(data.length).fill(false));
   const [valueSearch, setValueSearch] = useState('');
   const [selectedValue, setSelectedValue] = useState('7');
   const [openDetailProduct, setOpenDetailProduct] = useState(false);
   const [contentDetailProduct, setContentDetailProduct] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(null);
   const [selectCategory, setSelectCategory] = useState(null);
   const [selectStatus, setSelectStatus] = useState('');
   const [selectStock, setSelectStock] = useState('');
   const [pageNow, setPageNow] = useState(1);

   const [totalProduct, setTotalProduct] = useState(100);
   const [category, setCategory] = useState([]);
   const navigate = useNavigate();
   const toggleSelectAll = () => {
      setSelectAll(!selectAll);
      setCheckboxes(Array(data.length).fill(!selectAll));
   };
   const handleDelete = async (productId) => {
      const data = await deleteProductApi(productId);
      if (data?.status) {
         setData([]);
         setOpenDetailProduct(false);
      }
   };
   const handleCheckboxChange = (index) => {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[index] = !newCheckboxes[index];

      setCheckboxes(newCheckboxes);
   };
   const actionButtonClick = (product) => {
      setContentDetailProduct(product);
      setOpenDetailProduct(true);
   };
   const handleToggle = async (index, productId) => {
      const newCheckStock = [...checkStock];

      newCheckStock[index] = !newCheckStock[index];

      const data = await ChangeStockApi(newCheckStock[index], productId);
      setCheckStock(newCheckStock);
   };

   useEffect(() => {
      setCheckStock(data.map((item) => item.stock));
   }, [data]);
   useEffect(() => {
      const fetchProduct = async () => {
         const dataProduct = await getProductApi(
            valueSearch,
            null,
            selectCategory,
            selectStock,
            selectStatus,
            pageNow,
            selectedValue
         );

         if (dataProduct?.status === true) {
            const { product, totalProduct } = dataProduct.result;
            if (JSON.stringify(data) !== JSON.stringify(product)) {
               setData(product);
               setTotalProduct(totalProduct);
            }
         }
      };
      fetchProduct();
   }, [
      data,
      pageNow,
      selectedValue,
      selectStock,
      selectCategory,
      selectStatus,
      valueSearch,
   ]);
   const [venue, setVenue] = useState({
      inWebsite: {
         totalAmount: 0,
         totalOrder: 0,
      },
      inStore: {
         totalAmount: 0,
         totalOrder: 0,
      },
      inDiscount: {
         totalAmount: 0,
         totalOrder: 0,
      },
      inAffiliate: {
         totalAmount: 0,
         totalOrder: 0,
      },
   });
   useEffect(() => {
      const fetchCategory = async () => {
         const data = await getCategoryApi();
         if (data?.status === true) {
            setCategory(data.result);
         }
      };
      fetchCategory();
      const fetchVenue = async () => {
         const data = await getSalesRevenue();
         console.log(data, 'venue');
         if (data?.status) {
            setVenue(data.result);
         }
      };
      fetchVenue();
   }, []);
   return (
      <>
         {openDetailProduct ? (
            <DetailProduct>
               <div className={`fade ${openDetailProduct ? 'show' : 'hidden'}`}>
                  {/* close-button */}
                  <span
                     className="fade-close"
                     onClick={() => {
                        setOpenDetailProduct(false);
                     }}
                  >
                     <AiOutlineClose />
                  </span>
                  <div className="fade-header">
                     Detail of {contentDetailProduct.name}
                  </div>
                  <div className="fade-main">
                     <table>
                        <tbody>
                           <tr>
                              <td>Product</td>
                              <td className="td-flex">
                                 <img
                                    src={processApiImagePath(
                                       contentDetailProduct.image[0]
                                    )}
                                    alt=""
                                 />
                                 <div>
                                    <div>{contentDetailProduct.name}</div>
                                    <div>{contentDetailProduct.title}</div>
                                 </div>
                              </td>
                           </tr>
                           <tr>
                              <td>Category</td>
                              <td>{contentDetailProduct.categoryName}</td>
                           </tr>
                           <tr>
                              <td>Stock</td>
                              <td>
                                 <label className="toggle-label">
                                    <input
                                       type="checkbox"
                                       checked={checkStock[currentIndex]}
                                       onChange={() => {
                                          handleToggle(
                                             currentIndex,
                                             contentDetailProduct.id
                                          );
                                       }}
                                    />
                                    <span className="toggle-slider"></span>
                                 </label>
                              </td>
                           </tr>
                           <tr>
                              <td>Price</td>
                              <td>{contentDetailProduct.price}</td>
                           </tr>
                           <tr>
                              <td>QTY</td>
                              <td>{contentDetailProduct.soluong}</td>
                           </tr>
                           <tr>
                              <td>Status</td>
                              <td
                                 className={contentDetailProduct.status?.toLowerCase()}
                              >
                                 <span> {contentDetailProduct.status}</span>
                              </td>
                           </tr>
                           <tr>
                              <td>Actions:</td>
                              <td>
                                 <GrEdit
                                    onClick={() => {
                                       navigate(
                                          `/admin/add-product/${contentDetailProduct.id}`
                                       );
                                    }}
                                 />
                                 <AiFillDelete
                                    onClick={() => {
                                       handleDelete(contentDetailProduct.id);
                                    }}
                                 />
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </DetailProduct>
         ) : null}
         <Container>
            <h1>eCommerce / Product List</h1>
            <div className="card-widget-saparater-wrapper">
               <div className="card">
                  <div>
                     <p>In Store Sales</p>
                     <h1>{venue.inStore.totalAmount.toLocaleString()}đ</h1>
                     <p>
                        <span> {venue.inStore.totalOrder} orders</span>
                        <span className="card-widget-rate-increase">+5.7%</span>
                     </p>
                  </div>
                  <div>
                     <AiOutlineHome />
                  </div>
               </div>
               <div className="card">
                  <div>
                     <p> Website Sales</p>
                     <h1>{venue.inWebsite.totalAmount.toLocaleString()}đ</h1>
                     <p>
                        <span> {venue.inWebsite.totalOrder} orders</span>
                        <span className="card-widget-rate-increase">
                           +12.4%
                        </span>
                     </p>
                  </div>
                  <div>
                     <MdWeb />
                  </div>
               </div>
               <div className="card">
                  <div>
                     <p>Discount</p>
                     <h1>{venue.inDiscount.totalAmount.toLocaleString()}đ</h1>
                     <p>
                        <span> {venue.inDiscount.totalOrder} orders</span>
                        <span className="card-widget-rate-increase">+5.7%</span>
                     </p>
                  </div>
                  <div>
                     <BiSolidDiscount />
                  </div>
               </div>
               <div className="card">
                  <div>
                     <p> Affiliate</p>
                     <h1>{venue.inAffiliate.totalAmount.toLocaleString()}đ</h1>
                     <p>
                        <span> {venue.inAffiliate.totalOrder} orders</span>
                        <span className="card-widget-rate-decrease">-3.5%</span>
                     </p>
                  </div>
                  <div>
                     <TbAffiliate />
                  </div>
               </div>
            </div>
            <div className="datatable">
               <div className="datatable-filter">
                  <div className=" product_status">
                     <select
                        value={selectStatus}
                        onChange={(e) => {
                           setSelectStatus(e.target.value);
                           setPageNow(1);
                        }}
                     >
                        <option value="">Status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Publish">Publish</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                  </div>
                  <div className="product_category">
                     <select
                        value={selectCategory}
                        onChange={(e) => {
                           setPageNow(1);

                           setSelectCategory(e.target.value);
                        }}
                     >
                        <option value="">Category</option>
                        {category?.map((cat, index) => (
                           <option value={cat.id} key={index}>
                              {cat.name}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="product_stock">
                     <select
                        value={selectStock}
                        onChange={(e) => {
                           setSelectStock(e.target.value);
                           setPageNow(1);
                        }}
                     >
                        <option value="" defaultValue>
                           Stock
                        </option>
                        <option value="Out">Out of Stock</option>
                        <option value="In">In Stock</option>
                     </select>
                  </div>
               </div>
               <div className="datatable-action">
                  <input
                     className="search-input"
                     type="text"
                     placeholder="Search"
                     value={valueSearch}
                     onChange={(e) => {
                        setPageNow(1);
                        setValueSearch(e.target.value);
                     }}
                  />
                  <div className="dttable-action-button">
                     <select
                        className="action-select"
                        name=""
                        id=""
                        onChange={(e) => {
                           setSelectedValue(e.target.value);
                           setPageNow(1);
                           window.scrollTo(0, 200);
                        }}
                     >
                        <option value="7">7</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                     </select>
                     <div
                        className="action-button"
                        onClick={() => {
                           navigate('/admin/add-product/add');
                        }}
                     >
                        <AiOutlinePlus />
                        <span>Add Product</span>
                     </div>
                  </div>
               </div>
               <div className="wrapper-table">
                  <table className="datatable-product">
                     <thead>
                        <tr>
                           <th></th>
                           <th>
                              <input
                                 type="checkbox"
                                 checked={selectAll}
                                 onChange={toggleSelectAll}
                              />
                           </th>
                           <th colSpan="3">PRODUCT</th>
                           <th>CATEGORY</th>

                           <th>STOCK</th>
                           <th>PRICE</th>
                           <th>QTY</th>
                           <th>STATUS</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data?.map((product, index) => (
                           <tr key={index}>
                              <td
                                 className="td-action"
                                 onClick={() => {
                                    actionButtonClick(product);
                                    closeMenu();
                                    setCurrentIndex(index);
                                 }}
                              >
                                 <span>
                                    <AiOutlinePlus />
                                 </span>
                              </td>
                              <td>
                                 <input
                                    type="checkbox"
                                    checked={checkboxes[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                 />
                              </td>
                              <td colSpan="3">
                                 <div className="td-flex">
                                    <img
                                       src={processApiImagePath(
                                          product?.image[0]
                                       )}
                                       alt=""
                                       width="40px"
                                       height="40px"
                                    />
                                    <div>
                                       <div>{product.name}</div>
                                       <div>{product.title}</div>
                                    </div>
                                 </div>
                              </td>
                              <td>{product.categoryName}</td>
                              <td>
                                 <label className="toggle-label">
                                    <input
                                       type="checkbox"
                                       checked={checkStock[index]}
                                       onChange={() => {
                                          handleToggle(index, product.id);
                                       }}
                                    />
                                    <span className="toggle-slider"></span>
                                 </label>
                              </td>
                              <td>{product.price.toLocaleString()}đ</td>
                              <td>{product.soluong}</td>
                              <td className={product.status.toLowerCase()}>
                                 <span>{product.status}</span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
            <Pagination
               setPageNow={setPageNow}
               obj={{
                  pageNow: pageNow,
                  size: selectedValue,
                  totalProduct: totalProduct || 100,
               }}
            />
         </Container>
      </>
   );
};
const boxShadow = '0 0.375rem 1rem 0 rgba(61, 55, 70, 0.12)';
const borderRadius = '0.375rem';
const DetailProduct = styled.div`
   width: 100%;
   height: 100%;
   background-color: rgba(128, 128, 128, 0.5);
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   z-index: 2;
   display: flex;
   justify-content: center;
   transform: translateY(0%);

   .fade {
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      padding: 20px;
      transition: opacity 0.3s ease;
      width: 400px;
      height: 400px;
      transform: translateY(20%);
   }

   .fade.show {
      opacity: 1;
   }

   .fade.hidden {
      opacity: 0;
      pointer-events: none; /* Disable interaction when hidden */
   }

   .fade-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      font-size: 20px;
      color: #333;
   }

   .fade-header {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
   }

   .fade-main {
      font-size: 14px;
   }

   /* Add additional styles for the table and other elements as needed */
   table {
      width: 100%;
   }

   td {
      padding: 5px;
   }

   td.td-flex {
      display: flex;
      align-items: center;
      justify-content: flex-start;
   }

   img {
      max-width: 50px;
      max-height: 50px;
      margin-right: 10px;
      border-radius: 10px;
   }

   input[type='checkbox'] {
      visibility: hidden;
   }
   td {
      .toggle-label {
         position: relative;
         display: inline-block;
         width: 40px; /* Điều chỉnh chiều rộng */
         height: 20px; /* Điều chỉnh chiều cao */
      }

      .toggle-slider {
         position: absolute;
         cursor: pointer;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         background-color: #ccc;
         border-radius: 20px; /* Điều chỉnh độ cong của góc */
         transition: 0.4s;
      }

      .toggle-slider:before {
         position: absolute;
         content: '';
         height: 16px; /* Điều chỉnh chiều cao của nút trượt */
         width: 16px; /* Điều chỉnh chiều rộng của nút trượt */
         left: 2px; /* Điều chỉnh vị trí từ trái */
         bottom: 2px; /* Điều chỉnh vị trí từ dưới */
         background-color: white;
         border-radius: 50%;
         transition: 0.4s;
      }
      .toggle-label input:checked + .toggle-slider {
         background-color: #007bff; /* Màu nền của toggle khi bật */
      }

      .toggle-label input:checked + .toggle-slider:before {
         transform: translateX(20px);
      }
   }

   .publish {
      font-weight: bold;
      color: #008000; /* Màu xanh dương cho trạng thái 'Active' */
      span {
         background-color: #e6f7d9 !important ;
         border-radius: 50rem !important;
         padding: 8px;
      }
   }

   .inactive {
      font-weight: bold;

      color: #ff0000; /* Màu đỏ cho trạng thái không 'Active' */
      span {
         background-color: #ffe4e5 !important;
         border-radius: 50rem !important;
         padding: 8px;
      }
   }
   .scheduled {
      font-weight: bold;

      color: #ffb400; /* Màu cam cho trạng thái không 'Scheduled' */
      span {
         background-color: #fff4d9 !important;
         border-radius: 50rem !important;
         padding: 8px;
      }
   }
   .td-flex {
      display: flex;
      justify-content: center;
      div {
         text-align: left;
      }
      img {
         max-width: 40px;
         border-radius: 10px;
         max-height: 40px;
      }
   }
   td svg {
      margin-right: 10px;
   }
`;
const Container = styled.div`
   opacity: 1;
   z-index: 1;
   h1 {
      font-size: 2rem;
   }
   .card-widget-saparater-wrapper {
      display: flex;
      flex-wrap: wrap;
      border-radius: ${borderRadius};

      box-shadow: ${boxShadow};
      background-color: white;
      .card {
         flex: 1;
         display: flex;
         justify-content: space-around;
         align-items: center;
         flex-direction: row;
         margin: 10px;
         border: none;
         position: relative; /* Thêm position relative */
      }

      .card:not(:last-child)::after {
         content: '';
         width: 1px;
         background-color: #e7e7e8;
         position: absolute;
         top: 10px;
         bottom: 10px;
         right: -10px;
      }
      .card-widget-rate-increase {
         color: #56ca00 !important;
         background-color: #e6f7d9;
      }
      .card-widget-rate-decrease {
         background-color: #ffe4e5 !important;
         color: #ff4c51 !important;
      }
      .card svg {
         width: 40px;
         height: 40px;
      }
      @media (max-width: 1215px) {
         .card {
            min-width: calc(50% - 20px);
            border-bottom: 1px solid #e7e7e8 !important;
         }
      }

      @media (max-width: 480px) {
         .card {
            min-width: calc(100% - 20px);
         }
      }
   }
   .wrapper-table {
      max-width: 100%;
      overflow: scroll;
      box-shadow: ${boxShadow};
      border-radius: 5px;
   }
   .datatable {
      background-color: white;
      margin: 10px 0 0 0;
      & > div {
         margin-bottom: 10px;
      }
      .datatable-filter {
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding: 1.5rem 0;
         flex-wrap: wrap;
      }
      .datatable-filter div {
         display: flex;
         flex: 1;
         margin: 0 10px;
      }
      .datatable-filter select {
         padding: 5px;
         border: 1px solid #ccc;
         border-radius: 4px;
         width: 100%; /* Chiều rộng bằng chiều rộng của cha */
         background-color: transparent; /* Loại bỏ màu nền của select */
         transition: border 0.3s; /* Hiệu ứng border */
      }

      .datatable-filter select:focus {
         border: 2px solid #9055fd; /* Hiệu ứng border khi được chọn */
      }

      /* Điều chỉnh màu nền và các kiểu khác cho các select phù hợp với mục tiêu của bạn */

      /* Đặt kiểu cho bảng */
      .datatable-product {
         width: 100%;
         border-collapse: collapse;
         border-spacing: 0;
         border: 1px solid #ccc;
         overflow: hidden;
      }
      .datatable-product thead th,
      .datatable-product tbody td {
         border-bottom: 1px solid #e7e7e8;
      }
      /* Đặt kiểu cho header của bảng */
      .datatable-product thead th {
         background-color: #f5f5f5;
         font-weight: bold;
         padding: 1.5rem;
      }

      /* Đặt kiểu cho ô trong tbody */
      .datatable-product tbody td {
         padding: 1.5rem;
      }

      /* Đặt kiểu cho checkbox */
      .datatable-product input[type='checkbox'] {
         margin: 0;
         padding: 0 10px;
         visibility: hidden;
      }
      input[type='checkbox'] {
         transform: scale(1.5);
         margin-right: 5px;
      }

      input[type='checkbox']:checked {
         background-color: #007bff;
         border: 2px solid #007bff;
      }
      /* Đặt kiểu cho cột "ACTIONS" */
      .datatable-product td:last-child {
         text-align: center;
      }
      .datatable-product .td-action svg {
         fill: white;
      }
      .datatable-product .td-action span {
         display: flex;
         justify-content: center;
         align-items: center;
         width: 25px;
         height: 25px;
         background-color: #9055fd;
         border: 2px solid #fff;
         box-shadow: 0 0 3px rgba(58, 53, 65, 0.8);
         border-radius: 50%;
      }

      .datatable-product .td-flex {
         display: flex;
         div {
            margin-left: 10px;
            text-align: left;
         }
      }

      .datatable-product td {
         .toggle-label {
            position: relative;
            display: inline-block;
            width: 40px; /* Điều chỉnh chiều rộng */
            height: 20px; /* Điều chỉnh chiều cao */
         }

         .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            border-radius: 20px; /* Điều chỉnh độ cong của góc */
            transition: 0.4s;
         }

         .toggle-slider:before {
            position: absolute;
            content: '';
            height: 16px; /* Điều chỉnh chiều cao của nút trượt */
            width: 16px; /* Điều chỉnh chiều rộng của nút trượt */
            left: 2px; /* Điều chỉnh vị trí từ trái */
            bottom: 2px; /* Điều chỉnh vị trí từ dưới */
            background-color: white;
            border-radius: 50%;
            transition: 0.4s;
         }
         .toggle-label input:checked + .toggle-slider {
            background-color: #007bff; /* Màu nền của toggle khi bật */
         }

         .toggle-label input:checked + .toggle-slider:before {
            transform: translateX(20px);
         }
      }
      /* Đặt kiểu cho cột "STATUS" */
      .datatable-product .publish {
         text-align: center;
         font-weight: bold;
         color: #008000; /* Màu xanh dương cho trạng thái 'Active' */
         span {
            background-color: #e6f7d9 !important ;
            border-radius: 50rem !important;
            padding: 8px;
         }
      }

      .datatable-product .inactive {
         color: #ff0000; /* Màu đỏ cho trạng thái không 'Active' */
         span {
            background-color: #ffe4e5 !important;
            border-radius: 50rem !important;
            padding: 8px;
         }
      }
      .datatable-product .scheduled {
         color: #ffb400; /* Màu cam cho trạng thái không 'Scheduled' */
         span {
            background-color: #fff4d9 !important;
            border-radius: 50rem !important;
            padding: 8px;
         }
      }

      .datatable-action {
         display: flex;
         width: 100%;
         justify-content: space-between;
         align-items: center;
         padding: 10px;
         border-radius: 5px;
         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .search-input {
         flex: 1;
         padding: 8px;
         border: none;
         border-radius: 5px;
         font-size: 14px;
      }

      .dttable-action-button {
         display: flex;
         align-items: center;
         flex: 1;
         justify-content: flex-end;
      }

      .action-select {
         background-color: #fff;
         padding: 8px;
         border-radius: 5px;
         font-size: 14px;
         margin-right: 10px;
      }

      .action-button {
         background-color: #007bff;
         color: #fff;
         padding: 10px 20px;
         border: none;
         border-radius: 5px;
         cursor: pointer;
         font-size: 14px;
         text-align: center;
         display: flex;
         align-items: center;
         justify-content: center;
      }

      .action-button:hover {
         background-color: #0056b3;
      }
   }
   @media screen and (max-width: 756px) {
      .datatable-filter div {
         min-width: calc(100%);
         margin: 1rem 0 !important;
      }
   }
   @media screen and (max-width: 600px) {
      .action-button span {
         display: none;
      }
   }
`;

export default ProductList;
