import React ,{useEffect, useRef,useState} from "react";
import { View ,Text, TextInput,FlatList, ScrollView , Image } from "react-native";
import {styles} from './styles';
import BackgroundImage from "../../Components/BackgroundImage";
import { Images } from "../../theme/images";
import { Strings } from "../../theme/strings";

const About = () => {
    const headerContent = (
        <View style={styles.header_container}>
            <Image source={Images.logo} style={styles.logo_icon} />
        </View>
    );
    return(
        <BackgroundImage backgroundImage={Images.background}
            headerContent={headerContent}>
            <View style={styles.separator} />
            <ScrollView>
                <View style={{justifyContent:'center',marginTop:7}}>
                    <View style={styles.container}>
                        <Text style={styles.about_text}>About</Text>
                        <Image source={Images.about_detail} style={styles.about_detail_icon}/>
                        <Text style={styles.about_description}>{Strings.about_description}</Text>
                    </View>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

export default About;