import styled from "styled-components/native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View } from "react-native";

const ProfleImgCircle = styled.TouchableOpacity`
  width: ${(props) => props.width || "14%"};
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ParticipantBlock = styled.View`
  border-top-color: #dbdbdb;
  border-top-width: 1px;
  flex-direction: row;
  align-items: center;
  padding: 0 15px 0 15px;
`;

function Participant({ data, whoIs, username }) {
  return (
    <ParticipantBlock>
      <ProfleImgCircle>
        <Ionicons name="person-circle-sharp" size={50} color="#9e9e9e" />
      </ProfleImgCircle>
      <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: "500" }}>
        username넣기
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#bdbdbd" }}>{whoIs}</Text>
      </View>
    </ParticipantBlock>
  );
}

export default Participant;
