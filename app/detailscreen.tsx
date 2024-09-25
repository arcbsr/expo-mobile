import { Text, View, StyleSheet  } from "react-native";
import './gesture-handler.native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";
import MovieListScreen from '../movies/screens/MovieListScreen';
import BookmarkedMoviesScreen from '../movies/screens/BookmarkedMoviesScreen';
import { BookmarkProvider } from '../movies/contexts/BookmarkProvider';



const Drawer = createDrawerNavigator();
export default function detailscreen() {
  return (
    <View style={styles.container}>
          <Text >This is a TextView</Text>
        </View>
  );
}
function MyDrawer() {
  return (
    <BookmarkProvider>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            // backgroundColor: '#c6cbef',
            width: 240,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={MovieListScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={BookmarkedMoviesScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document-text-outline" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </BookmarkProvider>
  );
}

function FeedWelcomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Feed Screen</Text>
    </View>
  );
}

function ArticleWelcomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Article Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});