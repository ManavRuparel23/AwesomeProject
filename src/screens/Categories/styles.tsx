import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../theme/colors';
import {Fonts} from '../../Constants';

export const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
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
    marginRight: 28,
  },

  logo_icon: {
    alignSelf: 'center',
    height: 33,
    width: 80,
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
    marginBottom: 10,
  },

  search_button_container: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 7,
    backgroundColor: Colors.search_bg_clr,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 15,
    height: 36,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },

  search_icon: {
    marginRight: 1,
    alignSelf: 'center',
    color: Colors.gray_clr,
    marginBottom: 1,
  },

  textInput: {
    fontSize: 12,
    alignSelf: 'center',
    marginLeft: 10,
    flex: 1,
    padding: 0,
    color: Colors.blue_text_clr,
  },

  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary_clr,
    backgroundColor: Colors.white_clr,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    height: 90,
  },

  list_image_container: {
    backgroundColor: Colors.white_clr,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: Colors.list_image_border_clr,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    height: 55,
    width: 55,
    flexDirection: 'column',
    marginBottom: 5,
  },

  category_icon: {
    color: Colors.black_clr,
    verticalAlign: 'middle',
  },
  contentContainer: {
    height: '100%',
  },
  category_name: {
    marginBottom: 5,
    color: Colors.primary_clr,
    marginLeft: 15,
    marginRight: 'auto',
    fontFamily: Fonts.LEXEND_DECA_MEDIUM,
    fontSize: 14,
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
    marginBottom: 60,
  },
});
