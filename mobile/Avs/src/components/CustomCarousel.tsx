import {Dimensions} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';

const {width, height} = Dimensions.get('window');

export interface CustomCarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  setActiveIndex: (index: number) => void;
  activeIndex: number;
}

const CustomCarousel = <T,>({
  data,
  renderItem,
  setActiveIndex,
  activeIndex,
}: CustomCarouselProps<T>): React.ReactElement => {
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
      renderItem={({item, index}) => renderItem(item, index)}
    />
  );
};

export default CustomCarousel;
