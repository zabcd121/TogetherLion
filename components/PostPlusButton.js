import React from "react";
import { View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import styled from "styled-components/native";

const PlusCircle = styled.TouchableOpacity`
  background: #1abc9c;
  border-radius: 30;
`;

function PostPlusButton({navigation}) {
  return (
      <PlusCircle>
        <AntDesign name="pluscircleo" size={60} color="#f5f5f5" />
      </PlusCircle>
  );
}

export default PostPlusButton;
