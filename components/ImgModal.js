import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SliderBox } from "react-native-image-slider-box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function ImgModal({ imageArrays }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
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
          images={imageArrays} // 이미지 주소 리스트
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
  );
}

export default ImgModal;
