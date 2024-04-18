import { StyleSheet , Platform } from "react-native";
import {Colors} from '../../theme/colors';
import { Fonts } from "../../Constants";

export const styles = StyleSheet.create({
        contentContainer: {
            marginBottom:60
        },
       
        separator: {
            borderBottomWidth: 1,
            borderBottomColor: Colors.primary_clr,
            marginBottom:10,
        },

        popular_category_text:{
            textAlign:"center",
            fontSize:14,
            marginBottom:15,
            color:Colors.blue_text_clr,
            fontFamily:Fonts.LEXEND_DECA_REGULAR
        },

        logo_icon:{
            color:Colors.gray_clr,
            verticalAlign:'middle',
            height:33,
            width:80
        },

        category_name:{
            marginTop:5,
            color:Colors.primary_clr,
            fontFamily:Fonts.LEXEND_DECA_MEDIUM,
            fontSize:14
        },
        
        header_container: {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: Colors.white_clr,
            padding: 10,
          },

        itemContainer: {
            padding: 10,
            marginVertical: 10,
            backgroundColor:Colors.white_clr,
            borderRadius: 10,
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'center',
            borderWidth:0.7,
            borderColor:Colors.primary_clr,
            width:'37%',
            height:130,
            shadowColor: '#000',
            shadowOffset: {
            width: 0,
            height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            marginLeft:0,
        },
        
        button_text:{
            color:Colors.white_clr,
            textAlign:"center",
            fontSize:14,
            fontFamily:Fonts.POPPINS_MEDIUM
        },

        buttoncontainer:{
            backgroundColor:Colors.primary_clr,
            width:'35%',
            alignSelf:'center',
            padding:10,
            borderRadius:20,
            marginTop:20,
        },

        about_sendfedback_container:{
            flexDirection:'row',
            justifyContent:'space-evenly',
            marginTop:15,
        },

        about_sendfedback_buttons:{
            padding: 15,
            marginVertical: 5,
            borderRadius: 5,
            justifyContent:'center',
            borderWidth:0.3,
            borderColor:Colors.primary_clr,
            alignItems:'center',
            width:'32%',
            height:120,
            alignSelf:'center'
        },

        about_sendfedback_text:{
            textAlign:'center',
            fontSize:12,
            marginTop:10,
            color:Colors.primary_clr,
        },

        list_image_container:{
            backgroundColor:Colors.white_clr,
            borderRadius: 30,
            padding:10,
            justifyContent:'center',
            borderWidth:0.7,
            borderColor:Colors.list_image_border_clr,
            alignItems:'center',
            shadowColor: '#000',
            shadowOffset: {
            width: 0,
            height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 2,
            elevation: 3,
            height:55,
            width:55,
            flexDirection:'column',
            marginBottom:5
        },

        category_icon: {
            height: 27,
            width: 27,
        },

        
});