import React, {ReactNode} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ImageSourcePropType,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface BackgroundImageProps {
  children: ReactNode;
  backgroundImage: ImageSourcePropType;
  headerContent?: ReactNode;
  backgroundColor?: string;
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
  headerContainer: {},
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
