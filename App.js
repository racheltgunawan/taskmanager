import 'react-native-gesture-handler';
import Inventory from './screens/Inventory';
import Shop from './screens/Shop';
import HomeScreen from './screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

export default function App() {
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

