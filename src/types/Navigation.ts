import { StackNavigationProp } from '@react-navigation/stack';
import { Character } from './Character';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Details: { character: Character };
};

export type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export type DetailsScreenRouteProp = {
  route: RouteProp<RootStackParamList, 'Details'>;
};
