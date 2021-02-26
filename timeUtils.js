import React from "react";

export function remainTimeParser(deadline) {
  let currentdate = new Date();
  let deadlinedate = dateParser(deadline);
  let reaminTime = deadlinedate.getTime() - currentdate.getTime();
  let humanizeTime = humanizeParser(reaminTime);
  let resultTime = `${humanizeTime.day[0]}일 ${humanizeTime.hour[0]}시 ${humanizeTime.minute[0]}분 ${humanizeTime.second[0]}초`;
  // if (humanizeTime.day[0] === "0") {
  //   resultTime = `${humanizeTime.hour[0]}시 ${humanizeTime.minute[0]}분`;
  // } else if (humanizeTime.hour[0] === "0") {
  //   resultTime = `${humanizeTime.minute[0]}분`;
  // }

  return resultTime;
}

export function createdTimeParser(createdTime) {
  let createdDate = dateParser(createdTime);
  let currentDate = new Date();
  let milSec = currentDate.getTime() - createdDate.getTime();
  let humanizeTime = humanizeParser(milSec);
  let resultTime = "";
  if (humanizeTime.day[0] !== "0") {
    resultTime = `${humanizeTime.day[0]}일전`;
  } else if (humanizeTime.day[0] === "0" && humanizeTime.hour[0] !== "0") {
    resultTime = `${humanizeTime.hour[0]}시간전`;
  } else if (
    humanizeTime.day[0] === "0" &&
    humanizeTime.hour[0] === "0" &&
    humanizeTime.minute[0] !== "0"
  ) {
    resultTime = `${humanizeTime.minute[0]}분전`;
  } else {
    resultTime = "방금전";
  }
  return resultTime;
}

function dateParser(timeString) {
  let year = timeString.substring(0, 4);
  let month = timeString.substring(5, 7);
  let day = timeString.substring(8, 10);
  let hour = timeString.substring(11, 13);
  let minute = timeString.substring(14, 16);
  let second = timeString.substring(17, 19);

  let ParserDate = new Date(year, month - 1, day, hour, minute, second);

  return ParserDate;
}

function humanizeParser(milSecTime) {
  let remainMsecF = milSecTime;
  let remainHourF = remainMsecF / 1000 / 60 / 60;
  let remainDayF = (remainHourF / 24).toString();
  let remainDay = remainDayF.split("."); //두번째가 .뒤에 소수점자리 remainDay[0]이 날짜
  let remainHour = ((parseFloat(remainDayF) - remainDay[0]) * 24) // reaminHour[0]이 시간
    .toString()
    .split(".");

  let remainMinute = (
    ((parseFloat(remainDayF) - remainDay[0]) * 24 - remainHour[0]) *
    60
  )
    .toString()
    .split(".");
  let remainSecond = (
    (((parseFloat(remainDayF) - remainDay[0]) * 24 - remainHour[0]) * 60 -
      remainMinute[0]) *
    60
  )
    .toString()
    .split(".");

  return {
    day: remainDay,
    hour: remainHour,
    minute: remainMinute,
    second: remainSecond,
  };
}
