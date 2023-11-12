import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function Pagination({ obj, setPageNow }) {
  const { totalProduct, pageNow, size } = obj;
  useEffect(() => {
    setCurrentPage(pageNow);
  }, [pageNow]);
  const [currentPage, setCurrentPage] = useState(pageNow);
  const totalPage = Math.ceil(totalProduct / size);
  const onPageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    setPageNow(pageNumber);
  }, []);

  const renderPaginationButtons = () => {
    const maxButtons = 5;
    const buttons = [];
    let keyAuto = 0;
    let startPage = currentPage - Math.floor(maxButtons / 2);

    if (startPage < 1) {
      startPage = 1;
    }

    if (startPage > 1) {
      buttons.push(
        <button key="1" onClick={() => onPageChange(1)}>
          1
        </button>
      );

      if (startPage > 2) {
        buttons.push(
          <span key={uuidv4()} className="ellipsis">
            ...
          </span>
        );
      }
    }

    const endPage = Math.min(startPage + maxButtons - 1, totalPage);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={i === currentPage ? "active-paging" : ""}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        buttons.push(
          <span key="ellipsis" className="ellipsis">
            ...
          </span>
        );
      }
      buttons.push(
        <button key={totalPage} onClick={() => onPageChange(totalPage)}>
          {totalPage}
        </button>
      );
    }

    return buttons;
  };

  return (
    <Container>
      <div>
        Displaying {Math.max(1, (currentPage - 1) * size + 1)} to{" "}
        {Math.min(currentPage * size, totalProduct)} of {totalProduct} entries
      </div>
      <div>{totalPage > 1 && renderPaginationButtons()}</div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin: 2px;
    padding: 5px 10px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s, border 0.3s;
    border: none;
    border-radius: 50%;
  }

  button:hover {
    background-color: #f0f0f0;
  }

  button.active-paging {
    background-color: #9055fd;
    color: #fff;
    border: 2px solid #9055fd;
  }

  .ellipsis {
    padding: 5px 0;
    margin: 0 5px;
    font-weight: bold;
  }
`;
export default Pagination;
