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
    id: undefined,
    name: "",
    age: undefined,
    email: "",
    image: ""
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    let friend = {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email,
      image: this.state.image
    };

    this.formTypeAdd()
      ? this.props.addFriend(friend)
      : this.props.updateFriend({ id: this.state.id, ...friend });

    this.props.history.push("/");
  };

  formTypeAdd = () => {
    return this.props.type === "add";
  };

  componentDidMount = () => {
    if (!this.formTypeAdd()) {
      let id = this.props.match.params.id;
      let friend = this.props.friends.find(
        (friend, i) => `${friend.id}` === id
      );

      this.setState({
        id: id,
        name: friend.name,
        age: friend.age,
        email: friend.email,
        image: friend.image
      });
    }
  };

  render() {
    return (
      <FriendFormContainer>
        <Form onSubmit={this.onSubmitHandler}>
          <FormHeader>
            {this.formTypeAdd() ? "Add New Friend" : "Update Friend"}
          </FormHeader>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name || ""}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={this.state.age || ""}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.email || ""}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            name="image"
            placeholder="Image"
            value={this.state.image || ""}
            onChange={this.onChangeHandler}
          />
          <button onSubmit={this.onSubmitHandler}>
            {" "}
            {this.formTypeAdd() ? "Add New Friend" : "Update Friend"}
          </button>
        </Form>
      </FriendFormContainer>
    );
  }
}

export default FriendForm;
