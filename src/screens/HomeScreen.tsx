import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Welcome to Political Pulse!</Title>
          <Paragraph>Manage your party activities efficiently</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Title style={styles.statNumber}>1,234</Title>
            <Paragraph>Total Members</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Title style={styles.statNumber}>12</Title>
            <Paragraph>Active Polls</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Title style={styles.statNumber}>45</Title>
            <Paragraph>Discussions</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Title style={styles.statNumber}>89</Title>
            <Paragraph>Booths</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Recent Activity</Title>
          <Paragraph>• New poll created: "Rally Organization"</Paragraph>
          <Paragraph>• 45 new members joined today</Paragraph>
          <Paragraph>• 12 discussions started this week</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Quick Actions</Title>
          <Paragraph>• Create a new poll</Paragraph>
          <Paragraph>• View organization hierarchy</Paragraph>
          <Paragraph>• Join forum discussions</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  card: {
    marginBottom: 16
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3'
  }
});

export default HomeScreen;
