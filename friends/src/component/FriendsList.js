import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Friend from "./Friend";

const FreindsListContainer = styled.div`
  padding: 10px;

  overflow-y: auto;
`;

const AddFriendLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;

  border: 1px solid black;
  font-size: 1.6rem;
  text-decoration: none;
`;

class FriendsList extends React.Component {
  render() {
    const { friends, deleteFriend } = this.props;
    return (
      <FreindsListContainer>
        <AddFriendLink to="add">Add New Friend</AddFriendLink>
        {friends.map(friend => (
          <Friend key={friend.id} friend={friend} deleteFriend={deleteFriend} />
        ))}
      </FreindsListContainer>
    );
  }
}
export default FriendsList;
