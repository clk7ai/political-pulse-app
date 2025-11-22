import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Avatar, Button } from 'react-native-paper';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.profileHeader}>
          <Avatar.Text
            size={80}
            label="RK"
            style={styles.avatar}
          />
          <Title>Rajesh Kumar</Title>
          <Paragraph>State President</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Contact Information</Title>
          <Paragraph>Email: rajesh@party.org</Paragraph>
          <Paragraph>Phone: +91 98765 43210</Paragraph>
          <Paragraph>Booth ID: HQ-001</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Activity Stats</Title>
          <Paragraph>Polls Created: 12</Paragraph>
          <Paragraph>Votes Cast: 45</Paragraph>
          <Paragraph>Forum Posts: 23</Paragraph>
        </Card.Content>
      </Card>

      <Button mode="contained" style={styles.button}>
        Edit Profile
      </Button>
      <Button mode="outlined" style={styles.button}>
        Settings
      </Button>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20
  },
  avatar: {
    backgroundColor: '#2196F3',
    marginBottom: 16
  },
  button: {
    marginVertical: 8
  }
});

export default ProfileScreen;
