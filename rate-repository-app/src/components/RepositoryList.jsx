import { useState } from 'react';
import { FlatList, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

const ItemSeparator = () => <View style={{ height: 10 }} />;

export const RepositoryListContainer = (props) => {
  const { repositories, onPress, header, onEndReach } = props;

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const repositoryInfo = ({ item }) => (
    <Pressable onPress={() => onPress(item.id)}>
      <RepositoryItem repository={item} />
    </Pressable>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={repositoryInfo}
      ListHeaderComponent={header}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState('latest');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const [debouncedFilter] = useDebounce(filter, 1000);
  const { repositories, loading, fetchMore } = useRepositories({
    first: 8,
    searchKeyword: debouncedFilter,
    orderBy: sort === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
    orderDirection: sort === 'lowest' ? 'ASC' : 'DESC',
  });

  const onEndReach = () => {
    fetchMore();
  };

  const onPress = id => {
    navigate(`/repository/${id}`);
  };

  if (loading) return null;

  const header = (
    <RepositoryListHeader
      sort={sort}
      setSort={setSort}
      filter={filter}
      setFilter={setFilter}
    />
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPress={onPress}
      header={header}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;