import { StyleSheet , Platform } from "react-native";
import {Colors} from '../../theme/colors';
import { Fonts } from "../../Constants";

export const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: Colors.white_clr,
        padding: 10,
        alignItems: 'center',
    },

    back_Icon_Container: {
        backgroundColor: Colors.back_background_clr,
        height: 28,
        width: 28,
        justifyContent: 'center',
        borderRadius: 15,
        marginRight: 0, 
      },
      
      back_icon: {
        alignSelf: 'center',
      },
      
      logo_container: {
        flex: 1,
        justifyContent: 'center',
        marginRight:28
      },
      
      logo_icon: {
        alignSelf: 'center',
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
        backgroundColor:Colors.search_bg_clr,
        height:40,
        paddingHorizontal:5,
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
        height:40,
        paddingHorizontal:5,
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
    signup_button_container:{
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

    signup_button_text:{
        alignSelf:'center',
        fontSize:14,
        color:Colors.white_clr,
        fontFamily:Fonts.LEXEND_DECA_REGULAR
    },

    signup_text:{
        textAlign:"center",
        fontSize:16,
        marginBottom:5,
        color:Colors.blue_text_clr,
        fontFamily:Fonts.LEXEND_DECA_REGULAR
    },


});