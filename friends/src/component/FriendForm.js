import React from "react";
import styled from "styled-components";

const FriendFormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 50%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 10px;

  margin-top: 70px;

  border: 1px solid black;

  input {
    margin: 5px 0;
  }
`;

const FormHeader = styled.h1`
  font-size: 1.6rem;
  text-align: center;
`;

class FriendForm extends React.Component {
  state = {
    friend: this.props.activeFriend || {
      id: undefined,
      name: "",
      age: undefined,
      email: "",
      image: ""
    }
  };

  onChangeHandler = e => {
    e.persist();

    this.setState(prevState => ({
      friend: {
        ...prevState.friend,
        [e.target.name]: e.target.value
      }
    }));
  };

  onSubmitHandler = e => {
    e.preventDefault();
    
    this.props.activeFriend
      ? this.props.updateFriend(this.state.friend)
      : this.props.addFriend(this.state.friend);
  };

  render() {
    console.log("render", this.state);
    return (
      <FriendFormContainer>
        <Form onSubmit={this.onSubmitHandler}>
          <FormHeader>
            {this.props.activeFriend ? "Update Friend" : "Add Friend"}
          </FormHeader>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.friend.name || ""}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={this.state.friend.age || ""}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.friend.email || ""}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            name="image"
            placeholder="Image"
            value={this.state.friend.image || ""}
            onChange={this.onChangeHandler}
          />
          <button onSubmit={this.onSubmitHandler}>
            {this.props.activeFriend ? "Update Friend" : "Add Friend"}
          </button>
        </Form>
      </FriendFormContainer>
    );
  }
}

export default FriendForm;
