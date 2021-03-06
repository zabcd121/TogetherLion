import React, { useState, useEffect } from "react";
import { Platform, Dimensions, View, Text, Image } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { ButtonGroup } from "react-native-elements";
import { axiosInstance } from "../api";
import { AuthContext } from "../Context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;
const ImageBlock = styled.View`
  padding: 20px;
  align-items: center;
`;
const InputBlock = styled.View`
  align-items: center;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const NickInput = styled.TextInput`
  flex: 0.75;
  border: 1px solid black;
  margin: 0 9px;
  border-radius: 7px;
`;
const CheckButton = styled.TouchableOpacity`
  flex: 0.2;
  height: 50px;
  background: #42a5f5;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
const NextButtonBlock = styled.View`
  width: 100%;
  align-items: center;
`;

const NextButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 50px;
  width:80%
  height: 40px;
  background: #e0e0e0;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const GenderCheckBlock = styled.View`
  width: 40%;
  margin-bottom: 10px;
`;

export default function ProfileFirstSetScreen({ route, navigation }) {
  const [gender, setGender] = useState("M");
  const [username, setUsername] = useState("");

  const buttons = ["남", "여"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { authContext } = React.useContext(AuthContext);
  const { signIn } = authContext;

  const updateIndex = (index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (selectedIndex === 0) {
      setGender("M");
    } else {
      setGender("F");
    }
  }, []);

  const userNameInputChange = (val) => {
    setUsername(val);
  };

  const reduplicationCheck = (username) => {
    axiosInstance
      .post("/v1/accounts/signup/check/", { username: username })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const SignupHandler = (phone_number, username, gender) => {
    let dataToSend = {
      phone_number: phone_number,
      username: username,
      gender: gender,
    };
    console.log(dataToSend);
    axiosInstance
      .post("/v1/accounts/signup/", dataToSend)
      .then((response) => {
        signIn(response.data);
        navigation.navigate("Home"); //, { user: response.data }
      })
      .catch((error) => console.log(error));
  };

  // if (selectedIndex === 0) {
  //   setGender("M");
  //   console.log(gender);
  // } else {
  //   setGender("F");
  //   console.log(gender);
  // }

  // useEffect(() => {
  //   async function fn() {
  //     if ((await selectedIndex) === 0) {
  //       setGender("M");
  //       console.log(gender);
  //     } else {
  //       setGender("F");
  //       console.log(gender);
  //     }
  //   }
  //   fn();
  // }, [selectedIndex]);

  return (
    <Container>
      <ImageBlock>
        <Image
          style={{ width: windowWidth * 0.5, height: windowHeight * 0.25 }}
          source={require("../assets/userIcon.png")}
        />
      </ImageBlock>
      <InputBlock>
        <GenderCheckBlock>
          <ButtonGroup
            onPress={(index) => updateIndex(index)}
            selectedIndex={selectedIndex}
            buttons={buttons}
            selectedButtonStyle={{ backgroundColor: "#42a5f5" }}
          ></ButtonGroup>
        </GenderCheckBlock>
        <Row>
          <Text style={{ fontSize: 20 }}>별명</Text>
          <NickInput
            placeholder="최소 2자 최대 8자"
            onChangeText={(val) => userNameInputChange(val)}
          ></NickInput>
          <CheckButton onPress={() => reduplicationCheck(username)}>
            <Text style={{ color: "white", fontSize: 16 }}>중복확인</Text>
          </CheckButton>
        </Row>
        <NextButtonBlock>
          <NextButton
            onPress={() =>
              SignupHandler(route.params.phone_number, username, gender)
            }
          >
            <Text style={{ fontSize: 20, color: "white" }}>확인</Text>
          </NextButton>
        </NextButtonBlock>
      </InputBlock>
    </Container>
  );
}
