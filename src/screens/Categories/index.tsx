import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Images} from '../../theme/images';
import {Colors} from '../../theme/colors';
import BackgroundImage from '../../Components/BackgroundImage';
import {styles} from './styles';

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
    navigation.navigate('ServiceProviderList');
  };

  return (
    <TouchableOpacity
      onPress={navigateToServiceProviderList}
      style={styles.itemContainer}>
      <View style={styles.list_image_container}>
        <Image source={{uri: item.image}} style={styles.list_icon} />
      </View>
      <Text style={styles.category_name}>{item.name}</Text>
      <Image source={Images.next} />
    </TouchableOpacity>
  );
};

const Categories: React.FC<Props> = ({navigation}) => {
  const [categoriesData, setCategoriesData] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const snapshot = await firestore().collection('categories').get();
        const data: Item[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriesData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching categories data: ', error);
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

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    storage()
      .ref('Images/common.png')
      .getDownloadURL()
      .then(url => {
        setImageUrl(url);
        console.log('Url is :- ', url);
      })
      .catch(e => console.log('Errors while downloading => ', e));
  }, []);

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
          <FlatList
            data={filteredData.slice(0, 6)}
            renderItem={({item}) => renderItem({item, navigation})}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    </BackgroundImage>
  );
};

export default Categories;
