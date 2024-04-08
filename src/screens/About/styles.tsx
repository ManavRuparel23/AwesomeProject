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

    separator: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary_clr,
        marginBottom:0,
    },

    logo_icon:{
        color:Colors.gray_clr,
        verticalAlign:'middle',
    },

    container:{
        height:'auto',
        width:'90%',
        backgroundColor:Colors.white_clr,
        borderColor:Colors.primary_clr,
        borderWidth:1,
        alignSelf:'center',
        borderRadius:10,
        flexDirection:'column',
        padding:10
    },

    about_text:{
        fontSize:14,
        alignSelf:'center',
        color:Colors.blue_text_clr,
        fontFamily:Fonts.LEXEND_DECA_REGULAR,
        marginBottom:10,
    },

    about_detail_icon:{
        marginBottom:10
    },

    about_description:{
        fontSize:12,
        color:Colors.blue_text_clr,
        fontFamily:Fonts.LEXEND_DECA_LIGHT,
        letterSpacing:0.5
    },
});

