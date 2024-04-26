import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Images} from '../../theme/images';
import {Colors} from '../../theme/colors';
import BackgroundImage from '../../Components/BackgroundImage';
import {styles} from './styles';
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
  const navigateToServiceProviderList = () => {
    navigation.navigate('ServiceProviderList', {itemData: item});
  };
  // if (item.name === 'Food') {
  //   return (
  //     <TouchableOpacity
  //       onPress={navigateToServiceProviderList}
  //       style={styles.itemContainer}>
  //       <View style={styles.list_image_container}>
  //         {/* <Image
  //           source={{uri: item.image ? item.image : Images.placeholder}}
  //           style={styles.list_icon}
  //         /> */}
  //         <ImageLoad
  //           style={styles.list_icon}
  //           loadingStyle={styles.list_icon}
  //           source={{
  //             uri: item.image,
  //           }}
  //         />
  //       </View>
  //       <Text style={styles.category_name}>{item.name}</Text>
  //       <Image source={Images.next} />
  //     </TouchableOpacity>
  //   );
  // } else {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={navigateToServiceProviderList}>
      <View style={styles.list_image_container}>
        {/* <Image
            source={{uri: item.image ? item.image : Images.placeholder}}
            style={styles.list_icon}
          /> */}
        <ImageLoad
          style={styles.list_icon}
          source={{
            uri: item.image,
          }}
        />
      </View>
      <Text style={styles.category_name}>{item.name}</Text>
      <Image source={Images.next} />
    </TouchableOpacity>
  );
  // }
};

const Categories: React.FC<Props> = ({navigation}) => {
  const [categoriesData, setCategoriesData] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchCategoriesData();
  //       console.log('categories Data:', data);
  //       setCategoriesData(data);
  //       setFilteredData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        setIsLoading(true);
        const snapshot = await firestore().collection('categories').get();
        const data: Item[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriesData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching categories data: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoriesData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = categoriesData.filter(
      item => item.name && item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const headerContent = (
    <View style={styles.header_container}>
      <TouchableOpacity
        style={styles.back_Icon_Container}
        onPress={() => navigation.goBack()}>
        <Image source={Images.back} style={styles.back_icon} />
      </TouchableOpacity>
      <View style={styles.logo_container}>
        <Image source={Images.logo} style={styles.logo_icon} />
      </View>
    </View>
  );

  return (
    <BackgroundImage
      backgroundImage={Images.background}
      headerContent={headerContent}>
      <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.search_button_container}>
          <Image source={Images.search} style={styles.search_icon} />
          <TextInput
            placeholderTextColor={Colors.placeholder_text_clr}
            placeholder="Search"
            style={styles.textInput}
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary_clr} />
          ) : (
            <FlatList
              data={filteredData.slice(0, 6)}
              renderItem={({item}) => renderItem({item, navigation})}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ScrollView>
      </View>
    </BackgroundImage>
  );
};

export default Categories;
