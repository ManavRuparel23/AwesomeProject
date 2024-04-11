import React, { useEffect, useState } from "react";
import { View ,Image , Text , TextInput, Button , Alert , TouchableOpacity} from "react-native";
import { styles } from './styles';
import BackgroundImage from "../../Components/BackgroundImage";
import { Images } from "../../theme/images";
import Auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Colors } from "../../theme/colors";


const SignUp = ({ navigation }) => {
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignUp = async () => {
        try {
            // Check if email is already registered
            const emailExists = await firestore().collection('Users')
                .where('email', '==', email)
                .get();
    
            if (!emailExists.empty) {
                Alert.alert('Email is already registered');
            }
    
            // Proceed with user registration
            const userCredential = await Auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
    
            // Store user data in Firestore Users collection
            await firestore().collection('Users').doc(user.uid).set({
                email: user.email,
                password: password,
                id: user.uid
            });
    
            console.log('User registered:', user);
            Alert.alert('Success', 'User registered successfully!');
            
            navigation.goBack();
        } 
        catch (error) 
        {
            console.error('Error signing up:', error.message);
            Alert.alert('Error', error.message);
        }
    };
    return(
        <BackgroundImage backgroundImage={Images.background}
            headerContent={headerContent}>
            <View>
                <View style={styles.separator} />
                <Text style={styles.signup_text}>SignUp</Text>
                <View style={styles.main_container}>
                    <View style={styles.email_container}>
                        <Text style={styles.email_text}>Email</Text>
                        <View style={styles.email_input_container}>
                            <TextInput placeholder="Enter Email"
                                placeholderTextColor={Colors.placeholder_text_clr}
                                onChangeText={(text) => setEmail(text)}
                                value={email}/>
                        </View>
                    </View>
                    <View style={styles.password_container}>
                        <Text style={styles.password_text}>Password</Text>
                        <View style={styles.password_input_container}>
                            <TextInput placeholder="Enter Password"
                                placeholderTextColor={Colors.placeholder_text_clr}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                secureTextEntry/>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.signup_button_container} onPress={(handleSignUp)}>
                    <Text style={styles.signup_button_text}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </BackgroundImage>
    );
}

export default SignUp;
