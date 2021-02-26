import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../Context";
import styled from "styled-components/native";
import fetch from "../fetch";
import { axiosInstance } from "../api";
import axios from "axios";
import { remainTimeParser, hello, createdTimeParser } from "../timeUtils";
import PersonIcon from "../components/PersonIcon";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 17px 15px;
  background: #fafafa;
`;

const Contents = styled.FlatList`
  flex: 1;
`;

const ListItem = styled.TouchableOpacity`
  height: 130px;
  padding: 0 10px;
  border: 1px solid #dbdbdb;
  margin-bottom: 7px;
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  background: white;
`;

const LeftBlock = styled.View`
  width: 10%;
  height: 70%;
  flex-direction: column;
`;
const StartLocation = styled.View`
  width: 100%;
  height: 20%;
  align-items: center;
  justify-content: flex-end;
`;
const Row = styled.View`
  width: 100%;
  height: 60%;
  justify-content: center;
  align-items: center;
`;
const Destination = styled.View`
  width: 100%;
  height: 20%;
  justify-content: flex-end;
  align-items: center;
`;

const MiddleBlock = styled.View`
  width: 32%;
  height: 100%;
  margin-left: 5px;
  flex-direction: column;
  border-right-width: 1px;
  border-right-color: #e0e0e0;
  padding-right: 2%;
`;

const Top = styled.View`
  width: 100%;
  height: 44%;
  justify-content: center;
  margin-bottom: 6%;
`;
const Bottom = styled.View`
  width: 100%;
  height: 44%;
  margin-top: 6%;
  justify-content: center;
`;

const RightBlock = styled.View`
  width: 58%;
  height: 100%;
  padding: 0 3%;
`;
const DateBlock = styled.View`
  width: 100%;
  height: 30%;
  flex-direction: row;
  align-items: center;
`;
const TimeBlock = styled.View`
  width: 100%;
  height: 35%;
`;
const Person = styled.View`
  margin: 10px 0;
  flex-direction: row;
`;

const IconBlock = styled.View`
  flex-direction: row;
  width: 50%;
`;
const DateNumber = styled.View`
  width: 85%;
`;

function TogetherBuyScreen({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => navigation.navigate("BuyDetail", { item: item })}
      >
        <LeftBlock>
          <StartLocation>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#616161" }}
            >
              출발
            </Text>
          </StartLocation>
          <Row>
            <FontAwesome name="long-arrow-down" size={30} color="#ff3d00" />
          </Row>
          <Destination>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#616161" }}
            >
              도착
            </Text>
          </Destination>
        </LeftBlock>
        <MiddleBlock>
          <Top>
            <Text
              style={{ fontSize: 17, fontWeight: "bold" }}
              numberOfLines={2}
            >
              금오공과대학교 오름생활관앞2동
            </Text>
          </Top>
          <Bottom>
            <Text
              style={{ fontSize: 17, fontWeight: "bold" }}
              numberOfLines={2}
            >
              옥계중학교앞 신나리아파트1차asd
            </Text>
          </Bottom>
        </MiddleBlock>
        <RightBlock>
          <DateBlock>
            <DateNumber>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#424242" }}
              >
                3월 1일
              </Text>
            </DateNumber>
            <Text style={{ fontSize: 11, color: "#9e9e9e" }}>35분전</Text>
          </DateBlock>
          <TimeBlock>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              오후 6시 30분
            </Text>
          </TimeBlock>
          <Person></Person>
        </RightBlock>
      </ListItem>
    );
  };
  const {
    loginState: { access_token },
  } = useContext(AuthContext);
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [offset, setOffset] = useState(0);

  // const LIMIT = 6;

  const getData = () => {
    setLoading(true);
    console.log(headers);
    axiosInstance({
      url: "/v1/posts/purchase/",
      method: "GET",
      headers,
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        // setData(response);
        // setLoading(false);
      })
      // .then(() => {
      //   setOffset(offset + LIMIT);
      //   setLoading(false);
      // })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onEndReached = () => {
    if (loading) {
      return;
    } else {
      getData();
    }
  };
  return (
    <Container>
      <Contents
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <ActivityIndicator />}
      ></Contents>

      {/* <Text>{JSON.stringify(loginState)}</Text>
      <Button title="click" /> */}
    </Container>
  );
}

/*  */

export default TogetherBuyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
