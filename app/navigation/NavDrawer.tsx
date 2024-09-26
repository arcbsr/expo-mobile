import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MovieListScreen from '../../movies/screens/MovieListScreen';
import BookmarkedMoviesScreen from '../../movies/screens/BookmarkedMoviesScreen'; // Replace with actual imports
import { BookmarkProvider } from '../../movies/contexts/BookmarkProvider'; // Replace with actual imports

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => (
  <DrawerContentScrollView {...props}>
    {/* Add your header image here */}
    <View style={styles.drawerHeader}>
      <Image
        source={{ uri: 'https://png.pngtree.com/thumb_back/fh260/background/20240820/pngtree-nature-background-image-image_16171269.jpg' }} // Replace with your image URL or local file path
        style={styles.headerImage}
      />
    </View>
    {/* Drawer Items */}
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

export default function MyDrawer() {
  return (
    <BookmarkProvider>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            width: 280,
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

const styles = StyleSheet.create({
  drawerHeader: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 280,
    height: 150,
    borderRadius: 0, // Make it circular if it's a profile picture
  },
});
