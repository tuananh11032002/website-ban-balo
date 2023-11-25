import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import styled from 'styled-components';
import { AddCategory } from './AddCategory';
import { AdminContext } from '../Admin';
import { deleteCategoryApi, getCategoryApiForAdmin } from '../../Axios/web';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import processApiImagePath from '../../Helper/EditLinkImage';
import ConfirmationDialog from '../../Sharing/MessageBox';

const CategoryList = () => {
   const { closeMenu } = useContext(AdminContext);
   const [categoryId, setCategoryId] = useState(null);
   const [selectedValue, setSelectedValue] = useState('7');
   const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
   const [data, setData] = useState([
      {
         id: 1,
         name: 'xxxx',
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-5.png',
         category: 'Accessories',
         totalProduct: 4186,
         totalEarning: '$7912.99',
         action: 'none',
      },
      {
         id: 1,
         name: 'xxxx',
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-5.png',
         category: 'Accessories',
         totalProduct: 4186,
         totalEarning: '$7912.99',
         action: 'none',
      },
      {
         id: 1,
         name: 'xxxx',
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-5.png',
         category: 'Accessories',
         totalProduct: 4186,
         totalEarning: '$7912.99',
         action: 'none',
      },
      {
         id: 1,
         name: 'xxxx',
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-5.png',
         category: 'Accessories',
         totalProduct: 4186,
         totalEarning: '$7912.99',
         action: 'none',
      },
      {
         id: 1,
         name: 'xxxx',
         image: 'https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/ecommerce-images/product-5.png',
         category: 'Accessories',
         totalProduct: 4186,
         totalEarning: '$7912.99',
         action: 'none',
      },
   ]);
   const [search, setSearch] = useState('');
   const [selectAll, setSelectAll] = useState(false);

   const [checkboxes, setCheckboxes] = useState(Array(data.length).fill(false));
   const messageBoxRef = useRef();

   const handleYes = async () => {
      await deleteCategoryApi(categoryId);
      fetchCategory();
   };

   const handleNo = () => {};
   const toggleSelectAll = () => {
      setSelectAll(!selectAll);
      setCheckboxes(Array(data.length).fill(!selectAll));
   };

   const handleCheckboxChange = (index) => {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[index] = !newCheckboxes[index];
      setCheckboxes(newCheckboxes);
   };
   const handleDelete = async (categoryId) => {
      messageBoxRef.current.show();
      setCategoryId(categoryId);
   };
   const fetchCategory = async () => {
      const response = await getCategoryApiForAdmin(search);
      console.log(response, 'respnse');
      if (response?.status === true) {
         if (JSON.stringify(data) !== JSON.stringify(response.result)) {
            console.log('response.result', response.result);
            setData(response.result);
         }
      }
   };
   useEffect(() => {
      fetchCategory();
   }, [search]);
   return (
      <Container>
         <ConfirmationDialog
            ref={messageBoxRef}
            onYesClick={handleYes}
            onNoClick={handleNo}
         />
         {isOpenAddCategory ? (
            <AddCategory
               setIsOpenAddCategory={setIsOpenAddCategory}
               categoryId={categoryId}
               setCategoryId={setCategoryId}
            />
         ) : null}
         <h1>eCommerce / Category List</h1>

         <div className="datatable">
            <div className="datatable-action">
               <input
                  className="search-input"
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                     setSearch(e.target.value);
                  }}
               />
               <div className="dttable-action-button">
                  <select
                     className="action-select"
                     name=""
                     id=""
                     onChange={(e) => setSelectedValue(e.target.value)}
                  >
                     <option value="7">7</option>
                     <option value="10">10</option>
                     <option value="20">20</option>
                     <option value="50">50</option>
                  </select>
                  <div
                     className="action-button"
                     onClick={(e) => {
                        e.preventDefault();
                        setIsOpenAddCategory(true);
                        closeMenu();
                     }}
                  >
                     <AiOutlinePlus />
                     <span>Add Category</span>
                  </div>
               </div>
            </div>
            <div className="wrapper-table">
               <table className="datatable-product">
                  <thead>
                     <tr>
                        <th>
                           <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={toggleSelectAll}
                           />
                        </th>
                        <th>CATEGORY</th>
                        <th>IMAGE</th>
                        <th>IMAGE REPLACE</th>

                        <th>TOTAL PRODUCT</th>

                        <th>TOTAL EARNING</th>
                        <th>ACTION</th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.map((category, index) => (
                        <tr key={index}>
                           <td>
                              <input
                                 type="checkbox"
                                 checked={checkboxes[index]}
                                 onChange={() => handleCheckboxChange(index)}
                              />
                           </td>
                           <td>{category.name}</td>
                           <td>
                              <div className="td-flex">
                                 <img
                                    src={
                                       processApiImagePath(category.image) ||
                                       category.image
                                    }
                                    alt=""
                                    width="40px"
                                    height="40px"
                                 />
                                 <div>{category.category}</div>
                              </div>
                           </td>
                           <td>
                              <div className="td-flex">
                                 <img
                                    src={processApiImagePath(
                                       category.imageReplace
                                    )}
                                    alt=""
                                    width="40px"
                                    height="40px"
                                 />
                                 <div>{category.category}</div>
                              </div>
                           </td>
                           <td>{category.totalProduct} products</td>

                           <td>{category.totalEarning.toLocaleString()}đ</td>

                           <td className="td-action">
                              <FiEdit2
                                 onClick={() => {
                                    setIsOpenAddCategory(true);
                                    setCategoryId(category.id);
                                 }}
                              />
                              <RiDeleteBin3Line
                                 onClick={() => {
                                    handleDelete(category.id);
                                 }}
                              />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </Container>
   );
};

const Container = styled.div`
   height: 100%;
   h1 {
      font-size: 2rem;
   }

   .wrapper-table {
      max-width: 100%;
      overflow: scroll;
   }
   .datatable {
      background-color: white;
      margin: 10px 0 0 0;

      /* Đặt kiểu cho bảng */
      .datatable-product {
         width: 100%;
         border-collapse: collapse;
         border-spacing: 0;
         border: 1px solid #ccc;
         overflow: hidden;
      }

      /* Đặt kiểu cho header của bảng */
      .datatable-product thead th {
         background-color: #f5f5f5;
         font-weight: bold;
         text-align: center;
         padding: 1.5rem;
      }

      /* Đặt kiểu cho ô trong tbody */
      .datatable-product tbody td {
         padding: 1.5rem;
         text-align: center;
      }
      .datatable-product thead th,
      .datatable-product tbody td {
         border-bottom: 1px solid #e7e7e8;
      }

      /* Đặt kiểu cho checkbox */
      .datatable-product input[type='checkbox'] {
         margin: 0;
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
         margin-right: 10px;
         font-size: 20px;
      }
      .datatable-product td:nth-child(2) {
         .td-flex {
            display: flex;
            justify-content: center;
            align-items: center;
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

      .datatable-product .Inactive {
         color: #ff0000; /* Màu đỏ cho trạng thái không 'Active' */
         span {
            background-color: #ffe4e5 !important;
            border-radius: 50rem !important;
            padding: 8px;
         }
      }
      .datatable-product .Scheduled {
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
      }

      .action-button:hover {
         background-color: #0056b3;
      }
   }

   @media screen and (max-width: 600px) {
      .action-button span {
         display: none;
      }
   }
`;

export default CategoryList;
