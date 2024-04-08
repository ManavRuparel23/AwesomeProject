import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../Constants";

export const styles = StyleSheet.create({
    main_container:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    sub_container:{
        height:'auto',
        width:'100%',
        backgroundColor:Colors.white_clr,
        padding:15,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },

    header_container:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15,
    },

    filter_text:{
        fontSize:20,
        color:Colors.blue_text_clr,
        fontFamily:Fonts.LEXEND_DECA_REGULAR,
    },

    cross_icon:{
        height:15,
        width:15,        
    },
    
    container: { 
        padding: 6, 
        marginVertical: 0,
        borderColor:Colors.dropdown_border_clr,
        borderWidth:1,
        borderRadius:6,
        height:40,
        justifyContent:'center'
    },

    dropdown: {
        height: 40,
        backgroundColor: 'transparent',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        fontSize: 12,
        color:Colors.blue_text_clr,
        fontFamily:Fonts.LEXEND_DECA_LIGHT
    },
    placeholderStyle: {
        fontSize: 12,
        fontFamily:Fonts.LEXEND_DECA_REGULAR,
        color:Colors.placeholder_text_clr
    },
    selectedTextStyle: {
        fontSize: 12,
        fontFamily:Fonts.LEXEND_DECA_REGULAR,
        color:Colors.blue_text_clr,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },

    button_container:{
        justifyContent:'space-evenly',
        flexDirection:'row',
        marginHorizontal:7
    },

    clear_button_container:{
        height:32,
        width:'40%',
        backgroundColor:Colors.blue_text_clr,
        borderRadius:20,
        justifyContent:'center',
    },

    apply_button_container:{
        height:32,
        width:'40%',
        backgroundColor:Colors.primary_clr,
        borderRadius:20,
        justifyContent:'center',
    },

    checkboxContainer: {
        marginTop: 10,
        marginLeft: 10,
      },
    
      checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },

});