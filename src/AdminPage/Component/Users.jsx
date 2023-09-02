import React, { useEffect } from "react";
import { getUser } from "../../Axios/web";
import { useStateProvider } from "../../StateProvider/StateProvider";
import { reducerCases } from "../../StateProvider/reducer";
import { styled } from "styled-components";

const Users = () => {
  console.log("user");
  const [{ listUser }, dispatch] = useStateProvider();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      if (JSON.stringify(data) != JSON.stringify(listUser)) {
        dispatch({ type: reducerCases.SET_LISTUSER, listUser: data });
      }
    };
    fetchData();
  }, []);
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>

            <th>USERNAME</th>
            <th>PASSWORD</th>
            <th>EMAIL</th>
            <th>CREATE AT</th>
          </tr>
        </thead>
        <tbody>
          {listUser?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.hoTen}</td>
                <td>{user.userName}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
                <td>{user.createdDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};
const Container = styled.div`
  display: flex;

  table {
    border-collapse: collapse;
    flex: 1;
    margin: 20px;
    border: 1px solid;
    thead,
    tbody {
      tr {
        &:hover {
          cursor: pointer;
          background-color: #bcbcbcd2;
        }
        td,
        th {
          text-align: center;
          border: 1px solid;
        }
      }
    }
  }
`;

export default Users;
