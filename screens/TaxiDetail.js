import React, { useEffect, useState, useContext } from "react";
import { Dimensions, View, Text, Image, Button } from "react-native";
import styled from "styled-components/native";
import { createdTimeParser, remainTimeParser } from "../timeUtils";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SliderBox } from "react-native-image-slider-box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../Context";
import { axiosInstance } from "../api";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import fetch from "../fetch";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import PersonIcon from "../components/PersonIcon";
import Participant from "../components/Participant";
import HeaderTime from "../components/HeaderTime";
import BuyComment from "../components/BuyComment";
import TaxiComment from "../components/TaxiComment";

// const { wp } = Dimensions.get("screen").width;
// const { hp } = Dimensions.get("screen").height;

const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 15px 0px 0px 0px;
`;

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
const Contents = styled.ScrollView``;

const Padding = styled.View`
  padding: 0 15px 10px 15px;
`;

const Profile = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  margin-bottom: 13px;
`;
const ProfleImgCircle = styled.TouchableOpacity`
  width: ${(props) => props.width || "80%"};
  height: 100%;
  flex-direction: row;
  align-items: center;
`;
const CreateParser = styled.View`
  width: 19%;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;
const MainContents = styled.View`
  padding: 0 8px;
  width: 100%;
`;

const Bottom = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  padding: 5px 0px;
  border-top-color: #dbdbdb;
  border-top-width: 1px;
`;
const ParticipationButton = styled.TouchableOpacity`
  width: 90%;
  height: 90%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border-radius: 30px; */
  background: #1abc9c;
`;
const PersonBlock = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
`;
const PersonIconBlock = styled.View`
  flex-direction: row;
  width: 50%;
`;
const PersonNumberBlock = styled.View`
  width: 50%;
  justify-content: center;
  align-items: flex-end;
`;
const FirsttBlock = styled.View`
  width: 10%;
  height: 100%;
  flex-direction: column;
  padding: 2% 0;
  margin-right: 20px;
`;
const StartLocation = styled.View`
  width: 100%;
  height: 25%;
  justify-content: flex-end;
  align-items: center;
`;
const Row = styled.View`
  width: 100%;
  height: 50%;
  justify-content: center;
  align-items: center;
`;
const Destination = styled.View`
  width: 100%;
  height: 25%;
  justify-content: flex-start;
  align-items: center;
`;

const MiddleBlock = styled.View`
  width: 90%;
  height: 100%;
  margin-left: 5px;
  flex-direction: column;
  padding-right: 2%;
`;

const TopLocation = styled.View`
  width: 100%;
  height: 50%;
  padding-top: 2%;
  justify-content: flex-start;

  margin-bottom: 1%;
`;
const BottomLocation = styled.View`
  width: 100%;
  height: 50%;

  justify-content: center;
`;

const InformationBlock = styled.View`
  width: 100%;
  height: 130px;
  padding: 10px;
  border: 1px solid #bdbdbd;
  border-bottom-color: #bdbdbd;
  border-bottom-width: 4px;
  margin-bottom: 5%;
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
`;

const { width } = Dimensions.get("window");
// const height = width * 0.6; // 60%;

function TaxiDetail({ route }) {
  const { item } = route.params;
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);

  const {
    loginState: { access_token },
  } = useContext(AuthContext);
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const [data, setData] = useState({});

  const getData = () => {
    setLoading(true);
    console.log(headers);
    axiosInstance({
      url: `/v1/posts/taxi/${item.id}/`,
      method: "GET",
      headers,
    })
      .then((response) => {
        console.log("data", response.data);
        setData(response.data);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  useEffect(() => {
    getData();
    return () => {
      setLoading(false);
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);

  const [remainTime, setRemainTime] = useState();

  const tick = () => {
    setRemainTime(remainTimeParser(item.deadline));
  };

  useEffect(() => {
    tick();
    setInterval(tick, 1000);

    return () => setLoading(false);
  }, []);

  const handleLike = () => {
    axiosInstance({
      url: `/v1/posts/taxi/${data.id}/like/`,
      method: "POST",
      headers,
    })
      .then((response) => {
        setLike(!like);
      })
      .then((response) => {
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <HeaderTime remainTime={remainTime} loading={loading} />
      {/* Header끝 */}
      {/*내용시작 */}
      <Contents>
        <Padding>
          <Profile>
            <ProfleImgCircle>
              <Ionicons name="person-circle-sharp" size={50} color="#9e9e9e" />
              <Text style={{ fontSize: 20 }}>
                zabcd121
                {/* {JSON.stringify(data.author)} */}
              </Text>
            </ProfleImgCircle>
            <CreateParser>
              <Text style={{ fontSize: 12, color: "#9e9e9e" }}>
                {createdTimeParser(item.created_at)}
              </Text>
            </CreateParser>
          </Profile>
          <MainContents>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
              {item.title}
            </Text>
          </MainContents>
          <InformationBlock>
            <FirsttBlock>
              <StartLocation>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "#616161" }}
                >
                  출발
                </Text>
              </StartLocation>
              <Row>
                <FontAwesome name="long-arrow-down" size={30} color="#ff3d00" />
              </Row>
              <Destination>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "#616161" }}
                >
                  도착
                </Text>
              </Destination>
            </FirsttBlock>
            <MiddleBlock>
              <TopLocation>
                <Text
                  style={{ fontSize: 19, fontWeight: "bold" }}
                  numberOfLines={2}
                >
                  {item.arrival_place}
                </Text>
              </TopLocation>
              <BottomLocation>
                <Text
                  style={{ fontSize: 19, fontWeight: "bold" }}
                  numberOfLines={2}
                >
                  {item.departure_place}
                </Text>
              </BottomLocation>
            </MiddleBlock>
          </InformationBlock>
          <MainContents>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              {data.content}
            </Text>
            <Text
              style={{ fontSize: 14, color: "#bdbdbd", fontWeight: "bold" }}
            >
              찜 {data.like_count} | 조회 {data.view_count}
            </Text>
          </MainContents>
          <PersonBlock>
            <PersonIconBlock>
              <Ionicons name="person" color="#1ABC9C" size={40} />
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <PersonIcon item={item} size={28} />
              </View>
            </PersonIconBlock>
            <PersonNumberBlock style={{}}>
              <Text style={{ fontSize: 25, fontWeight: "400" }}>
                {data.join_count} / {data.join_limitation}
              </Text>
            </PersonNumberBlock>
          </PersonBlock>
        </Padding>

        <Participant data={data} whoIs={"작성자"} />
        <Participant data={data} whoIs={"참가자"} />

        <TaxiComment item={item} />
      </Contents>

      {/*내용끝*/}
      <Bottom>
        <LeftBlock width="25%" style={{ marginRight: 12 }}>
          {like === true ? (
            <IconBlock
              onPress={handleLike}
              style={{ paddingVertical: 7 }}
              width="100%"
            >
              <AntDesign name="heart" color="#ff5252" size={40}></AntDesign>
            </IconBlock>
          ) : (
            <IconBlock
              onPress={handleLike}
              style={{ paddingVertical: 7 }}
              width="100%"
            >
              <AntDesign name="heart" color="#e0e0e0" size={40}></AntDesign>
            </IconBlock>
          )}
        </LeftBlock>
        <RightBlock width="75%">
          <ParticipationButton
            style={{
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>참가하기</Text>
          </ParticipationButton>
        </RightBlock>
      </Bottom>
      {/* Bottom끝 */}
    </Container>
  );
}

export default TaxiDetail;
