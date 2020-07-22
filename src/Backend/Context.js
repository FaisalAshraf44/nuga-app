import React, {Component} from 'react';
const {Provider, Consumer} = React.createContext();

// Note: You could also use hooks to provide state and convert this into a functional component.
class RootContext extends Component {
  state = {
    userData: {},
  };

  setUserData = data => {
    this.setState({userData: data});
  };

  render() {
    return (
      <Provider
        value={{
          userData: this.state.userData,
          setUserData: this.setUserData,
        }}>
        {this.props.children}
      </Provider>
    );
  }
}

export {RootContext, Consumer as RootConsumer};
