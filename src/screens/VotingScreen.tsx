import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Button } from 'react-native-paper';
import { mockPolls } from '../data/mockData';
import { Poll } from '../types';

const VotingScreen = () => {
  const [polls, setPolls] = useState(mockPolls);

  const handleVote = (pollId: string, optionId: string) => {
    Alert.alert('Vote Recorded', 'Your vote has been recorded successfully!');
  };

  const renderPoll = ({ item }: { item: Poll }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
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

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => handleVote(item.id, item.options[0].id)}
        >
          Vote Now
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={polls}
      renderItem={renderPoll}
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
  button: {
    marginTop: 16,
    backgroundColor: '#2196F3'
  }
});

export default VotingScreen;
