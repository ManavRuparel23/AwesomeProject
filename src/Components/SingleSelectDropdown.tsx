import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Fonts} from '../Constants';
import {Colors} from '../theme/colors';

interface DropdownProps {
  data: {label: string; value: string}[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const SingleSelectDropdown: React.FC<DropdownProps> = ({
  data,
  selectedValue,
  onValueChange,
  placeholder = 'Select',
}) => {
  return (
    <Dropdown
      style={styles.dropdown}
      itemTextStyle={styles.label}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      value={selectedValue}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      onChange={(item: any) => onValueChange(item.value)}
      renderItem={item => (
        <View>
          <View style={styles.item}>
            <Text style={styles.label}>{item.value}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      )}
    />
  );
};

export default SingleSelectDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: 'transparent',
    borderColor: Colors.dropdown_border_clr,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    marginVertical: 4,
    padding: 2,
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 7,
  },

  placeholderStyle: {
    fontSize: 12,
    fontFamily: Fonts.LEXEND_DECA_REGULAR,
    color: Colors.placeholder_text_clr,
    marginHorizontal: 5,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: Fonts.LEXEND_DECA_REGULAR,
    color: Colors.blue_text_clr,
    marginHorizontal: 5,
  },

  separator: {
    height: 1,
    backgroundColor: Colors.seperator_color,
    marginHorizontal: 0,
  },

  label: {
    marginLeft: 7,
    fontSize: 12,
    color: Colors.blue_text_clr,
    fontFamily: Fonts.LEXEND_DECA_LIGHT,
  },
});
