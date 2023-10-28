import React, { useRef, useState } from "react";
import styled from "styled-components";

export const AddProduct = () => {
  const imageInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [quantity, setQuantity] = useState(0);

  const [dataCategory, setDataCategory] = useState([
    "Electric",
    "Household",
    "Shoes",
  ]);
  const [options, setOptions] = useState([{ type: "", value: "" }]);

  const handleAddOption = () => {
    setOptions([...options, { type: "", value: "" }]);
  };
  const handleDelOption = (index) => {
    const newOption = options?.filter((temp, indexTemp) => index !== indexTemp);
    if (newOption.length > 0) {
      setOptions(newOption);
    }
  };

  const handleTypeChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index].type = event.target.value;
    setOptions(updatedOptions);
  };

  const handleValueChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index].value = event.target.value;
    setOptions(updatedOptions);
  };

  const handleBrowseImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage([...selectedImage, file]);
  };
  const handleDrop = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định khi thả tệp vào trình duyệt

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const newImages = Array.from(files);
      setSelectedImage([...selectedImage, ...newImages]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định khi kéo tệp qua trình duyệt
  };
  return (
    <Container>
      <div className="header-add">
        <div class="left-content">
          <div class="bold-text">Add a new Product</div>
          Orders placed across your store
        </div>
        <div class="right-content">
          <button class="publish-button">PUBLISH PRODUCT</button>
        </div>
      </div>
      <div className="content">
        <div className="card">
          <div className="product">
            <div className="card-header">PRODUCT INFORMATION</div>
            <div className="card-body">
              <div>
                <input type="text" placeholder="Name" />
              </div>
              <div>
                <input type="text" className="col" placeholder="Comment" />
                <select defaultValue="" className="col">
                  {dataCategory?.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="card-header">Media</div>
            <div className="card-body">
              <div>
                <input
                  type="file"
                  id="imageInput"
                  ref={imageInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <form
                  action=""
                  className="dropzone"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div
                    className="dropzone-div"
                    onClick={() => handleBrowseImageClick()}
                  >
                    {selectedImage.length > 0 ? (
                      <div className="image-list">
                        {selectedImage?.map((image, index) => (
                          <div className="image">
                            <img
                              src={URL.createObjectURL(image)}
                              alt="Selected"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: "24px", textAlign: "center" }}>
                          Drag and drop your image here
                        </div>
                        <small className="">or</small>
                        <span className="btn" id="btnBrowse">
                          Browse image
                        </span>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="option">
            <div className="card-header">Option</div>
            <div className="card-body">
              {options.map((option, index) => (
                <div key={index} className="input-row">
                  <select
                    value={option.type}
                    onChange={(e) => handleTypeChange(index, e)}
                  >
                    <option value="">Chọn loại</option>
                    <option value="size">Size</option>
                    <option value="color">Color</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Value"
                    value={option.value}
                    onChange={(e) => handleValueChange(index, e)}
                  />
                  <span
                    className="custom-span"
                    onClick={() => handleDelOption(index)}
                  >
                    Xóa
                  </span>
                </div>
              ))}
              <button
                className="add-option-button"
                onClick={() => handleAddOption()}
              >
                Thêm Option
              </button>
            </div>
          </div>
          <div className="quantity">
            <div className="card-header">QUANTITY</div>
            <div className="card-body">
              <div className="input-row ">
                <input
                  type="number"
                  placeholder="Nhập số lượng cần thêm"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                  onClick={() =>
                    alert(`Bạn đã thêm ${quantity} sản phẩm vào kho!`)
                  }
                >
                  Confirm
                </button>
              </div>
              <div className="product-info">
                <p>Product in stock now: 54</p>
                <p>Product in transit: 390</p>
                <p>Last time restocked: 24th June, 2023</p>
                <p>Total stock over lifetime: 2430</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card price">
          <div className="card-header">PRICE INFORMATION</div>
          <div className="card-body">
            <div className="input-container">
              <input
                type="text"
                placeholder="Best Price"
                className="price-input"
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Discounted Price"
                className="price-input"
              />
            </div>
            <div className="input-container">
              <input type="checkbox" className="calculate-button" />
              Tính thuế cho sản phẩm này
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  .header-add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

    .left-content {
      display: flex;
      flex-direction: column;
    }

    .bold-text {
      font-size: 24px;
      font-weight: bold;
    }

    .publish-button {
      background-color: #3399ff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    .card {
      flex: 2;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
    .card-header {
      font-weight: bold;
      width: 100%;
    }
    .card-body {
      padding: 0 20px 20px 20px;
      margin: 10px 0;
      width: 100%;
    }

    .product {
      display: flex;
      flex-direction: column;

      .card-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .card-body > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
      }

      .card-body input[type="text"] {
        padding: 5px;
        width: 100%;
      }
      .col {
        width: 50%;
      }
      .card-body select {
        padding: 5px;
      }

      .col {
        margin-right: 10px; /* Khoảng cách giữa input và select */
      }
    }

    .price {
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      border-radius: 5px;
      flex: 1;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

      .card-body {
        background-color: white;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .input-container {
        display: flex;
        width: 100%;
        margin-bottom: 10px;
      }
    }

    .dropzone {
      border: 2px dashed #e7e7e8;
      border-radius: 0.375rem;
      .dropzone-div {
        font-size: 2.25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1.25rem;
      }
      .dropzone-div .image-list {
        display: flex;
      }
      .dropzone-div .image-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }

      .dropzone-div .image {
        max-width: 25%;
        max-height: 25%;
      }

      .dropzone-div .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .btn {
        color: #9055fd;
        border-color: #c8aafe;
        cursor: hover;
        font-weight: 500;
      }
    }
    .option {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .input-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
        .custom-span {
          font-weight: bold;
          font-size: 16px;
          color: #ff0000;
          text-decoration: underline;
          cursor: pointer;
        }

        .custom-span:hover {
          color: #cc0000;
        }
        select,
        input {
          width: 40%;
        }
      }

      .add-option-button {
        max-width: 200px;
        width: 100%;
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 15px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
      }

      .add-option-button:hover {
        background-color: #2980b9;
        transform: scale(1.025);
      }
    }
    .quantity {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .input-row {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 10px;
      }

      input,
      button {
        width: 45%;
      }

      .button-container {
        text-align: center;
        width: 50%;
      }

      button {
        background-color: #2ecc71;
        color: #ffffff;
        padding: 10px;
        border: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: background-color 0.3s;
      }

      button:hover {
        background-color: #27ae60;
      }

      .product-info {
        margin-top: 20px;
      }

      .product-info p {
        margin: 5px 0;
      }
    }

    @media screen and (max-width: 1000px) {
      .card {
        min-width: 95%;
        margin-bottom: 20px;
      }
    }
  }

  button {
    border-radius: 5px;
  }
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    color: #333;
    font-size: 16px;
  }
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    color: #333;
    font-size: 16px;
    appearance: none;
  }

  select:focus {
    background-color: #fff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  select:hover {
    background-color: #f0f0f0;
  }
`;
