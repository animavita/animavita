import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const apiUrl = Constants?.expoConfig?.extra?.apiUrl;

const baseURL = typeof apiUrl === "object" ? apiUrl[Platform.OS] : apiUrl;

const client = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

export default client;
