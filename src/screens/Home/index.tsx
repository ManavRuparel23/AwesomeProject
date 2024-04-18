import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Image, Linking , ScrollView, Button } from 'react-native';
import { styles } from './styles';
import { Images } from '../../theme/images';
import { Strings } from "../../theme/strings";
import BackgroundImage from "../../Components/BackgroundImage";
import firestore from '@react-native-firebase/firestore';

const renderItem = ({ item, navigation }) => {
    if(item.name === 'Food'){
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ServiceProviderList')}>
                <View style={styles.list_image_container}>
                    <Image source={{ uri: item.image }} style={styles.category_icon} />
                </View>
                <Text style={styles.category_name}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
    else {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.list_image_container}>
                    <Image source={{ uri: item.image }} style={styles.category_icon} />
                </View>
                <Text style={styles.category_name}>{item.name}</Text>
            </View>
        );
    }
};

  

const Home = ({ navigation }) => {
    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const snapshot = await firestore()
                    .collection('categories')
                    .get();
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log('categories Data:', data);
                setCategoriesData(data);
            } catch (error) {
                console.error('Error fetching categories data: ', error);
            }
        };
        fetchCategoriesData();
    }, []);

    const headerContent = (
        <View style={styles.header_container}>
            <Image source={Images.logo} style={styles.logo_icon}/>
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
                        <Text style={styles.popular_category_text}>{Strings.home_popular_category}</Text>
                        <View>
                            <FlatList columnWrapperStyle={{justifyContent:'space-evenly'}}
                                data={categoriesData.slice(0, 6).map(item => ({ ...item }))}
                                renderItem={({ item }) => renderItem({ item, navigation })}
                                keyExtractor={( item, index) => index.toString()}
                                numColumns={2} />
                        </View>
                        <TouchableOpacity style={styles.buttoncontainer} onPress={() => navigation.navigate('Categories')}>
                            <Text style={styles.button_text}>{Strings.home_explore_category}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </BackgroundImage>
    );
}

export default Home;

