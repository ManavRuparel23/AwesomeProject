import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const BackgroundImage = ({ children, backgroundImage, headerContent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {headerContent}
      </View>
      <View style={styles.contentContainer}>
        <ImageBackground source={backgroundImage} style={styles.background}>
          <View style={styles.content}>{children}</View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
  },
  contentContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or any other Image style property
  },
  content: {
    flex: 1,
    padding:0, // adjust this based on your layout
  },
});

export default BackgroundImage;
