import React from 'react';
import { View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { CharacterField } from '../types/Character';
import { replaceUnderscoresWithSpaces } from '../utils/stringHelpers';
import textStyles from '../styles/text';
import { DetailsScreenRouteProp } from '../types/Navigation';

const fieldsToDisplay: CharacterField[] = [
  'name',
  'height',
  'gender',
  'birth_year',
  'mass',
  'skin_color',
  'hair_color',
  'eye_color',
];

const DetailsScreen: React.FC<DetailsScreenRouteProp> = ({ route }) => {
  const { character } = route.params;

  return (
    <View>
      <DataTable>
        {fieldsToDisplay.map((field, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>
              <Text style={textStyles.boldText}>
                {replaceUnderscoresWithSpaces(field)}:{' '}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>{character[field]}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default DetailsScreen;
