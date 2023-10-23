import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

export const AddCategory = ({ setAddCategory }) => {
  return (
    <Container>
      <form>
        <span
          className="close-button"
          onClick={() => {
            setAddCategory(false);
          }}
        >
          <MdClose />
        </span>
        <input type="text" placeholder="Name Category" />
        <input type="text" placeholder="Title" />
        <input type="file" />
        <div className="select-wrapper">
          <label>Status</label>
          <select>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <button>Add</button>
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
