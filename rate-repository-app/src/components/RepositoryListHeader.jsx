import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    elevation: 4,
  }
});

const RepositoryListHeader = ({ sort, setSort, filter, setFilter }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Filter"
      value={filter}
      onChangeText={val => setFilter(val)}
    />
    <Picker
      selectedValue={sort}
      onValueChange={value => setSort(value)}
      style={styles.picker}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);


export default RepositoryListHeader;