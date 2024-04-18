import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import firestore from '@react-native-firebase/firestore';
import ServiceProviderFilterPopup from './../ServiceProviderFilterPopup';
import { styles } from './styles';
import { Colors } from "../../theme/colors";
import { Images } from "../../theme/images";
import BackgroundImage from "../../Components/BackgroundImage";

const renderItem = ({ item, navigation }) => {
    const statusColor = item.status === 'Open' ? Colors.green_clr : Colors.red_clr;
    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    return (
        <TouchableOpacity style={styles.listcontainer} onPress={() => navigation.navigate('ServiceProviderDetails', { itemData: item })}>
            <View style={styles.opera_icon_container}>
                <Image source={{ uri: item.image }} style={styles.list_icon} />
            </View>
            <View style={styles.organization_container}>
                <Text style={styles.organization_text}>{item.name}</Text>
                <View style={styles.address_container}>
                    <Text style={styles.address_text} numberOfLines={1}>{item.address}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#c7c7c7', marginBottom: 2 }} />
                <View style={styles.telephone_container}>
                    <Text style={styles.contact_text}>{formatPhoneNumber(item.mobile)}</Text>
                </View>
                <View style={styles.location_container}>
                    <View style={styles.location_text_container}>
                        <Text style={styles.location_text}>{item.location_name}</Text>
                    </View>
                    <View style={[styles.status_text_container, { borderColor: statusColor }]}>
                        <Text style={[styles.status_text, { color: statusColor }]}>{item.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const ServiceProviderList = ({ navigation }) => {
    const [restaurantData, setRestaurantData] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedParishes, setSelectedParishes] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const categorySnapshot = await firestore()
                    .collection('categories')
                    .where('name', '==', 'Food')
                    .get();

                const data = [];

                if (categorySnapshot) {
                    for (const doc of categorySnapshot.docs) {
                        const restaurantDataSnapshot = await firestore()
                            .collection('categories')
                            .doc(doc.id)
                            .collection('RestaurantsData')
                            .get();

                        const restaurantData = restaurantDataSnapshot.docs.map(document => ({ id: document.id, ...document.data() }));
                        data.push(...restaurantData);
                    }
                    setRestaurantData(data);
                    setFilteredData(data);
                }
            } 
            catch (error) {
                console.error('Error fetching restaurant data: ', error);
            }
        };
        fetchRestaurantData();
    }, []);

    // const applyFilter = (status, parishes) => {
    //     console.log(parishes);
    //     console.log(status);
    //     setSelectedStatus(status);
    //     if (status) {
    //         const filtered = restaurantData.filter(item => item.status === status);
    //         setFilteredData(filtered);
    //     } 
    //     else {
    //         setFilteredData(restaurantData);
    //     }
    // };
    const applyFilter = (status, parishes) => {
        console.log(parishes);
        console.log(status);
        setSelectedStatus(status);
    
        let filteredData = restaurantData;

        if (status) {
            filteredData = filteredData.filter(item => item.status === status);
        }

        const selectedParishesNames = parishes.map(index => restaurantData[index]?.location_name).filter(Boolean);
        console.log(selectedParishesNames);
        if (selectedParishesNames.length > 0) {
            filteredData = filteredData.filter(item => selectedParishesNames.includes(item.location_name));
        }

        setFilteredData(filteredData);
    };
    

    useEffect(() => {
        const filterData = () => {
            let filtered = restaurantData.filter(item => {
                if (selectedStatus && item.status !== selectedStatus) {
                    return false;
                }
                if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }
                return true;
            });
            setFilteredData(filtered);
        };
        filterData();
    }, [selectedStatus, searchQuery]);

    const headerContent = (
        <View style={styles.header_container}>
            <TouchableOpacity style={styles.back_Icon_Container} onPress={() => navigation.goBack()}>
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
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginLeft: 5 }}>
                <View style={styles.search_button_container}>
                    <Image source={Images.search} style={styles.search_icon} />
                    <TextInput
                        placeholderTextColor={Colors.placeholder_text_clr}
                        placeholder="Search"
                        style={styles.textInput}
                        onChangeText={text => setSearchQuery(text)}
                    />
                </View>
                <TouchableOpacity style={styles.filter_button_container} onPress={() => setPopupVisible(true)}>
                    <Image source={Images.filter} />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView>
                    <FlatList
                        data={filteredData}
                        renderItem={({ item }) => renderItem({ item, navigation })}
                        keyExtractor={(item, index) => index.toString()} />
                </ScrollView>
            </View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={isPopupVisible}
                onRequestClose={() => setPopupVisible(false)}>
                <ServiceProviderFilterPopup
                    onClose={() => setPopupVisible(false)}
                    onApplyFilter={applyFilter}
                    selectedStatus={selectedStatus} />
            </Modal>
        </BackgroundImage>
    );
}

export default ServiceProviderList;
