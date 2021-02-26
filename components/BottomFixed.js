import React, { useState, useContext } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import axios from "axios";
import { axiosInstance } from "../api";
import { AuthContext } from "../Context";
import { getData } from "../screens/BuyDetail";


function BottomFixed({ data }) {
  
  const [loading, setLoading] = useState(false);
  const {
    loginState: { access_token },
  } = useContext(AuthContext);
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const getData = () => {
    setLoading(true);
    axiosInstance({
      url: `/v1/posts/purchase/${item.id}/`,
      method: "GET",
      headers,
    })
      .then((response) => {
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

  const handleLike = () => {
    axiosInstance({
      url: `/v1/posts/purchase/${data.id}/like/`,
      method: "POST",
      headers,
    })
      .then((response) => {
        getData();
      })
      .then((response) => {
        setLike(!like);
        set;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Bottom>
      <LeftBlock width="25%" style={{ marginRight: 12 }}>
        {like === true ? (
          <IconBlock
            onPress={handleLike}
            style={{ paddingVertical: 7 }}
            width="100%"
          >
            <SimpleLineIcons
              name="heart"
              color="red"
              size={40}
            ></SimpleLineIcons>
          </IconBlock>
        ) : (
          <IconBlock
            onPress={handleLike}
            style={{ paddingVertical: 7 }}
            width="100%"
          >
            <SimpleLineIcons
              name="heart"
              color="#dbdbdb"
              size={40}
            ></SimpleLineIcons>
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
  );
}

export default BottomFixed;
