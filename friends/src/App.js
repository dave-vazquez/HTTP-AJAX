import React from "react";
import axios from "axios";
import styled from "styled-components";
import "./App.css";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  background-color: #fafafa;
`;

const FriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
  min-height: 100vh;

  overflow-y: auto;
`;

const Friend = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 20px 0;
  padding: 20px;
  border: 1px solid black;

  background-color: #ffffff;

  box-shadow: 4px 4px 10px rgb(0, 0, 0, 0.75);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50%;
`;

const FriendForm = styled.form`
  display: flex;
  flex-direction: column;

  padding: 20px;
  border: 1px solid black;

  background-color: #ffffff;

  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
`;

class App extends React.Component {
  state = {
    friends: [],
    getFailed: false,
    postFailed: false,
    deleteFailed: false,
    name: "",
    age: "",
    email: ""
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/friends")
      .then(res =>
        this.setState({
          friends: res.data,
          getFailed: false
        })
      )
      .catch(err => {
        this.setState({
          getFailed: true
        });
      });
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/friends", {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email
      })
      .then(res => {
        this.setState({
          friends: res.data,
          postFailed: false,
          name: "",
          age: "",
          email: ""
        });
      })
      .catch(err => {
        this.setState({
          postFailed: true
        });
      });
  };

  onClickHandler = friendID => {
    axios
      .delete(`http://localhost:5000/friends/${friendID}`)
      .then(res => {
        this.setState({
          friends: res.data,
          deleteFailed: false,
          name: "",
          age: "",
          email: ""
        });
      })
      .catch(err => {
        this.setState({
          deleteFailed: true
        });
      });
  };

  render() {
    const {
      friends,
      getFailed,
      postFailed,
      deleteFailed,
      name,
      age,
      email
    } = this.state;
    return (
      <AppContainer>
        <FriendsContainer>
          {friends === [] ? (
            <Friend>Fetching data my dude...</Friend>
          ) : (
            friends.map(friend => (
              <Friend
                key={friend.id}
                className="friend"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h1>{friend.name}</h1>
                <span>Age: {friend.age}</span>
                <span>Email: {friend.email}</span>
                {deleteFailed && <span>{"Error Deleting Data"}</span>}
                <button
                  onClick={() => {
                    const friendID = friend.id; // probably don't need this... friend.id stored in closure?
                    this.onClickHandler(friendID);
                  }}
                >
                  Delete
                </button>
              </Friend>
            ))
          )}
        </FriendsContainer>
        <FormContainer>
          <FriendForm onSubmit={this.onSubmitHandler}>
            <h1>Add Friend Form</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.onChangeHandler}
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={age}
              onChange={this.onChangeHandler}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.onChangeHandler}
            />
            <button onSubmit={this.onSubmitHandler}>Add Friend</button>
            {getFailed && <h1>{"Error Getting Data"}</h1>}
            {postFailed && <h1>{"Error Posting Data"}</h1>}
          </FriendForm>
        </FormContainer>
      </AppContainer>
    );
  }
}

export default App;
