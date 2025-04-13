import {IMeter} from '../Meter';
import {IWaterCard} from '../WaterCard';

export type CustomCarouselProps = {
  data: [IWaterCard[], IMeter[]];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};
