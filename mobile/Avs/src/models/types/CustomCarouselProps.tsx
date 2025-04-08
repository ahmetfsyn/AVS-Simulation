import {IWaterCard} from '../WaterCard';

export type CustomCarouselProps = {
  data: IWaterCard[];
  setActiveIndex: (index: number) => void;
};
