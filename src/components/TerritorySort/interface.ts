import {Animated} from 'react-native';

export interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTarget: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setFilterKey: React.Dispatch<React.SetStateAction<number>>;
  filterKey: number;
  onModalHide: () => void;
  defValue: Animated.Value;
  headerHeight: number;
  targetKey: number;
  containerStyle?: any
}
