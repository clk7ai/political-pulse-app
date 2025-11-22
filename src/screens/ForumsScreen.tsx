import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { mockThreads } from '../data/mockData';
import { Thread } from '../types';

const ForumsScreen = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development':
        return '#4CAF50';
      case 'Social':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const renderThread = ({ item }: { item: Thread }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Chip style={[styles.chip, { backgroundColor: getCategoryColor(item.category) }]}>
          {item.category}
        </Chip>
        <Paragraph style={styles.author}>By {item.author}</Paragraph>
        <Paragraph numberOfLines={2}>{item.content}</Paragraph>
        <Paragraph style={styles.stats}>
          {item.replies} replies • {item.likes} likes • {item.createdAt}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={mockThreads}
      renderItem={renderThread}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  card: {
    marginBottom: 16
  },
  chip: {
    marginVertical: 8,
    alignSelf: 'flex-start'
  },
  author: {
    fontStyle: 'italic',
    color: '#666',
    marginVertical: 4
  },
  stats: {
    color: '#666',
    marginTop: 8,
    fontSize: 12
  }
});

export default ForumsScreen;
