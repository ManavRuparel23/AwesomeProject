import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Image, Linking , ScrollView, Button } from 'react-native';
import { styles } from './styles';
import { Images } from '../../theme/images';
import { Strings } from "../../theme/strings";
import BackgroundImage from "../../Components/BackgroundImage";
import firestore from '@react-native-firebase/firestore';
import Analytics from "@react-native-firebase/analytics";
import crashlytics from '@react-native-firebase/crashlytics';
const renderItem = ({ item, navigation }) => {
    if(item.name === 'Food'){
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ServiceProviderList')}>
                <View style={styles.list_image_container}>
                    <Image
                        source={
                            item.image
                            ? { uri: item.image + `?${Math.random()}` }
                            : Images.common
                        }
                        style={styles.category_icon}
                    />
                </View>
                <Text style={styles.category_name}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
    else {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.list_image_container}>
                    <Image
                        source={
                            item.image
                            ? { uri: item.image + `?${Math.random()}` }
                            : Images.common
                        }
                        style={styles.category_icon}
                    />
                </View>
                <Text style={styles.category_name}>{item.name}</Text>
            </View>
        );
    }
};
async function onSignIn(user) {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId(user.uid),
      crashlytics().setAttribute('credits', String(user.credits)),
      crashlytics().setAttributes({
        role: 'admin',
        followers: '13',
        email: user.email,
        username: user.username,
      }),
    ]);
  }
  

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

    const sendFeedbackEmail = () => {
        const email = 'manav@thecodevision.com';
        const subject = 'Feedback Mail';
        const body = 'Write your feedback here';
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

        console.log('Sending feedback email to:', email);
        console.log('Subject:', subject);
        console.log('Body:', body);

        Linking.openURL(mailtoLink);
    };

    const headerContent = (
        <View style={styles.header_container}>
            <Image source={Images.logo} style={styles.logo_icon}/>
        </View>
    );
    
    const CustomEvent = async () => {
        console.log("event started");
        await Analytics().logEvent('bicket',{
            id:123456,
            item:'mens gray t-shirt',
            description:['round neck','long sleeved'],
            size:'L',
        });
        console.log("event completed");
    };
    useEffect(() => {
        crashlytics().log('App mounted.');
    }, []);
    
    return (
        <BackgroundImage
            backgroundImage={Images.background}
            headerContent={headerContent}>
            <View>
                <View style={styles.separator} />
                <ScrollView>
                    <Text style={styles.popular_category_text}>{Strings.home_popular_category}</Text>
                    <View>
                        <FlatList
                            data={categoriesData.slice(0, 6).map(item => ({ ...item }))}
                            renderItem={({ item }) => renderItem({ item, navigation })}
                            keyExtractor={( item, index) => index.toString()}
                            numColumns={2} />
                    </View>
                    {/* <Button
                            title="Sign In"
                            onPress={() =>
                            onSignIn({
                                uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
                                username: 'Joaquin Phoenix',
                                email: 'phoenix@example.com',
                                credits: 42,
                            })
                            }
                        />
                    <Button title="test crash" onPress={() => crashlytics().crash()} />
                    <Button title="CustomEvent" onPress={CustomEvent}/> */}
                    <TouchableOpacity style={styles.buttoncontainer} onPress={() => navigation.navigate('Categories')}>
                        <Text style={styles.button_text}>{Strings.home_explore_category}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </BackgroundImage>
    );
}

export default Home;

