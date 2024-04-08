import React, { useState } from 'react';
import { StyleSheet, View , Text , Image } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Fonts } from '../Constants';
import { Colors } from '../theme/colors';
import { Images } from '../theme/images';

  const data = [
  { label: 'The Catholic Church', value: '1' },
  { label: 'The Southern Baptist Convention', value: '2' },
];

  const MultiSelectComponent = () => {
    const [selected, setSelected] = useState([]);

      return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select Parishes"
        value={selected}
        onChange={item => {
          setSelected(item);
        }}
        renderItem={( item, index, isSelected ) => (
            <View style={styles.item}>
            <View style={[styles.checkboxContainer, { backgroundColor: selected.includes(item.value) ? Colors.primary_clr : Colors.white_clr }]}>
              {selected.includes(item.value) ? (
                <Image source={Images.checkboxselected} style={styles.checkboxIcon} />
              ) : ( 
                <AntDesign name="checksquareo" size={20} color='transparent' />
              )}
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

  export default MultiSelectComponent;

  const styles = StyleSheet.create({
    container: { padding: 0 , marginBottom:20},
    dropdown: {
      height: 40,
      backgroundColor: 'transparent',
      borderColor:'#DDDDDD',
      borderWidth:1,
      borderRadius:6,
      justifyContent:'center',
      marginVertical: 10,
      marginBottom:3,
    },
    placeholderStyle: {
      fontSize: 12,
      fontFamily:Fonts.LEXEND_DECA_REGULAR,
      color:'#0000004D',
      marginHorizontal:5
    },
    selectedTextStyle: {
      fontSize: 12,
      fontFamily:Fonts.LEXEND_DECA_REGULAR,
      color:'#163959'
    },
    iconStyle: {
      width: 20,
      height: 20,
      marginHorizontal:5
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical:10,
      paddingHorizontal: 10,
    },
    
    label: {
      marginLeft: 7,
      fontSize: 12,
      color:'#163959',
      fontFamily:Fonts.LEXEND_DECA_LIGHT,
    },
  
    checkboxContainer: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:Colors.primary_clr,
      borderWidth:1,
      borderRadius:4
    },
    checkboxIcon: {
      width: 15,
      height: 15,
      alignSelf:'center'
    },
    selectedStyle: {
      borderRadius: 12,
      marginTop:7,
      marginBottom:0
    },
  });
  

