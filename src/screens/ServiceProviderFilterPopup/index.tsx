import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import {Strings} from '../../theme/strings';
import {Images} from '../../theme/images';
import MultiSelectComponent from '../../Components/MultiSelectDropdown';
import {Colors} from '../../theme/colors';

const ServiceProviderFilterPopup = ({
  navigation,
  onClose,
  onApplyFilter,
  initialStatus,
  initialParishes,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(
    initialStatus ? initialStatus : null,
  );
  const [selectedlocation, setSelectedlocation] = useState([]);
  const data = [
    {label: 'Open', value: 'Open'},
    {label: 'Close', value: 'Close'},
  ];

  const clearSelectedParishes = () => {
    setSelectedlocation([]);
  };

  const isFocusRef = useRef(false);

  const applyFilter = () => {
    onApplyFilter(selectedStatus, selectedlocation, true);
  };

  const clearFilter = () => {
    setSelectedStatus(null);
    clearSelectedParishes();
    onApplyFilter(null, [], false);
  };

  return (
    <View style={styles.main_container}>
      <View style={styles.sub_container}>
        <View style={styles.header_container}>
          <Text style={styles.filter_text}>Filters</Text>
          <TouchableOpacity
            onPress={onClose}
            style={{justifyContent: 'center'}}>
            <Image source={Images.cross} style={styles.cross_icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown}
            itemTextStyle={styles.label}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            value={initialStatus ? initialStatus : selectedStatus}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Select Status"
            onFocus={() => (isFocusRef.current = true)}
            onBlur={() => (isFocusRef.current = false)}
            onChange={item => setSelectedStatus(item.value)}
          />
        </View>
        <MultiSelectComponent
          onSelectedItemsChange={setSelectedlocation}
          initialParishes={initialParishes}
        />
        <View style={styles.button_container}>
          <TouchableOpacity
            style={styles.clear_button_container}
            onPress={() => {
              clearFilter();
              onClose();
            }}>
            <Text style={{color: Colors.white_clr, alignSelf: 'center'}}>
              {Strings.filter_clear_button}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.apply_button_container}
            onPress={() => {
              applyFilter();
              onClose();
            }}>
            <Text style={{color: Colors.white_clr, alignSelf: 'center'}}>
              {Strings.filter_apply_button}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServiceProviderFilterPopup;
