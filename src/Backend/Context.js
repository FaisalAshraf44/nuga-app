import React, {Component} from 'react';
const {Provider, Consumer} = React.createContext();

// Note: You could also use hooks to provide state and convert this into a functional component.
class RootContext extends Component {
  state = {
    // authorization: '',
    // discussion: [],
    // posts: [],
    inProgressReminder: '',
    inProgressWork: '',
  };
  // handleSetState = token => {
  //   this.setState({authorization: token});
  // };
  // handleSetDiscussion = discussion => {
  //   this.setState({discussion: discussion});
  // };
  // setPosts = posts => {
  //   this.setState({posts: posts});
  // };
  setInProgressReminder = data => {
    this.setState({inProgressReminder: data});
  };
  setInProgressWork = data => {
    this.setState({inProgressWork: data});
  };
  render() {
    return (
      <Provider
        value={{
          // token: this.state.authorization,
          // handleSetState: this.handleSetState,
          // discussion: this.state.discussion,
          // handleSetDiscussion: this.handleSetDiscussion,
          // posts: this.state.posts,
          // setPosts: this.setPosts,
          setInProgressReminder: this.setInProgressReminder,
          inProgressReminder: this.state.inProgressReminder,
          setInProgressWork: this.setInProgressWork,
          inProgressWork: this.state.inProgressWork,
        }}>
        {this.props.children}
      </Provider>
    );
  }
}

export {RootContext, Consumer as RootConsumer};
