import React, {ReactNode} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  ImageSourcePropType,
} from 'react-native';

interface BackgroundImageProps {
  children: ReactNode;
  backgroundImage: ImageSourcePropType;
  headerContent?: ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  children,
  backgroundImage,
  headerContent,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {headerContent && (
        <View style={styles.headerContainer}>{headerContent}</View>
      )}
      <View style={styles.contentContainer}>
        <ImageBackground source={backgroundImage} style={styles.background}>
          <View style={styles.content}>{children}</View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // Add styles for header container if needed
  },
  contentContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 0,
  },
});

export default BackgroundImage;
