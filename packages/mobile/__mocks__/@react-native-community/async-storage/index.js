import AsyncStorageMock from '@react-native-community/async-storage/jest/async-storage-mock';

AsyncStorageMock.getItem = jest.fn(() => '{ "accessToken":"" }');

export default AsyncStorageMock;
