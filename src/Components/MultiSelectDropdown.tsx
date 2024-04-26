import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {Fonts} from '../Constants';
import {Colors} from '../theme/colors';
import {Images} from '../theme/images';

interface LocationData {
  id: string;
  location_name: string;
}

interface MultiSelectComponentProps {
  onSelectedItemsChange: (selectedItems: string[]) => void;
  initialParishes: string[];
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({
  onSelectedItemsChange,
  initialParishes,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [restaurantData, setRestaurantData] = useState<LocationData[]>([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const categorySnapshot = await firestore()
          .collection('categories')
          .where('name', '==', 'Food')
          .get();

        const uniqueLocations = new Set<string>();

        if (categorySnapshot) {
          for (const doc of categorySnapshot.docs) {
            const restaurantDataSnapshot = await firestore()
              .collection('categories')
              .doc(doc.id)
              .collection('RestaurantsData')
              .get();

            restaurantDataSnapshot.forEach(document => {
              const { location_name } = document.data();
              uniqueLocations.add(location_name);
            });
          }

          const data: LocationData[] = Array.from(uniqueLocations).map(
            (location_name, index) => ({
              id: index.toString(),
              location_name,
            }),
          );

          setRestaurantData(data);

          if (initialParishes && initialParishes.length > 0) {
            const initialSelections = data
              .filter(item => initialParishes.includes(item.location_name))
              .map(item => item.id);
            setSelected(initialSelections);
            onSelectedItemsChange(initialParishes); // Notify parent of initial selection
          }
        }
      } catch (error) {
        console.error('Error fetching restaurant data: ', error);
      }
    };

    fetchRestaurantData();
  }, [initialParishes, onSelectedItemsChange]);

  useEffect(() => {
    onSelectedItemsChange(
      selected.map(index => restaurantData[index]?.location_name || ''),
    );
  }, [selected, onSelectedItemsChange, restaurantData]);


  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={restaurantData}
        labelField="location_name"
        valueField="id"
        placeholder="Select Parishes"
        value={selected}
        onChange={setSelected}
        renderItem={(item, index, isSelected) => (
          <View>
            <View style={styles.item}>
              <View
                style={[
                  styles.checkboxContainer,
                  {
                    backgroundColor: selected.includes(item.id)
                      ? Colors.primary_clr
                      : Colors.white_clr,
                  },
                ]}>
                {selected.includes(item.id) ? (
                  <Image
                    source={Images.checkboxselected}
                    style={styles.checkboxIcon}
                  />
                ) : (
                  <AntDesign
                    name="checksquareo"
                    size={20}
                    color="transparent"
                  />
                )}
              </View>
              <Text style={styles.label}>{item.location_name}</Text>
            </View>
            <View style={[styles.separator, {backgroundColor: '#DEDEDE'}]} />
          </View>
        )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: {padding: 0, marginBottom: 20},
  dropdown: {
    height: 40,
    backgroundColor: 'transparent',
    borderColor: Colors.dropdown_border_clr,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 3,
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
  },

  iconStyle: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 7,
  },

  label: {
    marginLeft: 7,
    fontSize: 12,
    color: Colors.blue_text_clr,
    fontFamily: Fonts.LEXEND_DECA_LIGHT,
  },

  checkboxContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary_clr,
    borderWidth: 1,
    borderRadius: 4,
  },
  checkboxIcon: {
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  selectedStyle: {
    borderRadius: 12,
    marginTop: 7,
    marginBottom: 0,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.seperator_color,
    marginHorizontal: 0,
  },
});
