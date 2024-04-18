import { StyleSheet , Platform } from "react-native";
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
        alignSelf:'center',
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

    separator: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary_clr,
    },

    nearby_text_container:{
        marginHorizontal:18,
        marginVertical:10
    },

    nearby_text:{
        color:Colors.blue_text_clr,
        fontSize:14,
        fontFamily:Fonts.LEXEND_DECA_REGULAR
    },

    listcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor:Colors.primary_clr,
        backgroundColor:Colors.white_clr,
        borderWidth:1,
        width:'92%',
        alignSelf:'center',
        marginVertical:5,
        borderRadius:10,
        padding:10,
    },

    opera_icon_list_container:{
        alignSelf:'center',
        flex: 1,
        borderRadius:10
    },

    organization_list_container: {
        flex: 3,
        marginRight:5,
        justifyContent:'flex-start',
        alignSelf:'flex-start'
    },

    organization_list_text:{
        fontSize:15,
        marginBottom:4,
        fontFamily:Fonts.LEXEND_DECA_SEMIBOLD,
        color:Colors.primary_clr
    },

    distance_list_text:{
        fontSize:10,
        color:Colors.green_clr,
        marginBottom:3,
    },

    address_list_container:{
        flexDirection:'row',
        marginBottom:3,
    },
    
    address_list_text:{
        fontSize:12,
        fontFamily:Fonts.LEXEND_DECA_LIGHT,
        color:Colors.blue_text_clr,
        marginBottom:1,
    },
    location_list_icon:{
        height:90,
        width:70,
        borderRadius:5
    },
    
    telephone_list_container:{
        flexDirection:'row',
        marginBottom:7,
    },

    contact_list_text:{
        fontSize:12,
        fontFamily:Fonts.LEXEND_DECA_LIGHT,
        color:Colors.blue_text_clr,
        marginLeft:0
    },

    provider_status_list_container: {
        flex: 1,
    },

    status_list_text:{
        textAlign:'right',
        fontSize:10,
        marginRight:8,
        color:Colors.green_clr,
    },

    details_container:{
        flexDirection:'column',
        height:'auto',
        borderColor:Colors.primary_clr,
        backgroundColor:Colors.white_clr,
        borderWidth:1,
        borderRadius:10,
        padding:10,
        width:'92%',
        alignSelf:'center',
        marginTop:10
    },

    main_container:{
        flexDirection:'row',
        height:70,
        marginBottom:4
    },

    main_icon:{
        height:71,
        width:83,
        borderRadius:5,
    },

    name_container:{
        marginHorizontal:10,
        flexDirection:'column',
    },

    name_text:{
        fontFamily:Fonts.LEXEND_DECA_SEMIBOLD,
        fontSize:15,
        color:Colors.primary_clr,
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

    location_container:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    location_text_container:{
        backgroundColor:'#fee4db',
        borderRadius:5,
        justifyContent:'center',
        padding:0
    },

    location_text:{
        fontSize:10,
        fontFamily:Fonts.LEXEND_DECA_LIGHT,
        color:Colors.blue_text_clr,
        marginHorizontal:6
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
        height:40,
        width:40,
        flexDirection:'column',
        marginBottom:5
    },

    list_icon: {
        height: 20,
        width: 20,
    },

    category_name:{
        marginBottom:5,
        color:Colors.primary_clr,
        marginLeft:5,
        alignSelf:'center',
        fontFamily:Fonts.LEXEND_DECA_REGULAR,
        fontSize:12
    },

    status_category_container:{
        flexDirection:'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        width:'85%'
    },

    category_contioner:{
        flexDirection:'row',
    },

    detail_fields_container:{
        marginVertical:6,
        flexDirection:'row',
    },

    detail_fields_text:{
        alignSelf:'center',
        fontFamily:Fonts.LEXEND_DECA_LIGHT,
        color:Colors.blue_text_clr,
        fontSize:12,
        marginHorizontal:5
    },

    detail_fields_icon_container:{
        height:25,
        width:25,
        borderRadius:12,
        backgroundColor:'#feeee8',
        justifyContent:'center',
    },

    detail_fields_icon:{
        alignSelf:'center',
    },

    item_list_icon:{
        height:90,
        width:70,
        borderRadius:5
    },

});
