import React, { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../Context";
import { axiosInstance } from "../api";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { createdTimeParser } from "../timeUtils";
import { listenOrientationChange } from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";

const CommentNumber = styled.View`
  border-top-width: 1px;
  border-top-color: #dbdbdb;
  border-bottom-color: #dbdbdb;
  border-bottom-width: 2px;
`;
const Padding = styled.View`
  padding: 0 20px;
`;

const ParticipantBlock = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 15px 0px 15px;
`;

const ProfleImgCircle = styled.TouchableOpacity`
  width: ${(props) => props.width || "10%"};
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  margin-left: 15px;
  width: 76%;
  border: 1px solid #eeeeee;
  background: #eeeeee;
  padding: 5px 0 5px 10px;
  font-size: 15px;
  margin-right: 8px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 15%;
  justify-content: center;
  align-items: center;
`;

function TaxiComment({ item }) {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const {
    loginState: { access_token },
  } = useContext(AuthContext);

  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  const getData = async () => {
    setLoading(true);
    console.log(headers);
    await axiosInstance({
      url: `/v1/posts/taxi/${item.id}/comments/`,
      method: "GET",
      headers,
    })
      .then((response) => {
        console.log("comment", response.data);
        setComments(response.data);
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
    };
  }, []);

  const textareaChange = (newComment) => {
    setText(newComment);
  };

  const commentSubmit = async () => {
    if (text === "") {
      alert("내용을 입력해주세요");
      return;
    }

    axiosInstance({
      url: `/v1/posts/taxi/${item.id}/comments/`,
      method: "POST",
      headers,
      data: { content: text },
    })
      .then((response) => {
        getData();
        setText("");
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{}}>
      <CommentNumber>
        <Padding>
          <Text
            style={{
              paddingTop: 10,
              paddingBottom: 5,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            댓글 {comments.length}
          </Text>
        </Padding>
      </CommentNumber>
      <View
        style={{
          flex: 1,
          marginBottom: 20,
          backgroundColor: "yellow",
          flexGrow: 1,
        }}
      >
        {comments.map((comment, index) => {
          return (
            <>
              <ParticipantBlock>
                <ProfleImgCircle>
                  <Ionicons
                    name="person-circle-sharp"
                    size={35}
                    color="#9e9e9e"
                  />
                </ProfleImgCircle>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold" }}
                  key={comment.id}
                >
                  {comment.author.username}
                </Text>
                <Text
                  style={{ fontSize: 10, color: "#9e9e9e" }}
                  key={100 + index}
                >
                  {"  "}
                  {createdTimeParser(comment.updated_at)}
                </Text>
              </ParticipantBlock>
              <Text style={{ paddingLeft: 50 }} key={1000 + index}>
                {comment.content}
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: 50,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 60,
                  height: 23,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#9e9e9e",
                    paddingTop: 8,
                  }}
                >
                  답글달기
                </Text>
              </TouchableOpacity>
            </>
          );
        })}
      </View>
      <View
        style={{
          borderTopColor: "#dbdbdb",
          borderTopWidth: 1,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
          flexDirection: "row",
        }}
      >
        <Input
          value={text}
          onChangeText={textareaChange}
          placeholder="댓글 달기 ..."
          style={{
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
        ></Input>
        <SubmitButton onPress={commentSubmit}>
          <Feather name="send" size={30} />
        </SubmitButton>
      </View>
    </View>
  );
}

export default TaxiComment;
