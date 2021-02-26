import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Feather from "react-native-vector-icons/Feather";

const LeftBlock = styled.View`
  width: ${(props) => props.width || "70%"};
  height: 100%;
`;
const RightBlock = styled.View`
  flex-direction: row;

  height: 100%;
  width: ${(props) => props.width || "30%"};
`;
const IconBlock = styled.TouchableOpacity`
  width: ${(props) => props.width || "50%"};
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;
const Header = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 15px;

  border-bottom-color: #dbdbdb;
  border-bottom-width: 1px;
  flex-direction: row;
  margin-bottom: 10px;
`;
function HeaderTime({ remainTime, loading }) {
  return (
    <Header>
      <LeftBlock>
        <Text style={{ color: "#d50000" }}>종료까지</Text>
        {loading ? <Text style={{ fontSize: 25 }}>{remainTime}</Text> : <></>}
      </LeftBlock>
      <RightBlock>
        <IconBlock style={{ marginRight: 10 }}>
          <SimpleLineIcons name="share" size={28} />
        </IconBlock>
        <IconBlock>
          <Feather name="more-vertical" size={30} />
        </IconBlock>
      </RightBlock>
    </Header>
  );
}

export default HeaderTime;
