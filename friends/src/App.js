import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import "./App.css";
import FriendForm from "./component/FriendForm";
import FriendsList from "./component/FriendsList";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: 100vh;
`;

const ErrorMessage = styled.h1`
  width: 100%;

  font-size: 1.6rem;
  text-align: center;
`;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      friends: []
    };

    this.localHost = "http://localhost:5000";
  }

  componentDidMount = () => {
    axios
      .get(`${this.localHost}/friends`)
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

  addFriend = newFriend => {
    axios
      .post(`${this.localHost}/friends`, newFriend)
      .then(res => {
        this.setState({
          friends: res.data,
          postFailed: false
        });
      })
      .catch(err => {
        this.setState({
          postFailed: true
        });
      });
  };

  updateFriend = friend => {
    axios
      .put(`${this.localHost}/friends/${friend.id}`, friend)
      .then(res => {
        this.setState({
          friends: res.data,
          putFailed: false
        });
      })
      .catch(err => {
        this.setState({
          putFailed: true
        });
      });
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { friends, getFailed, postFailed, putFailed } = this.state;
    return (
      <AppContainer>
        <Route
          path="/"
          render={props => {
            if (getFailed) {
              return <ErrorMessage>Error getting friends...</ErrorMessage>;
            } else if (postFailed) {
              return <ErrorMessage>Error adding friend...</ErrorMessage>;
            } else if (putFailed) {
              return <ErrorMessage>Error updating friend...</ErrorMessage>;
            } else {
              return <FriendsList {...props} friends={friends} />;
            }
          }}
        />
        <Route
          path="/add"
          render={props => (
            <FriendForm {...props} addFriend={this.addFriend} type="add" />
          )}
        />
        <Route
          path="/edit/:id"
          render={props => {
            return (
              <FriendForm
                {...props}
                updateFriend={this.updateFriend}
                friends={friends}
              />
            );
          }}
        />
      </AppContainer>
    );
  }
}

export default App;
