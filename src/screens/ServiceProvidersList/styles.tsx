import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../Constants";


export const styles = StyleSheet.create({

    header_container:{
        flexDirection: 'row',
        backgroundColor: Colors.white_clr,
        padding: 10,
    },

    back_Icon_Container: {
        alignSelf:'center',
        backgroundColor:Colors.back_background_clr,
        height:28,
        width:'7%',
        justifyContent:'center',
        borderRadius:15,
    },

    back_icon:{
        alignSelf:'center'
    },

    logo_container:{
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight:10
    },

    logo_icon:{
        alignItems: 'center',
        justifyContent: 'center',
        height:33,
        width:80
    },

    food_icon:{
        marginLeft:0,
        color:Colors.primary_clr,
        verticalAlign:'middle'
    },

    separator: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary_clr,
        marginBottom:10,
    },

    search_button_container:{
        flexDirection:'row',
        width:'78%',
        backgroundColor:Colors.search_bg_clr,
        alignSelf:'center',
        padding:10,
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
    },

    search_icon:{
        marginRight: 1,
        alignSelf:'center',
        color:Colors.gray_clr,
        marginBottom:1
    },

    location_container:{
        flexDirection:'row',
        justifyContent:'space-between'
    },

    textInput: {
        fontSize:12,
        alignSelf:'center',
        marginLeft:10,
        flex:1,
        padding:0,
        color:Colors.blue_text_clr,
    },

    filter_button_container:{
        alignSelf:'center',
    },

    service_provider_text:{
        fontSize:10,
        marginLeft:18
    },

    listcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor:Colors.primary_clr,
        backgroundColor:Colors.white_clr,
        borderWidth:1,
        width:'90%',
        alignSelf:'center',
        marginVertical:5,
        borderRadius:10,
        padding:10,
    },

    opera_icon_container:{
        alignSelf:'center',
        flex: 1,
        borderRadius:10
    },

    organization_container: {
        flex: 3,
        marginRight:5,
        justifyContent:'flex-start',
        alignSelf:'flex-start'
    },

    organization_text:{
        fontSize:15,
        marginBottom:4,
        fontFamily:Fonts.LEXEND_DECA_SEMIBOLD,
        color:Colors.primary_clr
    },

    distance_text:{
        fontSize:10,
        color:Colors.green_clr,
        marginBottom:3,
    },

    address_container:{
        flexDirection:'row',
        marginBottom:3,
    },

    telephone_container:{
        flexDirection:'row',
        marginBottom:7,
    },

    address_text:{
        fontSize:12,
        fontFamily:Fonts.LEXEND_DECA_LIGHT,
        color:Colors.blue_text_clr,
        marginBottom:1,
    },

    contact_text:{
        fontSize:12,
        fontFamily:Fonts.LEXEND_DECA_LIGHT,
        color:Colors.blue_text_clr,
        marginLeft:0
    },
    contentContainer: {
        flex: 1,
        marginBottom:60
    },

    list_icon:{
        height:90,
        width:70,
        borderRadius:5
    },

    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: Colors.gray_clr,
    },

    location_text:{
        fontSize:10,
        fontFamily:Fonts.LEXEND_DECA_LIGHT,
        color:Colors.blue_text_clr,
        marginHorizontal:6
    },

    location_text_container:{
        backgroundColor:'#fee4db',
        borderRadius:5,
        justifyContent:'center',
        padding:0
    },

    status_text_container:{
        borderColor:Colors.green_clr,
        borderWidth:1,
        paddingHorizontal:22,
        borderRadius:10,
    },

    status_text:{
        fontSize:10,
        marginVertical:3,
        color:Colors.green_clr
    },
   
});