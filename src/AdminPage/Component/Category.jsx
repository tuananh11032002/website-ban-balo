import React, { useEffect, useState } from "react";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { getCATEGORYAPI, putCategory } from "../../Axios/web";
import { reducerCases } from "../../StateProvider/reducer";
import { styled } from "styled-components";
import { Handler } from "leaflet";

const Category = () => {
  console.log("category");
  // State để lưu trữ vị trí con trỏ chuột khi chuột phải vào
  const [divPosition, setDivPosition] = useState({
    x: 0,
    y: 0,
    data: null,
    add: false,
  });
  const [showDiv, setShowDiv] = useState(false);
  const [showCover, setShowCover] = useState(false);

  const handleContextMenu = (event, dataForm) => {
    event.preventDefault();
    var classRowtable = document.getElementsByClassName("rowtable");
    for (let i = 0; i < classRowtable.length; i++) {
      classRowtable[i].classList.remove("rowtable");
    }
    event.target.parentNode.classList.add("rowtable");
    // Lấy tọa độ chuột khi chuột phải vào
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Đặt vị trí của div xuất hiện tại tọa độ chuột
    setDivPosition({ x: mouseX, y: mouseY, data: dataForm });

    setShowDiv(true);
  };

  const [{ category }, dispatch] = useStateProvider();
  //get data api
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCATEGORYAPI();
      if (
        JSON.stringify(data) != JSON.stringify(category) ||
        category?.length == 0
      ) {
        dispatch({ type: reducerCases.SET_CATEGORY, category: data });
      }
    };
    fetchData();
  }, [category]);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      const childrenDiv = document.querySelector(".cover__infor");

      // Kiểm tra xem phần tử được click có là parent và không thuộc children
      if (!childrenDiv.contains(e.target)) {
        setShowDiv(false);

        setShowCover(false);
      }
    };

    // Đăng kí sự kiện click chuột trái trên toàn bộ document
    document.addEventListener("click", handleDocumentClick);

    // Hủy đăng kí sự kiện khi component unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  const HandleUpdate = () => {
    const input = document.getElementsByClassName("group_category");
    const putData = async (id, category) => {
      const data = await putCategory(id, category);
    };
    putData({
      Id: input[0].value,
      Name: input[1].value,
      Image: input[2].value,
      ImageReplace: input[3].value,
    });
  };
  useEffect(() => {
    const input = document.getElementsByClassName("group_category");
    if (input.length > 0) {
      input[0].value = divPosition.data.id;
      input[1].value = divPosition.data.name;
      input[2].value = divPosition.data.image;
      input[3].value = divPosition.data.imageReplace;
    }
  });
  return (
    <>
      <Container>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Image Replace</th>
          </tr>
        </thead>
        <tbody>
          {category?.map((cate, index) => {
            return (
              <tr
                key={index}
                onContextMenu={(e) => handleContextMenu(e, cate)}
                data-info={cate}
              >
                <td>{cate.id}</td>
                <td>{cate.name}</td>
                <td>
                  <img src={cate.image} alt="" />
                </td>
                <td>
                  <img src={cate.imageReplace} alt="" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Container>
      {/* Div xuất hiện tại vị trí con trỏ chuột */}
      {showDiv && (
        <div
          className="pop-up"
          style={{
            position: "fixed",
            top: divPosition.y,
            left: divPosition.x,
            background: "#f1f1f1",
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
            padding: "10px",
            display: "flex",
            flexDirection: "column", // Hiển thị các nút trong hàng dọc
            alignItems: "center", // Căn giữa các nút trong div
          }}
        >
          {/* Nút "Edit" */}
          <button
            className="edit-button"
            style={{ marginBottom: "5px", cursor: "pointer", width: "60px" }}
            onClick={(e) => {
              e.stopPropagation();
              setShowCover(true);
            }}
          >
            Edit
          </button>
          {/* Nút "Delete" */}
          <button
            className="delete-button"
            style={{ cursor: "pointer", width: "60px" }}
          >
            Delete
          </button>
        </div>
      )}
      {showCover && (
        <Cover>
          <div className="cover__infor ">
            <div className="cover__infor__child">
              <div className="input-child">
                <label>ID:</label>
                <input type="number" className="group_category" />
              </div>
              <div className="input-child">
                <label>Name:</label>
                <input type="text" className="group_category" />
              </div>
              <div className="input-child">
                <label>Image:</label>
                <input type="text" className="group_category" />
              </div>
              <div className="input-child">
                <label>Image Replace:</label>
                <input type="text" className="group_category" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="button"
                onClick={() => {
                  HandleUpdate();
                }}
              >
                Update
              </button>
            </div>
          </div>
        </Cover>
      )}
    </>
  );
};

const Cover = styled.div`
  width: calc(100%); /* 100% - 2 * 10px (left and right padding) */
  height: 100vh; /* 100% - 2 * 10px (top and bottom padding) */
  top: 0;
  position: fixed;
  left: 0;
  z-index: 2;
  background-color: rgba(192, 192, 192, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .cover__infor {
    height: 400px;
    width: 800px;
    background-color: #1d0644;
    border-radius: 2%;
    padding: 2% 0;

    .button {
      border: 1px solid;
      width: 176px;
      height: 47px;
      border-color: red;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: bold;

      justify-content: center;
      &:first-child {
        margin-right: 20px;
      }
    }
    .cover__infor__child {
      height: 80%;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .input-child {
        display: flex;
        width: 100%;
        padding: 20px;
        label {
          display: inline-block;
          width: 160px;
          color: white;
        }
        input {
          flex: 1;
          text-align: center;

          display: inline-block;
          height: 40px;
          font-size: 14px;
        }
      }
    }
  }
`;
const Container = styled.table`
  border-collapse: collapse;
  border: 1px solid #ccc;
  width: 100%;
  .rowtable {
    background-color: hsla(180, 7.69230769230766%, 94.90196078431372%, 0.968);
  }
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
    img {
      max-height: 100px;
      max-width: 100px;
    }
  }

  th {
    background-color: #f2f2f2;
  }
`;
export default Category;
