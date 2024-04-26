import firestore from '@react-native-firebase/firestore';
interface Item {
  id: string;
  name?: string;
  image?: string;
}

interface ItemData {
  id: string;
  name?: string;
  address?: string;
  mobile?: string;
  location_name?: string;
  status?: string;
  image?: string;
  mail?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
}

export const fetchCategoriesData = async (): Promise<Item[]> => {
  try {
    const snapshot = await firestore().collection('categories').get();
    const data: Item[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    throw new Error('Error fetching categories data: ' + error);
  }
};

// export const fetchRestaurantData = async (
//   categoryName: string,
// ): Promise<ItemData[]> => {
//   try {
//     const listSubcollections = functions().httpsCallable('listSubcollections');
//     const response = await listSubcollections({
//       path: `categories/${categoryName}`, // Adjust the path as per your Firestore structure
//     });
//     const subcollectionNames: string[] = response.data.collections;

//     const data: ItemData[] = [];
//     for (const subcollectionName of subcollectionNames) {
//       const restaurantDataSnapshot = await firestore()
//         .collection('categories')
//         .doc(categoryName)
//         .collection(subcollectionName)
//         .get();
//       const restaurantData = restaurantDataSnapshot.docs.map(document => ({
//         id: document.id,
//         ...document.data(),
//       }));
//       data.push(...restaurantData);
//     }
//     return data;
//   } catch (error) {
//     throw new Error('Error fetching restaurant data: ' + error);
//   }
// };

export const fetchRestaurantData = async (
  categoryName: string,
): Promise<ItemData[]> => {
  try {
    const categorySnapshot = await firestore()
      .collection('categories')
      .where('name', '==', categoryName)
      .get();
    const data: ItemData[] = [];
    for (const doc of categorySnapshot.docs) {
      const restaurantDataSnapshot = await firestore()
        .collection('categories')
        .doc(doc.id)
        .collection('RestaurantsData')
        .get();
      const restaurantData = restaurantDataSnapshot.docs.map(document => ({
        id: document.id,
        ...document.data(),
      }));
      data.push(...restaurantData);
    }
    return data;
  } catch (error) {
    throw new Error('Error fetching restaurant data: ' + error);
  }
};
