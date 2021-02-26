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
  width: ${(props) => props.width || "14%"};
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const MainContents = styled.View`
  padding: 0 8px;
  width: 100%;
`;

const ImageSliderBlock = styled.TouchableOpacity`
  width: 100%;
  height: 350px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const ImageScrollView = styled.ScrollView`
  flex: 1;
  overflow: hidden;
  background: orange;
  position: relative;
  margin: 10px;
`;

const ProductImage = styled.Image`
  flex: 1;
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

const { width } = Dimensions.get("window");
// const height = width * 0.6; // 60%;

function BuyDetail({ route }) {
  const { item } = route.params;
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  // const [imageList, setImageList] = useState([
  //   // "https://images.pexels.com/photos/6533788/pexels-photo-6533788.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   // "https://images.pexels.com/photos/6439149/pexels-photo-6439149.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  // ]);
  const [currentIndex, setCurrentIndex] = useState(1);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const {
    loginState: { access_token },
  } = useContext(AuthContext);
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const [data, setData] = useState({});

  const [imageArray, setImageArray] = useState([]);
  const [getItems, setGetItems] = useState({});
  const getData = () => {
    setLoading(true);
    console.log(headers);
    axiosInstance({
      url: `/v1/posts/purchase/${item.id}/`,
      method: "GET",
      headers,
    })
      .then((response) => {
        console.log("data", response.data);
        setData(response.data);
        setImageArray(
          response.data.product_img.map((item, index) => item.image)
        );
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  useEffect(() => {
    getData();
    return () => {
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
      url: `/v1/posts/purchase/${data.id}/like/`,
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
      {/*Modal 창 끝 */}
      <Modal
        isVisible={isModalVisible}
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 0.75,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SliderBox
            autoplay={false} //자동 슬라이드 넘김
            circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
            resizeMode="contain" // 이미지 사이즈 조절값
            images={imageArray} // 이미지 주소 리스트
            dotColor="#dbdbdb" // 아래 점 투명으로 안보이게 가림
            inactiveDotColor="rgba(128, 128, 128, 0.92)"
            ImageComponentStyle={{ width: wp("100%"), height: hp("60%") }} // 이미지 Style 적용
            currentImageEmitter={(index) => {
              // 이미지가 바뀔때 어떤 동작을 할지 설정
              setCurrentIndex(index + 1);
            }}
            onCurrentImagePressed={(index) => toggleModal()}
          />
          <TouchableOpacity onPress={toggleModal}>
            <MaterialIcons name="cancel" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
      {/*Modal 창 끝 */}
      <HeaderTime remainTime={remainTime} loading={loading} />
      {/* Header끝 */}
      {/*내용시작 */}
      <Contents>
        <Padding>
          <Profile>
            <ProfleImgCircle>
              <Ionicons name="person-circle-sharp" size={50} color="#9e9e9e" />
            </ProfleImgCircle>
            <View style={{ justifyContent: "center", alginItems: "center" }}>
              <Text style={{ fontSize: 20 }}>
                {JSON.stringify(data.author)}
              </Text>
            </View>
          </Profile>
          <MainContents>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 12, paddingBottom: 10, color: "#9e9e9e" }}>
              {createdTimeParser(item.created_at)}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.price}원 | 1인당 약{" "}
              {Math.ceil(item.price / item.join_limitation)}원
            </Text>
          </MainContents>

          <ImageSliderBlock>
            <SliderBox
              autoplay={false} //자동 슬라이드 넘김
              circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
              resizeMode="cover" // 이미지 사이즈 조절값
              images={imageArray} // 이미지 주소 리스트
              dotColor="#dbdbdb" // 아래 점 투명으로 안보이게 가림
              inactiveDotColor="rgba(128, 128, 128, 0.92)"
              ImageComponentStyle={{ width: wp("90%"), height: 400 }} // 이미지 Style 적용
              currentImageEmitter={(index) => {
                // 이미지가 바뀔때 어떤 동작을 할지 설정
                setCurrentIndex(index + 1);
              }}
              onCurrentImagePressed={(index) => toggleModal()}
            />
          </ImageSliderBlock>

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

        <BuyComment item={item} />
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

export default BuyDetail;

{
  /* <View
          style={{
            position: "absolute",
            bottom: "9.8%",
            right: 5,
            paddingTop: 4,
            paddingRight: 6,
            paddingBottom: 4,
            paddingLeft: 10,
            borderTopLeftRadius: 14,
            borderBottomLeftRadius: 14,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <Text style={{ fontSize: 10, color: "#ffffff" }}>
            {/* //총 이미지 갯수중 현재 index가 몇인지를 나타낸다 */
}
{
  /* {currentIndex}/{imageArray.length}
          </Text>
        </View> */
}
