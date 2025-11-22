import React, { useState } from 'react';
import { FlatList, StyleSheet, View, RefreshControl, Alert } from 'react-native';
import { Card, Title, Paragraph, Chip, FAB, Button } from 'react-native-paper';
import { mockMembers } from '../data/mockData';
import { Member } from '../types';
import SearchBar from '../components/SearchBar';

const OrganizationScreen = () => {
  const [members, setMembers] = useState(mockMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filterLevel, setFilterLevel] = useState<number | null>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Members updated successfully!');
    }, 1000);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.boothId && member.boothId.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLevel = filterLevel === null || member.level === filterLevel;
    
    return matchesSearch && matchesLevel;
  });

  const renderMember = ({ item }: { item: Member }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Title style={styles.title}>{item.name}</Title>
          <Chip style={styles.levelChip} textStyle={styles.levelChipText}>
            Level {item.level}
          </Chip>
        </View>
        <Paragraph style={styles.role}>{item.role}</Paragraph>
        <View style={styles.infoRow}>
          <Paragraph style={styles.infoText}>📧 {item.email}</Paragraph>
        </View>
        <View style={styles.infoRow}>
          <Paragraph style={styles.infoText}>📞 {item.phone}</Paragraph>
        </View>
        {item.boothId && (
          <Chip
            style={styles.boothChip}
            icon="map-marker"
            textStyle={styles.boothChipText}
          >
            Booth: {item.boothId}
          </Chip>
        )}
        <View style={styles.actionRow}>
          <Button
            mode="outlined"
            onPress={() => Alert.alert('Call', `Calling ${item.name}`)}
            style={styles.actionButton}
            icon="phone"
          >
            Call
          </Button>
          <Button
            mode="outlined"
            onPress={() => Alert.alert('Email', `Emailing ${item.name}`)}
            style={styles.actionButton}
            icon="email"
          >
            Email
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
          placeholder="Search members..."
        />
        <View style={styles.filterRow}>
          <Button
            mode={filterLevel === null ? 'contained' : 'outlined'}
            onPress={() => setFilterLevel(null)}
            style={styles.filterButton}
            compact
          >
            All Levels
          </Button>
          <Button
            mode={filterLevel === 1 ? 'contained' : 'outlined'}
            onPress={() => setFilterLevel(1)}
            style={styles.filterButton}
            compact
          >
            Level 1
          </Button>
          <Button
            mode={filterLevel === 2 ? 'contained' : 'outlined'}
            onPress={() => setFilterLevel(2)}
            style={styles.filterButton}
            compact
          >
            Level 2
          </Button>
          <Button
            mode={filterLevel === 3 ? 'contained' : 'outlined'}
            onPress={() => setFilterLevel(3)}
            style={styles.filterButton}
            compact
          >
            Level 3
          </Button>
        </View>
      </View>

      <FlatList
        data={filteredMembers}
        renderItem={renderMember}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Paragraph style={styles.emptyText}>
              No members found. Try adjusting your search or filters.
            </Paragraph>
          </View>
        }
      />

      <FAB
        style={styles.fab}
        icon="account-plus"
        label="Add Member"
        onPress={() => Alert.alert('Add Member', 'Member creation screen coming soon!')}
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
    alignItems: 'center',
    marginBottom: 8
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold'
  },
  levelChip: {
    backgroundColor: '#2196F3'
  },
  levelChipText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    fontWeight: '600'
  },
  infoRow: {
    marginVertical: 4
  },
  infoText: {
    fontSize: 14,
    color: '#555'
  },
  boothChip: {
    marginTop: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50'
  },
  boothChipText: {
    color: '#fff'
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 12,
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

export default OrganizationScreen;
