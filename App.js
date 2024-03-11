import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';
import Folder from './components/Folder';
import Inventory from './Inventory';
import Shop from './Shop';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const HomeScreen = () => (
  <View style={styles.container}>
    <View style={styles.upComingTasksWrapper}>
      <Text style={styles.upComingTasks}>Upcoming Tasks:</Text>
      <View style={styles.Tasks}>
        <Task />
        <Task />
      </View>
    </View>
    <View style={styles.foldersWrapper}>
      <View style={styles.folder}>
        <Folder />
        <Folder />
      </View>
    </View>
    <StatusBar style="auto" />
  </View>
);

export default function Home() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Inventory" component={Inventory} />
        <Drawer.Screen name="Shop" component={Shop} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Arrange children vertically
    backgroundColor: '#fff',
  },
  upComingTasksWrapper: {
    flex: 0.5, // Takes up half of the vertical space
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upComingTasks: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  Tasks: {},
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
});