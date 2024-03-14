import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

const Shop = () => {
  const [displayTextLilac, setDisplayTextLilac] = useState(false); // Control the visibility of the text inside the Lilac button
  const [displayTextOcean, setDisplayTextOcean] = useState(false); // Control the visibility of the text inside the Ocean button
  const [displayTextGrassy, setDisplayTextGrassy] = useState(false); // Control the visibility of the text inside the Grassy button

  const [buttonClicked, setButtonClicked] = useState({ lilac: false, ocean: false, grassy: false }); // Track whether each button has been clicked

  const showAlert = (color, setDisplayText, buttonKey) => {
    if (buttonClicked[buttonKey]) {
      // If the button has already been clicked, return without showing the alert
      return;
    }

    Alert.alert(
      'Ready to buy?',
      'Tap OK to proceed',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => toggleTextVisibility(setDisplayText, buttonKey),
        },
      ],
      { cancelable: false }
    );
    setButtonClicked((prevState) => ({ ...prevState, [buttonKey]: true })); // Set the buttonClicked state to true for the clicked button
  };

  const toggleTextVisibility = (setDisplayText, buttonKey) => {
    setDisplayText((prevState) => !prevState); // Toggle the visibility of the text
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lilac</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F2BEFC' }]}
        onPress={() => showAlert('#F2BEFC', setDisplayTextLilac, 'lilac')}
      >
        <Text style={[styles.buttonText, { color: displayTextLilac ? 'black' : '#F2BEFC' }]}>Sold Out!</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Ocean</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#90E0EF' }]}
        onPress={() => showAlert('#90E0EF', setDisplayTextOcean, 'ocean')}
      >
        <Text style={[styles.buttonText, { color: displayTextOcean ? 'black' : '#90E0EF' }]}>Sold Out!</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Grassy</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#BEFFC7' }]}
        onPress={() => showAlert('#BEFFC7', setDisplayTextGrassy, 'grassy')}
      >
        <Text style={[styles.buttonText, { color: displayTextGrassy ? 'black' : '#BEFFC7' }]}>Sold Out!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 350,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: 'grey',
  },
  text: {
    fontSize: 28,
    marginBottom: 0,
    textAlign: 'left', // Align text to the left
    marginLeft: 10, // Add some margin to the left
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'black', // Text color
  },
  buttonText: {
    fontSize: 40,
  },
});

export default Shop;
