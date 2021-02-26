import React from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

function PersonIcon({ item, size }) {
  let limitation = new Array(item.join_limitation - 1);
  for (var i = 0; i < limitation.length; i++) {
    limitation[i] = i;
  }
  return (
    <>
      {limitation.map((arr, index) => {
        if (limitation.length <= 3) {
          if (index < item.join_count - 1) {
            return (
              <Ionicons key={index} name="person" color="#1ABC9C" size={size} />
            );
          } else {
            return (
              <Ionicons key={index} name="person" color="#dbdbdb" size={size} />
            );
          }
        } else if (limitation.length >= 4) {
          if (index < item.join_count - 1 && index < 3) {
            return (
              <Ionicons key={index} name="person" color="#1ABC9C" size={size} />
            );
          } else if (index >= item.join_count - 1 && index < 3) {
            return (
              <Ionicons key={index} name="person" color="#dbdbdb" size={size} />
            );
          }
          // return (
          //   <>
          //     <Ionicons
          //       key={index}
          //       name="person"
          //       color="blue"
          //       size={20}
          //     />
          //   </>
          // );
        }
      })}
      {limitation.length >= 5 ? (
        item.join_count <= 4 ? (
          <Feather name="plus" size={size - 2} color="#dbdbdb" />
        ) : (
          <Feather name="plus" size={size - 2} color="#1ABC9C" />
        )
      ) : (
        <></>
      )}
    </>
  );
}

export default PersonIcon;
