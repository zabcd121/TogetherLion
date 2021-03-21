import React from "react";
import {View, Text} from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;
const Input = styled.TextInput`
  border: 1px solid white;
  margin: 0 9px;
  border-radius: 7px;
`;
function CreateBuyPost() {
  return (
    <Container>
      <Input 
				placeholder="제목"
        // onChangeText={(val) => userNameInputChange(val)}
				/>
				
    </Container>
  );
}

export default CreateBuyPost;
