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
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Images} from '../../theme/images';
import BackgroundImage from '../../Components/BackgroundImage';
import {Colors} from '../../theme/colors';
import {styles} from './styles';

interface Item {
  id: string;
  name?: string;
  address?: string;
  mobile?: string;
  location_name?: string;
  status?: string;
  image?: string;
  mail?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
}

interface Props {
  navigation: any;
  route: {
    params: {
      itemData: Item;
      distanceData: any;
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
        <Image source={{uri: item.image}} style={styles.item_list_icon} />
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
  const {itemData, distanceData} = route.params;
  const [restaurantData, setRestaurantData] = useState<Item[]>([]);
  const [currentItemData, setCurrentItemData] = useState<Item>(itemData);

  // useEffect(() => {
  //   const fetchRestaurantData = async () => {
  //     try {
  //       const categorySnapshot = await firestore()
  //         .collection('categories')
  //         .where('name', '==', 'Food')
  //         .get();
  //       const data: Item[] = [];
  //       if (categorySnapshot) {
  //         for (const doc of categorySnapshot.docs) {
  //           const restaurantDataSnapshot = await firestore()
  //             .collection('categories')
  //             .doc(doc.id)
  //             .collection('RestaurantsData')
  //             .get();
  //           const restaurantData = restaurantDataSnapshot.docs.map(
  //             document => ({
  //               id: document.id,
  //               ...document.data(),
  //             }),
  //           );
  //           data.push(...restaurantData);
  //         }
  //         const filteredData = data.filter(item => item.id !== itemData.id);
  //         setRestaurantData(filteredData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching restaurant data: ', error);
  //     }
  //   };
  //   fetchRestaurantData();
  // }, []);

  // const handleItemClick = async (selectedItem: Item) => {
  //   const categorySnapshot = await firestore()
  //     .collection('categories')
  //     .where('name', '==', 'Food')
  //     .get();
  //   const data: Item[] = [];
  //   if (categorySnapshot) {
  //     for (const doc of categorySnapshot.docs) {
  //       const restaurantDataSnapshot = await firestore()
  //         .collection('categories')
  //         .doc(doc.id)
  //         .collection('RestaurantsData')
  //         .get();
  //       const restaurantData = restaurantDataSnapshot.docs.map(document => ({
  //         id: document.id,
  //         ...document.data(),
  //       }));
  //       data.push(...restaurantData);
  //     }
  //     setCurrentItemData(selectedItem);
  //     const filteredData = data.filter(item => item.id !== selectedItem.id);
  //     setRestaurantData(filteredData);
  //   }
  // };

  const fetchRestaurantData = async (categoryName: string) => {
    try {
      const categorySnapshot = await firestore()
        .collection('categories')
        .where('name', '==', categoryName)
        .get();
      const data: Item[] = [];
      if (categorySnapshot) {
        for (const doc of categorySnapshot.docs) {
          const restaurantDataSnapshot = await firestore()
            .collection('categories')
            .doc(doc.id)
            .collection('RestaurantsData')
            .get();
          const restaurantData = restaurantDataSnapshot.docs.map(document => ({
            id: document.id,
            ...document.data(),
          }));
          data.push(...restaurantData);
        }
        return data;
      }
    } catch (error) {
      console.error('Error fetching restaurant data: ', error);
    }
  };

  const handleItemClick = async (selectedItem: Item) => {
    const categoryName = 'Food';
    const restaurantData = await fetchRestaurantData(categoryName);
    if (restaurantData) {
      setCurrentItemData(selectedItem);
      const filteredData = restaurantData.filter(
        item => item.id !== selectedItem.id,
      );
      setRestaurantData(filteredData);
    }
  };

  // useEffect for initial data fetching
  useEffect(() => {
    const categoryName = 'Food'; // Change category name as needed
    fetchRestaurantData(categoryName).then(data => {
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
    if (!phoneNumber) return ''; // Return an empty string or handle it as per your requirement
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber; // Return the original value if it doesn't match the expected format
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
          Linking.openURL(url!); // Use the non-null assertion operator (!) to ensure url is not undefined
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
            <Image
              source={{uri: currentItemData.image}}
              style={styles.main_icon}
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
                  <Text style={styles.category_name}>Food</Text>
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
          <FlatList
            data={restaurantData}
            renderItem={({item}) =>
              renderItem({item, navigation, setItemData: handleItemClick})
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

export default ServiceProviderDetails;
