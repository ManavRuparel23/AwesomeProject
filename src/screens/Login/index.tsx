import React, { useEffect, useState } from "react";
import { View ,Image , Text , TextInput, Button , Alert, TouchableOpacity} from "react-native";
import { styles } from './styles';
import BackgroundImage from "../../Components/BackgroundImage";
import { Images } from "../../theme/images";
import Auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../Constants";

const Login = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const headerContent = (
        <View style={styles.header_container}>
            <Image source={Images.logo} style={styles.logo_icon}/>
        </View>
    );

    const handleLogin = async () => {
        try {
          // Perform login actions using Firebase Auth
          const userCredential = await Auth().signInWithEmailAndPassword(email, password);
          const user = userCredential.user;
          console.log('User logged in:', user);
          Alert.alert('Success', 'User Login successful!');
          
          navigation.navigate('Tabs');
        } catch (error) {
          console.error('Error logging in:', error.message);
          Alert.alert('Error', error.message);
        }
    };
    return(
        <BackgroundImage backgroundImage={Images.background}
                    headerContent={headerContent}>
             <View>
                <View style={styles.separator} />
                <Text style={styles.login_text}>Login</Text>
                <View style={styles.main_container}>
                    <View style={styles.email_container}>
                        <Text style={styles.email_text}>Email</Text>
                        <View style={styles.email_input_container}>
                            <TextInput placeholder="Enter Email"
                                placeholderTextColor={Colors.placeholder_text_clr}
                                style={styles.email_input}
                                onChangeText={(text) => setEmail(text)}
                                value={email}/>
                        </View>
                    </View>
                    <View style={styles.password_container}>
                        <Text style={styles.password_text}>Password</Text>
                        <View style={styles.password_input_container}>
                            <TextInput placeholder="Enter Password"
                                placeholderTextColor={Colors.placeholder_text_clr}
                                style={styles.password_input}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                secureTextEntry/>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.login_button_container} onPress={(handleLogin)}>
                    <Text style={styles.signin_button_text}>SignIn</Text>
                </TouchableOpacity>
                <View style={styles.signup_container}>
                    <Text style={{color:Colors.black_clr , fontFamily:Fonts.LEXEND_DECA_REGULAR}}>Don't Have an Acccount ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signup_text}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BackgroundImage>
    );

}

export default Login;