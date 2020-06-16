import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { totalSize } from 'react-native-dimension';

class UserImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {size,style,source}=this.props
    return (
      <Image
      source={source}
      style={[{height:size?size:totalSize(10),width:size?size:totalSize(10),borderRadius:100},style]}
      />
    );
  }
}

export default UserImage;
