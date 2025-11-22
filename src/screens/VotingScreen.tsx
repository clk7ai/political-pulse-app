import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Alert, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Button, FAB } from 'react-native-paper';
import { mockPolls } from '../data/mockData';
import { Poll } from '../types';
import SearchBar from '../components/SearchBar';

const VotingScreen = ({ navigation }: any) => {
  const [polls, setPolls] = useState(mockPolls);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Polls updated successfully!');
    }, 1000);
  };

  const handleVote = (pollId: string, optionId: string) => {
    Alert.alert('Vote Recorded', 'Your vote has been recorded successfully!');
  };

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poll.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || poll.status === filter;
    return matchesSearch && matchesFilter;
  });

  const renderPoll = ({ item }: { item: Poll }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Title style={styles.title}>{item.title}</Title>
          <Paragraph style={[
            styles.statusBadge,
            item.status === 'active' ? styles.activeBadge : styles.completedBadge
          ]}>
            {item.status.toUpperCase()}
          </Paragraph>
        </View>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph style={styles.deadline}>Deadline: {item.deadline}</Paragraph>
        <Paragraph style={styles.votes}>{item.totalVotes} total votes</Paragraph>

        {item.options.map((option) => {
          const percentage = Math.round((option.votes / item.totalVotes) * 100);
          return (
            <View key={option.id} style={styles.optionContainer}>
              <Paragraph>{option.text}</Paragraph>
              <ProgressBar
                progress={option.votes / item.totalVotes}
                color="#2196F3"
                style={styles.progressBar}
              />
              <Paragraph>{option.votes} votes ({percentage}%)</Paragraph>
            </View>
          );
        })}

        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => handleVote(item.id, item.options[0].id)}
          >
            Vote Now
          </Button>
          <Button
            mode="outlined"
            style={styles.detailButton}
            onPress={() => navigation?.navigate?.('PollDetail', { pollId: item.id })}
          >
            View Details
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search polls..."
        />
        <View style={styles.filterRow}>
          <Button
            mode={filter === 'all' ? 'contained' : 'outlined'}
            onPress={() => setFilter('all')}
            style={styles.filterButton}
          >
            All
          </Button>
          <Button
            mode={filter === 'active' ? 'contained' : 'outlined'}
            onPress={() => setFilter('active')}
            style={styles.filterButton}
          >
            Active
          </Button>
          <Button
            mode={filter === 'completed' ? 'contained' : 'outlined'}
            onPress={() => setFilter('completed')}
            style={styles.filterButton}
          >
            Completed
          </Button>
        </View>
      </View>

      <FlatList
        data={filteredPolls}
        renderItem={renderPoll}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Paragraph style={styles.emptyText}>
              No polls found. Try adjusting your search or filters.
            </Paragraph>
          </View>
        }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        label="Create Poll"
        onPress={() => Alert.alert('Create Poll', 'Poll creation screen coming soon!')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    elevation: 2
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4
  },
  listContainer: {
    padding: 16
  },
  card: {
    marginBottom: 16
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  title: {
    flex: 1,
    marginRight: 8
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  activeBadge: {
    backgroundColor: '#4CAF50',
    color: '#fff'
  },
  completedBadge: {
    backgroundColor: '#9E9E9E',
    color: '#fff'
  },
  deadline: {
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic'
  },
  votes: {
    color: '#666',
    marginVertical: 8,
    fontWeight: 'bold'
  },
  optionContainer: {
    marginVertical: 8,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8
  },
  progressBar: {
    marginVertical: 4,
    height: 8,
    borderRadius: 4
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3'
  },
  detailButton: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3'
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center'
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16
  }
});

export default VotingScreen;
