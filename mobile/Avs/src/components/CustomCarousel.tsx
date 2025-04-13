import {Dimensions} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import WaterCard from '../components/Card/WaterCard';
import {CustomCarouselProps} from '../models/types/CustomCarouselProps';

const {width, height} = Dimensions.get('window');

const CustomCarousel: React.FC<CustomCarouselProps> = (
  props: CustomCarouselProps,
) => {
  const {setActiveIndex, data, activeIndex} = props;
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
      scrollAnimationDuration={750}
      onSnapToItem={index => setActiveIndex(index)}
      renderItem={({item}) => (
        <WaterCard
          waterCard={data[0][activeIndex]}
          meter={data[1][activeIndex]}
        />
      )}
      style={{}}
    />
  );
};

export default CustomCarousel;
