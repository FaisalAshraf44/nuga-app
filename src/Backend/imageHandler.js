import ImagePicker from 'react-native-image-picker';

export function image_picker(handler) {
  const options = {
    title: 'Select Avatar',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
    } else if (response.error) {
    } else if (response.customButton) {
    } else {
      // const source = {uri: response.uri};
      onChange(response, 'image', handler);
    }
  });
}

const onChange = (response, identifier, handler) => {
  if (identifier == 'image') {
    handler(response);
  } else {
    return;
  }
  // else
  //   text.then(text => {
  //     this.setState({[identifier]: text});
  //   });
};
