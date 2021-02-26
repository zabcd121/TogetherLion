import AsyncStorage from "@react-native-community/async-storage";
import { axiosInstance } from "./api";

//만약에 검색이나 디테일정보를 보려고 눌렀을 때 이미 한번 로드했던 정보면 로컬저장소에 저장해뒀다가
//axios보다 먼저 실행되서 있으면 로컬에서 주고 없으면 axios검색해서 준다.
async function fetch({ url, headers, method }) {
  try {
    let result = await AsyncStorage.getItem(url);
    if (result !== null) {
      return JSON.parse(result);
    }

    const response = await axiosInstance({ url, headers });
    AsyncStorage.setItem(url, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    alert(error.message);
  }
}

export default fetch;
