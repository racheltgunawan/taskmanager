import { TextInput, Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native'
import Task from '../components/Task'
import Folder from '../components/Folder'
import { useState, useEffect } from 'react'
import React from 'react'
import { IconButton } from 'react-native-paper'
import Fallback from "../components/Fallback"
import { StatusBar } from 'expo-status-bar'

import * as SQLite from 'expo-sqlite'
import { Directions } from 'react-native-gesture-handler'

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [db, setDb] = useState(SQLite.openDatabase('example.db'));
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  
  const updateNameAndCloseModal = () => {
    if (editItemId !== null && editedName !== '') {
      updateName(editItemId, editedName); // Pass editedName to updateName function
      setEditModalVisible(false);
    }
  };
  

  const closeEditModal = () => {
    setEditedName('');
    setEditItemId(null);
    setEditModalVisible(false);
  };

  const showFilteredNames = () => {
    return names
      .filter((name) => name.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((name, index) => (
        <View key={index} style={{
          backgroundColor: "#1e90ff",
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
        }}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800", flex: 1 }}>{name.name}</Text>
          <IconButton icon="pencil" iconColor="#fff" onPress={() => openEditModal(name.id, name.name)} />
          <IconButton icon="trash-can" iconColor="#fff" onPress={() => deleteName(name.id)} />
        </View>
      ));
  };
  

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM names', null,
        (txObj, resultSet) => setNames(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, [db]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading names...</Text>
      </View>
    );
  }

  const addName = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO names (name) values (?)', [currentName],
        (txObj, resultSet) => {
          let existingNames = [...names];
          existingNames.push({ id: resultSet.insertId, name: currentName});
          setNames(existingNames);
          setCurrentName(undefined);
        },
        (txObj, error) => console.log(error)
      );
    });
  }

  const deleteName = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM names WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names].filter(name => name.id !== id);
            setNames(existingNames);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const openEditModal = (id, name) => {
    setEditedName(name);
    setEditItemId(id);
    setEditModalVisible(true);
  };
  
  const updateName = (id, updatedName) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE names SET name = ? WHERE id = ?',
        [updatedName, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            const updatedNames = names.map(item => {
              if (item.id === id) {
                return { ...item, name: updatedName };
              }
              return item;
            });
            setNames(updatedNames);
            setCurrentName(undefined);
            closeEditModal();
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  
  const showNames = () => {
    return names.map((name, index) => {
      return (
        <View key={index} style={{
          backgroundColor: "#1e90ff",
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{ 
            color: "#fff", 
            fontSize: 20, 
            fontWeight: "800", 
            flex: 1 
          }}>        
          {name.name}
        </Text>
        <IconButton 
          icon="pencil" 
          iconColor="#fff"
          onPress={() => {openEditModal(name.id, name.name)}} //changed
        />
        <IconButton 
          icon="trash-can" 
          iconColor="#fff" 
          onPress={() => deleteName(name.id)}
        />
      </View>
      );
    });
  };

  return (
    <View style={styles.container}>      
      <View style={styles.upComingTasksWrapper}>
        <Text style={styles.upComingTasks}>Upcoming Tasks</Text>
        <TextInput
        style={styles.searchInput}
        placeholder="Search tasks"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
        <View style={styles.Tasks}>
          {showFilteredNames()}
          {names.length <= 0 && <Fallback />}
        </View>       
      </View>

      <View style={styles.foldersWrapper}>
        <View style={styles.folder}>
        </View>
      </View>
      <StatusBar style="auto" />

      <Modal
      style={{margin: 0}}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            multiline={true}
            numberOfLines={4}        
            style={styles.text}
            placeholder="Add a task"
            onChangeText={setCurrentName}
          />
          <View style={styles.buttonWrapper}>
            <Pressable
              style={[styles.button, styles.submitAddButton]}
              onPress={() => {setModalVisible(!modalVisible); addName()}}>
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.submitAddButton]}
              onPress={() => {setModalVisible(!modalVisible);}}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>          
        </View>
      </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          Alert.alert('Edit Modal has been closed.');
          closeEditModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.text}
              placeholder="Edit a task"
              value={editedName}
              onChangeText={setEditedName}
            />
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.submitAddButton]}
                onPress={updateNameAndCloseModal}>
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.submitAddButton]}
                onPress={closeEditModal}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>            
          </View>
        </View>
      </Modal>

      <View style={styles.addButton}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>+</Text>
        </Pressable>
      </View>
    </View>
  )
};
export default HomeScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column', // Arrange children vertically
      backgroundColor: '#fff',
    },
    upComingTasksWrapper: {
      flex: 0.5, // Takes up half of the vertical space
      backgroundColor: 'white',
      paddingTop: 20,
      paddingHorizontal: 20
    },
    upComingTasks: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
    Tasks: {
      marginTop: 30
  
    },
    foldersWrapper: {
      flex: 1, // Takes up the remaining space
      flexDirection: 'row', // Display children horizontally
      justifyContent: 'space-between', // Space between columns
      paddingHorizontal: 30, // Optional: Add padding to the sides
    },
    folder: {
      flex: 1, // Each column takes up equal space
      paddingHorizontal: 5, // Optional: Add padding between columns
    },
    text: {
      borderWidth: 2,
      borderColor: "#000",
      borderRadius: 6,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginBottom: 20,
      alignSelf: 'stretch', 
      height: 50,
      textAlign: 'center',
    },
    buttonWrapper: {
      padding: 5,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: 'center'
      
    },
    addButton:{
      alignItems: 'flex-end',
      marginEnd: 30,
      marginBottom: 30
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {      
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    submitAddButton: {
      margin: 8,
      minWidth: 100,
      backgroundColor: '#2196F3',
    },
    textStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 8,
      marginBottom: 0,
      marginTop: 20,
    },
});