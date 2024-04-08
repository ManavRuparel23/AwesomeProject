import React ,{useEffect, useRef,useState} from "react";
import {styles} from './styles';
import { View ,Text, TextInput,FlatList, ScrollView , Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Images} from '../../theme/images';
import { Strings } from "../../theme/strings";
import { Colors } from "../../theme/colors";
import BackgroundImage from "../../Components/BackgroundImage";

const renderItem = ({ item , navigation }) => {
    if (item.name === 'Food') {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ServiceProviderList')}
                style={styles.itemContainer}>
                <View style={styles.list_image_container}>
                    <Image
                        source={
                            item.image
                            ? {uri: item.image + `?${Math.random()}`}
                            : Images.common
                        }
                        style={styles.list_icon}
                    />
                </View>
                <Text style={styles.category_name}>{item.name}</Text>
                <Image source={Images.next} />
            </TouchableOpacity>
        );
    } else {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.list_image_container}>
                    <Image
                        source={
                            item.image
                            ? {uri: item.image + `?${Math.random()}`}
                            : Images.common
                        }
                        style={styles.list_icon}
                    />
                </View>
                <Text style={styles.category_name}>{item.name}</Text>
                <Image source={Images.next} />
            </View>
        );
    }
};

const Categories = ( { navigation } ) =>{
    const [categoriesData, setRestaurantData] = useState([]);
    useEffect(() => {
        const fetchcategoriesData = async () => {
            try {
                const snapshot = await firestore()
                    .collection('categories')
                    .get();
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log('categories Data:', data);
                setRestaurantData(data);
            } catch (error) {
                console.error('Error fetching categories data: ', error);
            }
        };
        fetchcategoriesData();
    }, []);
    const [imageUrl, setImageUrl] = useState(undefined);
        useEffect(() => {
            storage()
            .ref('Images/' + 'common.png')
            .getDownloadURL()
            .then((url) => {
                setImageUrl(url);
                console.log("Url is :- ",url);
            })
            .catch((e) => console.log('Errors while downloading => ', e));
        }, []);
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
        <BackgroundImage
            backgroundImage={Images.background}
            headerContent={headerContent}>
            <View style={styles.container}>
                <View style={styles.separator}/>
                <View style={styles.search_button_container}>
                    <Image source={Images.search} style={styles.search_icon}/>
                    <TextInput placeholderTextColor= {Colors.placeholder_text_clr} 
                        placeholder="Search" style={styles.textInput}/>
                </View>
                <ScrollView style={styles.scrollView}>
                    <FlatList
                        data={categoriesData.slice(0, 6).map(item => ({ ...item }))}
                        renderItem={({ item }) => renderItem({ item, navigation })}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
            </View>
        </BackgroundImage>
    );
}


export default Categories;