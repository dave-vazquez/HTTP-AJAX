import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;

  width: 80px;
  height: 25px;

  border: 1px solid black;

  color: blue;
  font-size: 1.2rem;
  text-align: center;
  line-height: 25px;
  text-decoration: none;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;

  width: 80px;
  height: 25px;

  border: 1px solid black;

  color: blue;
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
`;

const FriendContainer = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 20px;
  margin-top: 10px;

  width: 500px;

  div {
    margin-right: 20px;
    img {
      width: 75px;
      border-radius: 50%;
    }
  }

  section {
    h1 {
      font-size: 1.6rem;
    }

    p {
      font-size: 1.4rem;
      margin-top: 10px;
      text-decoration: none;
    }
  }
`;

class Friend extends React.Component {
  render() {
    const { id, image, name, age, email } = this.props.friend;
    return (
      <FriendContainer>
        <div>
          <img src={image} alt={name} />
        </div>

        <section>
          <h1>{name}</h1>
          <p>Age: {age}</p>
          <p>Email: {email}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "170px",
              marginTop: "10px"
            }}
          >
            <StyledLink to={`edit/${id}`}>Update</StyledLink>
            <StyledButton>Delete</StyledButton>
          </div>
        </section>
      </FriendContainer>
    );
  }
}
export default Friend;
