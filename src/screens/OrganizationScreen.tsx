import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { mockMembers } from '../data/mockData';
import { Member } from '../types';

const OrganizationScreen = () => {
  const renderMember = ({ item }: { item: Member }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.role} - Level {item.level}</Paragraph>
        <Paragraph>{item.email}</Paragraph>
        <Paragraph>{item.phone}</Paragraph>
        {item.boothId && (
          <Chip style={styles.chip}>Booth: {item.boothId}</Chip>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={mockMembers}
      renderItem={renderMember}
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
    marginTop: 8,
    alignSelf: 'flex-start'
  }
});

export default OrganizationScreen;
