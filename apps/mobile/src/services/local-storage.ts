import AsyncStorage from '@react-native-async-storage/async-storage';

type KeyType = string;

const searchRadiusKey = 'searchRadius';

const getValueFor = async <T>(key: KeyType): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Failed to get value for key ${key} from AsyncStorage:`, error);
    return null;
  }
};

const save = async <T>(key: KeyType, value: T) => {
  try {
    const stringifiedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error(`Failed to save value for key ${key} to AsyncStorage:`, error);
  }
};

export const getSearchRadius = () => getValueFor<number>(searchRadiusKey);
export const saveSearchRadius = (value: number) => save(searchRadiusKey, value);
