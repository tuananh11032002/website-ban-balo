import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

const Address = () => {
  // const data = [
  //   {
  //     name: "Trần Tuấn Anh",
  //     phone: "(+84) 393460403",
  //     address: " 280 ấp Long Binh, Xã Long Nguyên, Huyện Bàu Bàng, Bình Dương",
  //   },
  //   {
  //     name: "Trần Tuấn Anh",
  //     phone: "(+84) 393460403",
  //     address: " 280 ấp Long Binh, Xã Long Nguyên, Huyện Bàu Bàng, Bình Dương",
  //   },
  // ];
  const [data, setData] = useState([
    { id: 1, name: "John", phone: "123-456-7890", address: "123 Main St" },
    { id: 2, name: "Jane", phone: "987-654-3210", address: "456 Elm St" },
    {
      id: 3,
      name: "Trần Tuấn Anh",
      phone: "(+84) 393460403",
      address: " 280 ấp Long Binh, Xã Long Nguyên, Huyện Bàu Bàng, Bình Dương",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    name: "",
    phone: "",
    address: "",
  });

  const handleEdit = (id) => {
    const selectedData = data.find((item) => item.id === id);
    setIsEditing(true);
    setEditedData(selectedData);
  };

  const handleSave = () => {
    const updatedData = data.map((item) =>
      item.id === editedData.id ? editedData : item
    );
    setData(updatedData);
    setIsEditing(false);
    setEditedData({ id: null, name: "", phone: "", address: "" });
  };
  return (
    <Container>
      {isEditing ? (
        <div className="edit-form-overlay">
          <div className="edit-form">
            <input
              type="text"
              placeholder="Tên"
              value={editedData.name}
              onChange={(e) =>
                setEditedData({ ...editedData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={editedData.phone}
              onChange={(e) =>
                setEditedData({ ...editedData, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              value={editedData.address}
              onChange={(e) =>
                setEditedData({ ...editedData, address: e.target.value })
              }
            />
            <button onClick={() => handleSave()}>Lưu</button>
            <AiOutlineClose
              className="close-button"
              onClick={() => {
                setIsEditing(false);
              }}
            />
          </div>
        </div>
      ) : null}
      <nav className="header">
        <div>Địa chỉ của tôi</div>
        <div className="button" onClick={() => setIsEditing(true)}>
          Thêm địa chỉ mới
        </div>
      </nav>
      <div className="data">
        {data ? (
          <>
            {data.map((da, index) => (
              <div key={index} className="data-child">
                <div className="infomation">
                  <div>
                    <b>{da.name}</b> | &nbsp; {da.phone}
                  </div>

                  <div>{da.address}</div>
                </div>
                <div>
                  <i
                    style={{ color: "Highlight" }}
                    onClick={() => {
                      handleEdit(da.id);
                    }}
                  >
                    Chính sửa &nbsp;
                  </i>
                  <i style={{ color: "red" }}>Xoá</i>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </Container>
  );
};
const Container = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid;
    padding: 0.675rem;
    * {
      font-size: 16px;
    }

    .button {
      user-select: none;
      cursor: pointer;
      background-color: #3c3cec;
      color: white;
      font-style: italic;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Tạo hiệu ứng bóng */
      transition: box-shadow 0.3s ease-in-out; /* Tạo transition khi hover */
    }

    .button:hover {
      box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2); /* Hiệu ứng bóng khi hover */
    }
  }

  .data {
    display: flex;
    flex-direction: column;

    .data-child {
      display: flex;
      justify-content: space-between;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
      margin: 10px 0;
      background-color: #f2f2f2;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .infomation {
      flex: 1;
    }

    .infomation div {
      font-size: 1rem;
    }

    .infomation b {
      font-weight: bold;
    }

    .data-child i {
      cursor: pointer;
    }
  }
  .edit-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .edit-form {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 300px;
  }

  .edit-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .edit-form button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
  }

  .edit-form button:hover {
    background-color: #0056b3;
  }

  button {
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }

  .container button:hover {
    background-color: #0056b3;
  }
  .close-button {
    position: absolute;
    top: 0.625rem;
    right: 0.625rem;
    color: red;
    cursor: pointer;
  }
`;
export default Address;
