import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import {
  Surface,
  Button,
  DataTable,
  IconButton,
  Icon,
} from 'react-native-paper';
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import colors from '../styles/colors';
import { Character } from '../types/Character';
import boxStyles from '../styles/box';
import { HomeScreenProps } from '../types/Navigation';
import { API_BASE_URL } from '../../config';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [characters, setCharacters] = useState<Character[] | []>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [totals, setTotals] = useState({ male: 0, female: 0, 'n/a': 0 });
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPageUrl, setCurrentPageUrl] = useState(API_BASE_URL);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(currentPageUrl)
      .then(response => {
        setCharacters(response.data.results);
        setNextPageUrl(response.data.next);
        setCount(response.data.count);
        setPreviousPageUrl(response.data.previous);
      })
      .catch(error => console.error(error));
  }, [currentPageUrl]);

  const toggleFavorite = (character: Character) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(character.url)) {
        newFavorites.delete(character.url);
        setTotals(prevTotals => ({
          ...prevTotals,
          [character.gender]:
            prevTotals[character.gender as keyof typeof totals] - 1,
        }));
      } else {
        newFavorites.add(character.url);
        setTotals(prevTotals => ({
          ...prevTotals,
          [character.gender]:
            prevTotals[character.gender as keyof typeof totals] + 1,
        }));
      }
      return newFavorites;
    });
  };

  const resetFavorites = () => {
    setFavorites(new Set());
    setTotals({ male: 0, female: 0, 'n/a': 0 });
  };

  const handlePageChange = (page: number) => {
    if (page > currentPage && nextPageUrl) {
      setCurrentPageUrl(nextPageUrl);
    } else if (page < currentPage && previousPageUrl) {
      setCurrentPageUrl(previousPageUrl);
    }
    setCurrentPage(page);
  };

  return (
    <ScrollView>
      <View style={styles.clearBtnWrapper}>
        <Button
          mode="outlined"
          onPress={resetFavorites}
          uppercase
          style={styles.clearBtn}
          compact
          textColor={colors.strawberry}>
          Clear fans
        </Button>
      </View>

      <View style={styles.fansBox}>
        {Object.entries(totals).map(([gender, count]) => (
          <Surface key={gender} elevation={4} style={styles.surface}>
            <Text style={styles.count}>{count}</Text>
            <Text>
              {gender === 'n/a' ? 'Others' : capitalizeFirstLetter(gender)} Fans
            </Text>
          </Surface>
        ))}
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={boxStyles.flexFive}>Name</DataTable.Title>
          <DataTable.Title style={boxStyles.flexCentred}>
            <Icon source="heart" color={colors.black} size={20} />
          </DataTable.Title>
        </DataTable.Header>

        <ScrollView>
          {characters.map(item => (
            <DataTable.Row key={item.created}>
              <DataTable.Cell
                style={boxStyles.flexFive}
                onPress={() =>
                  navigation.navigate('Details', { character: item })
                }>
                {item.name}
              </DataTable.Cell>
              <DataTable.Cell style={boxStyles.flexCentred}>
                <IconButton
                  icon={favorites.has(item.url) ? 'heart' : 'heart-outline'}
                  iconColor={colors.strawberry}
                  size={20}
                  onPress={() => toggleFavorite(item)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </ScrollView>

        <DataTable.Pagination
          page={currentPage - 1}
          numberOfPages={Math.ceil(count / 10)}
          onPageChange={page => handlePageChange(page + 1)}
          label={`${(currentPage - 1) * 10 + 1}-${
            currentPage * 10 > count ? count : currentPage * 10
          } of ${count}`}
          showFastPaginationControls
        />
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  clearBtnWrapper: {
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'flex-end',
  },
  clearBtn: {
    borderColor: colors.strawberry,
    width: 150,
  },
  fansBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-between',
  },
  count: {
    fontSize: 24,
  },
  surface: {
    padding: 8,
    height: 80,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
