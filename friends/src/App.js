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

    this.localHost = "http://localhost:5000/friends";
  }

  componentDidMount = () => {
    axios
      .get(`${this.localHost}`)
      .then(res => {
        this.setState({
          friends: res.data,
          getFailed: false
        });
      })
      .catch(err => {
        this.setState({
          getFailed: true
        });
      });
  };

  addFriend = newFriend => {
    axios
      .post(`${this.localHost}`, newFriend)
      .then(res => {
        this.setState({
          friends: res.data,
          postFailed: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          postFailed: true
        });
      });
  };

  updateFriend = friend => {
    axios
      .put(`${this.localHost}/${friend.id}`, friend)
      .then(res => {
        this.setState({
          friends: res.data,
          putFailed: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          putFailed: true
        });
      });
  };

  deleteFriend = id => {
    axios
      .delete(`${this.localHost}/${id}`)
      .then(res => {
        this.setState({
          friends: res.data,
          deleteFailed: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          deleteFailed: true
        });
      });
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      friends,
      getFailed,
      postFailed,
      putFailed,
      deleteFailed
    } = this.state;
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
            } else if (deleteFailed) {
              return <ErrorMessage>Error deleting friend...</ErrorMessage>;
            } else {
              return (
                <FriendsList
                  {...props}
                  friends={friends}
                  deleteFriend={this.deleteFriend}
                />
              );
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
            const id = props.match.params.id - 1;
            return (
              <FriendForm
                {...props}
                updateFriend={this.updateFriend}
                activeFriend={friends[id]}
              />
            );
          }}
        />
      </AppContainer>
    );
  }
}

export default App;
