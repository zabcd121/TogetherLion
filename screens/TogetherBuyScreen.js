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
import ListItem from "../components/ListItem";
import fetch from "../fetch";
import { axiosInstance } from "../api";
import axios from "axios";
import { remainTimeParser, hello, createdTimeParser } from "../timeUtils";
import PersonIcon from "../components/PersonIcon";
import Ionicons from "react-native-vector-icons/Ionicons";

const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 17px 12px;
`;

const Contents = styled.FlatList`
  flex: 1;
`;

const ProductImageBlock = styled.View`
  width: 30%;
  height: 100%;
  margin-right: 5px;
  border: 1px solid #dbdbdb;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ContentsBlock = styled.View`
  padding: 0px 5px;
  width: 70%;
  height: 100%;
  /* background: pink; */
`;
const MiddleBlock = styled.View`
  flex-direction: row;
  height: 37%;
  align-items: center;
`;
const Price = styled.Text`
  font-size: 15px;
  font-weight: bold;
  width: 50%;
`;

const BottomBlock = styled.View`
  margin: 10px 0;
  flex-direction: row;
`;

const IconBlock = styled.View`
  flex-direction: row;
  width: 50%;
`;
const TitleBlcok = styled.View`
  width: 90%;
  height: 20%;
`;
const CreateParserBlock = styled.View`
  width: 20%;
  height: 100%;
  justify-content: flex-start;
`;

const CreateParser = styled.Text`
  font-size: 11px;
  color: #9e9e9e;
`;
const FirstBlock = styled.View`
  width: 100%;
  height: 30%;
`;

function TogetherBuyScreen({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => navigation.navigate("BuyDetail", { item: item })}
      >
        <ProductImageBlock>
          {item.thumb_img ? (
            <ProductImage source={{ uri: item.thumb_img.image }} />
          ) : (
            <ProductImage source={require("../assets/lion.jpg")}></ProductImage>
          )}
        </ProductImageBlock>
        <ContentsBlock>
          <FirstBlock style={{ flexDirection: "row" }}>
            <TitleBlcok>
              <Text style={{ fontSize: 18, paddingBottom: 5 }}>
                {item.title}
              </Text>
            </TitleBlcok>
            <CreateParserBlock>
              <CreateParser>{createdTimeParser(item.created_at)}</CreateParser>
            </CreateParserBlock>
          </FirstBlock>
          <MiddleBlock>
            <Price>
              {" "}
              {Math.ceil(item.price / item.join_limitation)}원
              <Text
                style={{ color: "#616161", fontSize: 11, paddingBottom: 5 }}
              >
                (1인당)
              </Text>
            </Price>

            <Price>종료까지</Price>
          </MiddleBlock>
          <BottomBlock>
            <IconBlock>
              <Ionicons name="person" color="#1ABC9C" size={23} />
              <PersonIcon item={item} size={23} />
            </IconBlock>
            <Text>{remainTimeParser(item.deadline)}</Text>
          </BottomBlock>
        </ContentsBlock>
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
