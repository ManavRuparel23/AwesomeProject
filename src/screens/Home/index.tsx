import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {Images} from '../../theme/images';
import {Strings} from '../../theme/strings';
import BackgroundImage from '../../Components/BackgroundImage';
import {fetchCategoriesData} from '../../utils/firebase';
import firestore from '@react-native-firebase/firestore';
import ImageLoad from 'react-native-image-placeholder';

interface Item {
  id: string;
  name?: string;
  image?: string;
}

interface Props {
  navigation: any;
}

const renderItem = ({item, navigation}: {item: Item; navigation: any}) => {
  // if (item.name === 'Food') {
  //   return (
  //     <TouchableOpacity
  //       style={styles.itemContainer}
  //       onPress={() =>
  //         navigation.navigate('ServiceProviderList', {itemData: item})
  //       }>
  //       <View style={styles.list_image_container}>
  //         {/* <Image
  //           source={{uri: item.image ? item.image : Images.placeholder}}
  //           style={styles.category_icon}
  //         /> */}
  //         <ImageLoad
  //           style={styles.category_icon}
  //           loadingStyle={styles.category_icon}
  //           source={{
  //             uri: item.image,
  //           }}
  //         />
  //       </View>
  //       <Text style={styles.category_name}>{item.name}</Text>
  //     </TouchableOpacity>
  //   );
  // } else {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('ServiceProviderList', {itemData: item})
      }>
      <View style={styles.list_image_container}>
        {/* <Image source={{uri: item.image}} style={styles.category_icon} /> */}
        <ImageLoad
          style={styles.category_icon}
          loadingStyle={styles.category_icon}
          source={{
            uri: item.image,
          }}
        />
      </View>
      <Text style={styles.category_name}>{item.name}</Text>
    </TouchableOpacity>
  );
  // }
};

const Home: React.FC<Props> = ({navigation}) => {
  const [categoriesData, setCategoriesData] = useState<Item[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchCategoriesData();
  //       console.log('categories Data:', data);
  //       setCategoriesData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const snapshot = await firestore().collection('categories').get();
        const data: Item[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriesData(data);
      } catch (error) {
        console.error('Error fetching categories data: ', error);
      }
    };
    fetchCategoriesData();
  }, []);

  const headerContent = (
    <View style={styles.header_container}>
      <Image source={Images.logo} style={styles.logo_icon} />
    </View>
  );

  return (
    <BackgroundImage
      backgroundImage={Images.background}
      headerContent={headerContent}>
      <View>
        <View style={styles.separator} />
        <View style={styles.contentContainer}>
          <ScrollView>
            <Text style={styles.popular_category_text}>
              {Strings.home_popular_category}
            </Text>
            <View>
              <FlatList
                columnWrapperStyle={{justifyContent: 'space-evenly'}}
                data={categoriesData.slice(0, 6)}
                renderItem={({item}) => renderItem({item, navigation})}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
              />
            </View>
            <TouchableOpacity
              style={styles.buttoncontainer}
              onPress={() => navigation.navigate('Categories')}>
              <Text style={styles.button_text}>
                {Strings.home_explore_category}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </BackgroundImage>
  );
};

export default Home;
