import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { addCategory, addFile } from "../../Axios/web";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";

export const AddCategory = ({ setAddCategory }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFile] = useState([]);
  const [{user},dispatch] = useStateProvider();

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    setFile((prevFiles)=>[...prevFiles, file]);
    // if (file && file.type === "image/jpeg" && file.size < 1000000) {
    //   // Only accept JPEG files smaller than 1 MB
    //   
    // } else {
    //   // Handle invalid file input
    // }
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const idFile = await addFile(files);
    console.log("idFile:",idFile);
    // const userTmp = user; 
    // userTmp.token = idFile.resetToken;
    // dispatch({type:reducerCases.SET_USER, user: userTmp});
    const userTmp = localStorage.getItem("webbanbalo_user");
    let userTmp1 = JSON.parse(userTmp);
    userTmp1.token = idFile.resetToken;
    await localStorage.setItem("webbanbalo_user", JSON.stringify(userTmp1));
    const idImg = idFile.data.data.id;//get id image
    if(idFile.resetToken != null){
      console.log("idImg", idImg);
      const data = await addCategory({name:name, icon:idImg});
      console.log("newCate:",data);
      userTmp1.token = data.resetToken;
      await localStorage.setItem("webbanbalo_user", JSON.stringify(userTmp1));
    }else {

    }
  };
  
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <span
          className="close-button"
          onClick={() => {
            setAddCategory(false);
          }}
        >
          <MdClose />
        </span>
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Name Category" />
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Title" />
        <input type="file" onChange={handleFileChange} />
        <div className="select-wrapper">
          <label>Status</label>
          <select>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(204, 204, 204, 0.5);

  form {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 80%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    animation: slide 0.2s linear;
    position: relative;
    @keyframes slide {
      from {
        transform: translate(100%);
      }
      to {
        transform: translate(0%);
      }
    }
    .close-button {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
      color: red;
    }

    input {
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    label {
      margin-bottom: 5px;
    }

    .select-wrapper {
      margin-bottom: 10px;

      select {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
      }
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

export default AddCategory;
