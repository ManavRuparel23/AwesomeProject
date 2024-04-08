import { StyleSheet , Platform } from "react-native";
import {Colors} from '../../theme/colors';

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

    category_text_container: {
        flex: 1, 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    separator: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary_clr,
        marginBottom:10,
    },


    search_button_container:{
        flexDirection:'row',
        width:'90%',
        marginTop:7,
        backgroundColor:Colors.search_bg_clr,
        alignSelf:'center',
        padding:10,
        marginBottom:15,
        height:36,
        borderRadius:6,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 3,
    },

    search_icon:{
        marginRight: 1,
        alignSelf:'center',
        color:Colors.gray_clr,
        marginBottom:1
    },

    textInput: {
        fontSize:12,
        padding:0,
        alignSelf:'center',
        marginLeft:10
    },

    itemContainer:{
        flexDirection:'row',
        padding: 12,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth:0.3,
        borderColor:Colors.primary_clr,
        backgroundColor:Colors.white_clr,
        alignItems:'center',
        width:'90%',
        alignSelf:'center',
        height:80,
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
        width:'18%',
        flexDirection:'column',
        marginBottom:5
    },

    category_icon:{
        color:Colors.black_clr,
        verticalAlign:'middle',
    },
    contentContainer: {
        height: '100%',
      },
    category_name:{
        marginBottom:5,
        color:Colors.primary_clr,
        fontWeight:'500',
        marginLeft:15,
        marginRight:'auto'
    },

    list_icon: {
        height: 25,
        width: 25,
    },

    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        marginBottom:60
    },

});