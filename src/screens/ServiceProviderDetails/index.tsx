import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Images} from '../../theme/images';
import BackgroundImage from '../../Components/BackgroundImage';
import {Colors} from '../../theme/colors';
import {styles} from './styles';
import {fetchRestaurantData} from '../../utils/firebase';
import ImageLoad from 'react-native-image-placeholder';

interface Item {
  id: string;
  name?: string;
  address?: string;
  mobile?: string;
  location_name?: string;
  status?: string;
  image?: string;
  mail?: string;
  website?: string | undefined;
  latitude?: number;
  longitude?: number;
}

interface RestaurantsData {
  id: string;
  name?: string;
  image?: string;
}

interface Props {
  navigation: any;
  route: {
    params: {
      itemData: Item;
      name: RestaurantsData;
    };
  };
}

const renderItem = ({
  item,
  navigation,
  setItemData,
}: {
  item: Item;
  navigation: any;
  setItemData: (item: Item) => void;
}) => {
  const handleItemPress = () => {
    setItemData(item);
  };
  const formatPhoneNumber = (phoneNumber?: string) => {
    if (!phoneNumber) return '';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
  };
  const statusColor =
    item.status === 'Open' ? Colors.green_clr : Colors.red_clr;
  return (
    <TouchableOpacity style={styles.listcontainer} onPress={handleItemPress}>
      <View style={styles.opera_icon_list_container}>
        {/* <Image
          source={{uri: item.image ? item.image : Images.placeholder}}
          style={styles.item_list_icon}
        /> */}
        <ImageLoad
          style={styles.item_list_icon}
          loadingStyle={styles.list_icon}
          source={{
            uri: item.image,
          }}
        />
      </View>
      <View style={styles.organization_list_container}>
        <Text style={styles.organization_list_text}>{item.name}</Text>
        <View style={styles.address_list_container}>
          <Text style={styles.address_list_text} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#c7c7c7',
            marginBottom: 2,
          }}
        />
        <View style={styles.telephone_list_container}>
          <Text style={styles.contact_list_text}>
            {formatPhoneNumber(item.mobile)}
          </Text>
        </View>
        <View style={styles.location_container}>
          <View style={styles.location_text_container}>
            <Text style={styles.location_text}>{item.location_name}</Text>
          </View>
          <View
            style={[styles.status_text_container, {borderColor: statusColor}]}>
            <Text style={[styles.status_text, {color: statusColor}]}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ServiceProviderDetails: React.FC<Props> = ({navigation, route}) => {
  const {itemData, name} = route.params;
  const [restaurantData, setRestaurantData] = useState<Item[]>([]);
  const [currentItemData, setCurrentItemData] = useState<Item>(itemData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const data = await fetchRestaurantData(name.name ? name.name : '');
  //         setRestaurantData(data);
  //       } catch (error) {
  //         console.error('Error fetching restaurant data:', error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setIsLoading(true);
        const categorySnapshot = await firestore()
          .collection('categories')
          .where('name', '==', 'Food')
          .get();
        const data: Item[] = [];
        if (categorySnapshot) {
          for (const doc of categorySnapshot.docs) {
            const restaurantDataSnapshot = await firestore()
              .collection('categories')
              .doc(doc.id)
              .collection('RestaurantsData')
              .get();
            const restaurantData = restaurantDataSnapshot.docs.map(
              document => ({
                id: document.id,
                ...document.data(),
              }),
            );
            data.push(...restaurantData);
          }
          const filteredData = data.filter(item => item.id !== itemData.id);
          setRestaurantData(filteredData);
        }
      } catch (error) {
        console.error('Error fetching restaurant data: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurantData();
  }, []);

  const handleItemClick = async (selectedItem: Item) => {
    const restaurantData = await fetchRestaurantData(
      name.name ? name.name : '',
    );
    if (restaurantData) {
      setCurrentItemData(selectedItem);
      const filteredData = restaurantData.filter(
        item => item.id !== selectedItem.id,
      );
      setRestaurantData(filteredData);
    }
  };

  useEffect(() => {
    fetchRestaurantData(name.name ? name.name : '').then(data => {
      if (data) {
        const filteredData = data.filter(item => item.id !== itemData.id);
        setRestaurantData(filteredData);
      }
    });
  }, []);
  const statusColor =
    currentItemData.status === 'Open'
      ? Colors.status_open_clr
      : Colors.status_close_clr;
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

  const handleEmailPress = () => {
    const email = currentItemData.mail;
    const emailURL = `mailto:${email}`;
    Linking.openURL(emailURL);
  };

  const openURL = async (url: string) => {
    if (url) {
      await Linking.openURL(`https://${url}`);
    } else {
      Alert.alert('Error', 'Invalid URL.');
    }
  };

  const formatPhoneNumber = (phoneNumber?: string) => {
    if (!phoneNumber) return '';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
  };

  const openMap = () => {
    const {latitude, longitude} = currentItemData;
    let url: string | undefined;
    if (latitude && longitude) {
      url = Platform.select({
        ios: `maps://app?daddr=${latitude},${longitude}&dirflg=d`,
        android: `google.navigation:q=${latitude},${longitude}`,
      });
    }

    if (url) {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url!);
        } else {
          Alert.alert('Error', 'Could not open map application.');
        }
      });
    } else {
      Alert.alert('Error', 'Invalid coordinates.');
    }
  };

  return (
    <BackgroundImage
      backgroundImage={Images.background}
      headerContent={headerContent}>
      <View style={styles.separator} />
      <ScrollView style={{marginBottom: 60}}>
        <View style={styles.details_container}>
          <View style={styles.main_container}>
            {/* <Image
              source={{uri: currentItemData.image}}
              style={styles.main_icon}
            /> */}
            <ImageLoad
              style={styles.main_icon}
              source={{uri: currentItemData.image}}
            />
            <View style={styles.name_container}>
              <Text style={styles.name_text}>{currentItemData.name}</Text>
              <View style={styles.status_category_container}>
                <View
                  style={[
                    styles.status_text_container,
                    {borderColor: statusColor},
                  ]}>
                  <Text style={[styles.status_text, {color: statusColor}]}>
                    {currentItemData.status}
                  </Text>
                </View>
                <View style={styles.category_contioner}>
                  <View style={styles.list_image_container}>
                    <Image source={Images.food} style={styles.list_icon} />
                  </View>
                  <Text style={styles.category_name}>{name.name}</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.detail_fields_container, {marginRight: 18}]}
            onPress={openMap}>
            <View style={styles.detail_fields_icon_container}>
              <Image
                source={Images.location}
                style={styles.detail_fields_icon}
              />
            </View>
            <Text style={styles.detail_fields_text}>
              {currentItemData.address}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detail_fields_container}
            onPress={() => {
              openURL(currentItemData.website);
            }}>
            <View style={styles.detail_fields_icon_container}>
              <Image
                source={Images.website}
                style={styles.detail_fields_icon}
              />
            </View>
            <Text style={styles.detail_fields_text}>
              {currentItemData.website}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detail_fields_container}
            onPress={handleEmailPress}>
            <View style={styles.detail_fields_icon_container}>
              <Image source={Images.mail} style={styles.detail_fields_icon} />
            </View>
            <Text style={styles.detail_fields_text}>
              {currentItemData.mail}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detail_fields_container}
            onPress={() => {
              Linking.openURL(`tel://${currentItemData.mobile}`);
            }}>
            <View style={styles.detail_fields_icon_container}>
              <Image
                source={Images.contact}
                style={styles.detail_fields_icon}
              />
            </View>
            <Text style={styles.detail_fields_text}>
              {formatPhoneNumber(currentItemData.mobile)}
            </Text>
          </TouchableOpacity>
          <View style={styles.detail_fields_container}>
            <View style={styles.detail_fields_icon_container}>
              <Image
                source={Images.location_name}
                style={styles.detail_fields_icon}
              />
            </View>
            <Text style={styles.detail_fields_text}>
              {currentItemData.location_name}
            </Text>
          </View>
        </View>
        <View style={styles.nearby_text_container}>
          <Text style={styles.nearby_text}>Other Nearby Providers</Text>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary_clr} />
          ) : (
            <FlatList
              data={restaurantData}
              renderItem={({item}) =>
                renderItem({item, navigation, setItemData: handleItemClick})
              }
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

export default ServiceProviderDetails;
