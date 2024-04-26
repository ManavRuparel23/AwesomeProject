import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ServiceProviderFilterPopup from './../ServiceProviderFilterPopup';
import {styles} from './styles';
import {Colors} from '../../theme/colors';
import {Images} from '../../theme/images';
import BackgroundImage from '../../Components/BackgroundImage';
import {fetchRestaurantData} from '../../utils/firebase';
import ImageLoad from 'react-native-image-placeholder';
import {Strings} from '../../theme/strings';

interface RestaurantItem {
  id: string;
  name?: string;
  address?: string;
  mobile?: string;
  location_name?: string;
  status?: string;
  image?: string;
}

interface Item {
  id: string;
  name?: string;
  image?: string;
}
interface Props {
  navigation: any;
  route: {
    params: {
      itemData: Item;
    };
  };
}

const renderItem = ({
  item,
  navigation,
  itemData,
}: {
  item: RestaurantItem;
  navigation: any;
  itemData: Item;
}) => {
  const statusColor =
    item.status === 'Open' ? Colors.green_clr : Colors.red_clr;

  const formatPhoneNumber = (phoneNumber?: string) => {
    if (!phoneNumber) return '';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
  };

  return (
    <TouchableOpacity
      style={styles.listcontainer}
      onPress={() =>
        navigation.navigate('ServiceProviderDetails', {
          itemData: item,
          name: itemData,
        })
      }>
      <View style={styles.opera_icon_container}>
        {/* <Image
          source={{uri: item.image ? item.image : Images.placeholder}}
          style={styles.list_icon}
        /> */}
        <ImageLoad
          style={styles.list_icon}
          loadingStyle={styles.list_icon}
          source={{
            uri: item.image,
          }}
        />
      </View>
      <View style={styles.organization_container}>
        <Text style={styles.organization_text}>{item.name}</Text>
        <View style={styles.address_container}>
          <Text style={styles.address_text} numberOfLines={1}>
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
        <View style={styles.telephone_container}>
          <Text style={styles.contact_text}>
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

const ServiceProviderList: React.FC<Props> = ({navigation, route}) => {
  const {itemData} = route.params;
  const [restaurantData, setRestaurantData] = useState<RestaurantItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedParishes, setSelectedParishes] = useState<string[]>([]);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<RestaurantItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchInputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFoodItem = itemData.name === 'Food';

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const data = await fetchRestaurantData(
  //         itemData.name ? itemData.name : '',
  //       );

  //       setRestaurantData(data);
  //       setFilteredData(data);
  //     } catch (error) {
  //       console.error('Error fetching restaurant data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setIsLoading(true);
        const categorySnapshot = await firestore()
          .collection('categories')
          .where('name', '==', 'Food')
          .get();
        const data: RestaurantItem[] = [];
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
          setRestaurantData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error('Error fetching restaurant data: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurantData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = restaurantData.filter(item => {
        if (selectedStatus && item.status !== selectedStatus) {
          return false;
        }
        if (
          selectedParishes.length > 0 &&
          !selectedParishes.includes(item.location_name || '')
        ) {
          return false;
        }
        if (
          searchQuery &&
          !(item.name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        return true;
      });
      setFilteredData(filtered);
    };

    filterData();
  }, [selectedStatus, selectedParishes, searchQuery]);

  const applyFilter = (
    status: string | null,
    parishes: string[],
    isSearchClear: boolean,
  ) => {
    setSelectedStatus(status);
    setSelectedParishes(parishes);
    if (!isSearchClear && searchInputRef.current) {
      searchInputRef.current.clear();
      setSearchQuery('');
    }
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
      <View style={styles.separator} />
      {isFoodItem ? (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginLeft: 5,
            }}>
            <View style={styles.search_button_container}>
              <Image source={Images.search} style={styles.search_icon} />
              <TextInput
                ref={searchInputRef}
                placeholderTextColor={Colors.placeholder_text_clr}
                placeholder="Search"
                style={styles.textInput}
                onChangeText={text => setSearchQuery(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.filter_button_container}
              onPress={() => setPopupVisible(true)}>
              <Image source={Images.filter} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary_clr} />
              ) : (
                <FlatList
                  data={filteredData}
                  renderItem={({item}) =>
                    renderItem({item, itemData, navigation})
                  }
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </ScrollView>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isPopupVisible}
            onRequestClose={() => setPopupVisible(false)}>
            <ServiceProviderFilterPopup
              onClose={() => setPopupVisible(false)}
              onApplyFilter={applyFilter}
              initialStatus={selectedStatus}
              initialParishes={selectedParishes}
            />
          </Modal>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            flex: 1,
          }}>
          <Text style={styles.no_data_text}>{Strings.empty_data}</Text>
        </View>
      )}
    </BackgroundImage>
  );
};

export default ServiceProviderList;
