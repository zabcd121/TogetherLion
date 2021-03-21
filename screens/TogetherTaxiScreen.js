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
import TaxiPersonIcon from "../components/TaxiPersonIcon";
import Ionicons from "react-native-vector-icons/Ionicons";

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
  padding-right: 4%;
`;
const TimeBlock = styled.View`
  width: 100%;
  height: 28%;
`;
const BottomBlock = styled.View`
  flex-direction: row;
  width: 100%;
  height: 35%;
`;
const Person = styled.View`
  margin: 5.5% 0;
  flex-direction: row;
  width: 70%;
  height: 100%;
`;

const GenderBlock = styled.View`
  margin: 5.5% 18%;
  width: 30%;
  height: 100%;
`;
const DateNumber = styled.View`
  width: 85%;
`;

function TogetherBuyScreen({ navigation }) {
  const renderItem = ({ item }) => {
    let deadline = item.deadline;
    let year = deadline.substring(0, 4);
    let month = deadline.substring(5, 7);
    let day = deadline.substring(8, 10);
    let hour = deadline.substring(11, 13);
    let minute = deadline.substring(14, 16);
    let second = deadline.substring(17, 19);
    if (hour === "12" && minute === "00" && second === "00") {
      hour = "오후 12";
    } else if (hour === "24" && minute === "00" && second === "00") {
      hour = "오전 12";
    } else if (hour == "12" && minute >= 1) {
      hour = "오후 12";
    } else if (hour >= 12 && hour < 24) {
      hour = "오후 " + (parseInt(hour) - 12);
    } else if (hour < 12 && hour > 0) {
      hour = "오전 " + parseInt(hour);
    }

    return (
      <ListItem
        onPress={() => navigation.navigate("TaxiDetail", { item: item })}
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
              {item.arrival_place}
            </Text>
          </Top>
          <Bottom>
            <Text
              style={{ fontSize: 17, fontWeight: "bold" }}
              numberOfLines={2}
            >
              {item.departure_place}
            </Text>
          </Bottom>
        </MiddleBlock>
        <RightBlock>
          <DateBlock>
            <DateNumber>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#424242" }}
              >
                {month}월 {day}일
              </Text>
            </DateNumber>
            <Text style={{ fontSize: 11, color: "#9e9e9e" }}>
              {createdTimeParser(item.created_at)}
            </Text>
          </DateBlock>
          <TimeBlock>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {hour}시 {minute}분
            </Text>
          </TimeBlock>
          <BottomBlock>
            <Person>
              {item.gender_limitation === "F" ? (
                <Ionicons name="person" color="#1ABC9C" size={32} />
              ) : item.gender_limitation === "T" &&
                item.author.gender === "M" ? (
                <Ionicons name="person" color="#638FE3" size={32} />
              ) : (
                <Ionicons name="person" color="#F588DD" size={32} />
              )}
              <TaxiPersonIcon
                gender_limitation={item.gender_limitation}
                gender={item.author.gender}
                item={item}
                size={32}
              />
            </Person>
            <GenderBlock>
              {item.gender_limitation === "F" ? (
                <Ionicons name="bookmarks" color="#1ABC9C" size={30} />
              ) : item.gender_limitation === "T" &&
                item.author.gender === "M" ? (
                <Ionicons name="bookmarks" color="#638FE3" size={30} />
              ) : (
                <Ionicons name="bookmarks" color="#F588DD" size={30} />
              )}
            </GenderBlock>
          </BottomBlock>
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
      url: "/v1/posts/taxi/",
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

export default React.memo(TogetherBuyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
