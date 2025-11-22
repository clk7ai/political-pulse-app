import React, { useState } from 'react';
import { FlatList, StyleSheet, View, RefreshControl, Alert } from 'react-native';
import { Card, Title, Paragraph, Chip, FAB, Button } from 'react-native-paper';
import { mockThreads } from '../data/mockData';
import { Thread } from '../types';
import SearchBar from '../components/SearchBar';

type CategoryType = 'Development' | 'Social' | 'General' | 'All';

const ForumsScreen = () => {
  const [threads, setThreads] = useState(mockThreads);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState<CategoryType>('All');

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Discussions updated successfully!');
    }, 1000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Development':
        return '#4CAF50';
      case 'Social':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === 'All' || thread.category === category;
    
    return matchesSearch && matchesCategory;
  });

  const renderThread = ({ item }: { item: Thread }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Title style={styles.title}>{item.title}</Title>
          <Chip 
            style={[styles.categoryChip, { backgroundColor: getCategoryColor(item.category) }]}
            textStyle={styles.categoryChipText}
          >
            {item.category}
          </Chip>
        </View>
        
        <View style={styles.authorRow}>
          <Paragraph style={styles.author}>👤 {item.author}</Paragraph>
          <Paragraph style={styles.date}>{item.createdAt}</Paragraph>
        </View>
        
        <Paragraph numberOfLines={3} style={styles.content}>
          {item.content}
        </Paragraph>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Paragraph style={styles.statText}>💬 {item.replies} replies</Paragraph>
          </View>
          <View style={styles.statItem}>
            <Paragraph style={styles.statText}>❤️ {item.likes} likes</Paragraph>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Button
            mode="outlined"
            onPress={() => Alert.alert('View Thread', `Opening: ${item.title}`)}
            style={styles.actionButton}
            icon="eye"
          >
            View
          </Button>
          <Button
            mode="outlined"
            onPress={() => Alert.alert('Reply', `Replying to: ${item.title}`)}
            style={styles.actionButton}
            icon="reply"
          >
            Reply
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
          placeholder="Search discussions..."
        />
        <View style={styles.filterRow}>
          <Button
            mode={category === 'All' ? 'contained' : 'outlined'}
            onPress={() => setCategory('All')}
            style={styles.filterButton}
            compact
          >
            All
          </Button>
          <Button
            mode={category === 'Development' ? 'contained' : 'outlined'}
            onPress={() => setCategory('Development')}
            style={[styles.filterButton, { borderColor: '#4CAF50' }]}
            compact
          >
            Dev
          </Button>
          <Button
            mode={category === 'Social' ? 'contained' : 'outlined'}
            onPress={() => setCategory('Social')}
            style={[styles.filterButton, { borderColor: '#FF9800' }]}
            compact
          >
            Social
          </Button>
          <Button
            mode={category === 'General' ? 'contained' : 'outlined'}
            onPress={() => setCategory('General')}
            style={styles.filterButton}
            compact
          >
            General
          </Button>
        </View>
      </View>

      <FlatList
        data={filteredThreads}
        renderItem={renderThread}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Paragraph style={styles.emptyText}>
              No discussions found. Try adjusting your search or filters.
            </Paragraph>
          </View>
        }
      />

      <FAB
        style={styles.fab}
        icon="forum"
        label="New Thread"
        onPress={() => Alert.alert('Create Thread', 'Thread creation screen coming soon!')}
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
    justifyContent: 'space-between',
    marginTop: 8
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 2
  },
  listContainer: {
    padding: 16
  },
  card: {
    marginBottom: 16,
    elevation: 3
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8
  },
  categoryChip: {
    marginTop: 4
  },
  categoryChipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12
  },
  authorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  author: {
    fontStyle: 'italic',
    color: '#666',
    fontSize: 14
  },
  date: {
    color: '#999',
    fontSize: 12
  },
  content: {
    color: '#333',
    lineHeight: 20,
    marginBottom: 12
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12
  },
  statItem: {
    marginRight: 16
  },
  statText: {
    color: '#666',
    fontSize: 14
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8
  },
  actionButton: {
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

export default ForumsScreen;
