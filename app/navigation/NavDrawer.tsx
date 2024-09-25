
import { Ionicons } from "@expo/vector-icons";
import MovieListScreen from '../../movies/screens/MovieListScreen';
import BookmarkedMoviesScreen from '../../movies/screens/BookmarkedMoviesScreen';
import { BookmarkProvider } from '../../movies/contexts/BookmarkProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';



const Drawer = createDrawerNavigator();


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
          name="Movies"
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

export default MyDrawer;