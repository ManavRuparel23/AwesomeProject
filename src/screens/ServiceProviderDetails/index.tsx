import React ,{useEffect, useRef,useState} from "react";
import {styles} from './styles';
import { View,Text ,FlatList,StyleSheet,TouchableOpacity , Image, ScrollView} from "react-native";
import firestore from '@react-native-firebase/firestore';
import {Images} from '../../theme/images';
import BackgroundImage from "../../Components/BackgroundImage";
import Analytics from "@react-native-firebase/analytics";
import { Colors } from "../../theme/colors";

const renderItem = ({ item }) => {
    const statusTextColor = item.status === 'Open Now' ? Colors.green_clr : 'red';
    formatPhoneNumber = ( phoneNumber ) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }
    const statusColor = item.status === 'Open' ? Colors.green_clr : Colors.red_clr;
    return (
        <View style={styles.listcontainer}>
            <View style={styles.opera_icon_list_container}>
                <Image source={{ uri: item.image }} style={styles.item_list_icon} />
            </View>
            <View style={styles.organization_list_container}>
                <Text style={styles.organization_list_text}>{item.name}</Text>
                <View style={styles.address_list_container}>
                    <Text style={styles.address_list_text} numberOfLines={1}>{item.address}</Text>
                </View>
                <View style={{borderBottomWidth:1,borderBottomColor:'#c7c7c7',marginBottom:2}} />
                <View style={styles.telephone_list_container}>
                    <Text style={styles.contact_list_text}>{ formatPhoneNumber(item.mobile) }</Text>
                </View>
                <View style={styles.location_container}>
                    <View style={styles.location_text_container}>
                        <Text style={styles.location_text}>{item.location_name}</Text>
                    </View>
                    <View style={[styles.status_text_container,{borderColor:statusColor}]}>
                        <Text style={[styles.status_text, { color: statusColor }]}>{item.status}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const ServiceProviderList = ({navigation , route }) => {
    const { itemData, distanceData } = route.params;
    const [restaurantData, setRestaurantData] = useState([]);

    formatPhoneNumber = ( phoneNumber ) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

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
    
                const restaurantData = restaurantDataSnapshot.docs.map(document => ({
                  id: document.id,
                  ...document.data()
                }));
                data.push(...restaurantData);
            }
    
              const filteredData = data.filter(item => item.id !== itemData.id);
              setRestaurantData(filteredData);
            }
          } catch (error) {
            console.error('Error fetching restaurant data: ', error);
          }
        };
        fetchRestaurantData();
      }, []);
    

    const statusColor = itemData.status === 'Open' ? Colors.status_open_clr : Colors.status_close_clr;
    const headerContent = (
        <View style={styles.header_container}>
            <TouchableOpacity style={styles.back_Icon_Container} onPress={() => navigation.goBack()}>
                <Image source={Images.back} style={styles.back_icon}/>
            </TouchableOpacity>
            <View style={styles.logo_container}>
                 <Image source={Images.logo} style ={styles.logo_icon}/>
            </View>
        </View>
    );
    return(
            <BackgroundImage backgroundImage={Images.background}
                headerContent={headerContent}>
                    <View style={styles.separator}/>
                    <ScrollView style={{marginBottom:60}}>
                        <View style={styles.details_container}>
                            <View style={styles.main_container}>
                                <Image source={{ uri: itemData.image }} style={styles.main_icon}/>
                                <View style={styles.name_container}>
                                    <Text style={styles.name_text}>{itemData.name}</Text>
                                    <View style={styles.status_category_container}>
                                        <View style={[styles.status_text_container,{borderColor:statusColor}]}>
                                            <Text style={[styles.status_text, { color: statusColor }]}>{itemData.status}</Text>
                                        </View>
                                        <View style={styles.category_contioner}>
                                            <View style={styles.list_image_container}>
                                                    <Image
                                                        source={ Images.food }
                                                        style={styles.list_icon}/>
                                            </View>
                                            <Text style={styles.category_name}>Food</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.detail_fields_container ,{ marginRight:18 }]}>
                                <View style={styles.detail_fields_icon_container}>
                                    <Image source={Images.location} style={styles.detail_fields_icon}/>
                                </View>
                                <Text style={styles.detail_fields_text}>{itemData.address}</Text>
                            </View>
                            <View style={styles.detail_fields_container}>
                                <View style={styles.detail_fields_icon_container}>
                                    <Image source={Images.website} style={styles.detail_fields_icon}/>
                                </View>
                                <Text style={styles.detail_fields_text}>{itemData.website}</Text>
                            </View>
                            <View style={styles.detail_fields_container}>
                                <View style={styles.detail_fields_icon_container}>
                                    <Image source={Images.mail} style={styles.detail_fields_icon}/>
                                </View>
                                <Text style={styles.detail_fields_text}>{itemData.mail}</Text>
                            </View>
                            <View style={styles.detail_fields_container}>
                                <View style={styles.detail_fields_icon_container}>
                                    <Image source={Images.contact} style={styles.detail_fields_icon}/>
                                </View>
                                <Text style={styles.detail_fields_text}>{formatPhoneNumber(itemData.mobile)}</Text>
                            </View>
                            <View style={styles.detail_fields_container}>
                                <View style={styles.detail_fields_icon_container}>
                                    <Image source={Images.location_name} style={styles.detail_fields_icon}/>
                                </View>
                                <Text style={styles.detail_fields_text}>{itemData.location_name}</Text>
                            </View>
                        </View>
                        <View style={styles.nearby_text_container}>
                            <Text style={styles.nearby_text}>Other Nearby Providers</Text>
                        </View>
                        <View>
                        <FlatList
                            data={restaurantData}
                            renderItem={({ item }) => renderItem({ item , navigation })}
                            keyExtractor={(item, index) => index.toString()} />
                        </View>
                    </ScrollView>
            </BackgroundImage>
    );
}

export default ServiceProviderList;
