import React from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

function TaxiPersonIcon({ gender_limitation, gender, item, size }) {
  let limitation = new Array(4);
  for (var i = 0; i < limitation.length; i++) {
    limitation[i] = i;
  }

  return (
    <>
      {limitation.map((arr, index) => {
        if (limitation.length <= 3) {
          if (index < item.join_count - 1) {
            if (gender_limitation === "F") {
              return (
                <Ionicons
                  key={index}
                  name="person"
                  color="#1ABC9C"
                  size={size}
                />
              );
            } else if (gender_limitation === "T" && gender === "F") {
              return (
                <Ionicons
                  key={index}
                  name="person"
                  color="#F588DD"
                  size={size}
                />
              );
            } else if (gender_limitation === "T" && gender === "M") {
              return (
                <Ionicons
                  key={index}
                  name="person"
                  color="#638FE3"
                  size={size}
                />
              );
            }
          } else {
            return (
              <Ionicons key={index} name="person" color="#dbdbdb" size={size} />
            );
          }
        } else if (limitation.length >= 4) {
          if (index < item.join_count - 1 && index < 3) {
            if (gender_limitation === "F") {
              return (
                <Ionicons
                  key={index}
                  name="person"
                  color="#1ABC9C"
                  size={size}
                />
              );
            } else if (gender_limitation === "T" && gender === "F") {
              return (
                <Ionicons
                  key={index}
                  name="person"
                  color="#F588DD"
                  size={size}
                />
              );
            } else if (gender_limitation === "T" && gender === "M") {
              return (
                <Ionicons
                  key={index}
                  name="person"
                  color="#638FE3"
                  size={size}
                />
              );
            }
          } else if (index >= item.join_count - 1 && index < 3) {
            return (
              <Ionicons key={index} name="person" color="#dbdbdb" size={size} />
            );
          }
        }
      })}
    </>
  );
}

export default TaxiPersonIcon;
