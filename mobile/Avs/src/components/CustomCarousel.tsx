import {Dimensions} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import WaterCard from '../components/Card/WaterCard';
import {IWaterCardInfo} from '../models/abstracts/IWaterCardInfo';

const {width, height} = Dimensions.get('window');

type CustomCarouselProps = {
  data: IWaterCardInfo[];
  setActiveIndex: (index: number) => void;
};

const CustomCarousel: React.FC<CustomCarouselProps> = props => {
  const {setActiveIndex, data} = props;

  // console.log('render oldu');

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
      onSnapToItem={index => setActiveIndex(index)}
      renderItem={({item}) => <WaterCard data={item} />}
    />
  );
};

export default CustomCarousel;
