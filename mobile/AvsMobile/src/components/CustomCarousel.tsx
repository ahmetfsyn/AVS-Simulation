import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import WaterCard from "../components/Card/WaterCard";

const { width, height } = Dimensions.get("window");

const CustomCarousel = (props) => {
  const { activeIndex, setActiveIndex, data } = props;
  console.log("render oldu");
  return (
    <Carousel
      width={width - 32}
      height={height * 0.25}
      data={data}
      mode="parallax"
      modeConfig={{
        parallaxScrollingOffset: 90,
      }}
      loop={false}
      scrollAnimationDuration={1000}
      onSnapToItem={(index) => setActiveIndex(index)}
      renderItem={({ item }) => <WaterCard data={item}></WaterCard>}
    />
  );
};

export default CustomCarousel;
