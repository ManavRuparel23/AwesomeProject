import { StyleSheet , Platform } from "react-native";
import {Colors} from '../../theme/colors';
import { Fonts } from "../../Constants";

export const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        justifyContent: 'center',
        backgroundColor: Colors.white_clr,
        padding: 10,
    },

    logo_icon:{
        color:Colors.gray_clr,
        verticalAlign:'middle',
    },

    separator: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary_clr,
        marginBottom:10,
    },

    main_container:{
        marginVertical:10,
        marginHorizontal:10
    },

    email_container:{
        marginVertical:10
    },

    email_text:{
        fontSize:14,
        color:Colors.primary_clr,
        fontFamily:Fonts.LEXEND_DECA_REGULAR
    },

    email_input_container:{
        flexDirection:'row',
        width:'98%',
        height:40,
        paddingHorizontal:5,
        backgroundColor:Colors.search_bg_clr,
        borderRadius:6,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 3,
        marginVertical:5,
        borderColor:Colors.primary_clr,
        borderWidth:1
    },

    password_container:{
        marginVertical:10
    },

    password_text:{
        fontSize:14,
        color:Colors.primary_clr,
        fontFamily:Fonts.LEXEND_DECA_REGULAR
    },

    password_input_container:{
        flexDirection:'row',
        width:'98%',
        backgroundColor:Colors.search_bg_clr,
        paddingHorizontal:5,
        height:40,
        borderRadius:6,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 3,
        marginVertical:5,
        borderColor:Colors.primary_clr,
        borderWidth:1
    },
    login_button_container:{
        flexDirection:'column',
        width:'30%',
        backgroundColor:Colors.primary_clr,
        height:36,
        borderRadius:6,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2,
        elevation: 3,
        marginVertical:5,
        alignSelf:'center',
        justifyContent:'center'
    },

    signin_button_text:{
        alignSelf:'center',
        fontSize:14,
        color:Colors.white_clr,
        fontFamily:Fonts.LEXEND_DECA_REGULAR
    },

    login_text:{
        textAlign:"center",
        fontSize:16,
        marginBottom:5,
        color:Colors.blue_text_clr,
        fontFamily:Fonts.LEXEND_DECA_REGULAR
    },

    signup_container:{
        flexDirection:'row',
        alignSelf:'center',
    },

    signup_text:{
        color:Colors.primary_clr,
        fontFamily:Fonts.LEXEND_DECA_REGULAR
    },

    email_input:{
        
    },

    password_input:{

    },

});