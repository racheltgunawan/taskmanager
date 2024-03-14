import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

const Inventory = () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Initial background color
  const [lastColor, setLastColor] = useState(null); // Store the last color set by the button
  const [displayText, setDisplayText] = useState({ lilac: false, ocean: false, grassy: false }); // Control the visibility of the text inside the buttons

  const showAlert = (color, buttonKey) => {
    Alert.alert(
      'Change Wallpaper',
      'Tap OK to proceed',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => toggleBackgroundColor(color, buttonKey),
        },
      ],
      { cancelable: false }
    );
  };

  const toggleBackgroundColor = (color, buttonKey) => {
    const updatedDisplayText = { lilac: false, ocean: false, grassy: false };
    if (backgroundColor === color) {
      setBackgroundColor('#FFFFFF');
      setLastColor(null); // Reset the last color
      setDisplayText(updatedDisplayText); // Hide text inside all buttons
    } else {
      setBackgroundColor(color);
      setLastColor(color); // Store the last color
      updatedDisplayText[buttonKey] = true;
      setDisplayText(updatedDisplayText); // Display text inside the button
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>Lilac</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F2BEFC' }]}
        onPress={() => showAlert('#F2BEFC', 'lilac')}
      >
        <Text style={[styles.buttonText, { color: displayText.lilac ? 'black' : '#F2BEFC' }]}>Remove</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Ocean</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#90E0EF' }]}
        onPress={() => showAlert('#90E0EF', 'ocean')}
      >
        <Text style={[styles.buttonText, { color: displayText.ocean ? 'black' : '#90E0EF' }]}>Remove</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Grassy</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#BEFFC7' }]}
        onPress={() => showAlert('#BEFFC7', 'grassy')}
      >
        <Text style={[styles.buttonText, { color: displayText.grassy ? 'black' : '#BEFFC7' }]}>Remove</Text>
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

export default Inventory;
