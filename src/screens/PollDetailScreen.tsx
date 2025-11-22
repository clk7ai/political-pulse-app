import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, ProgressBar, RadioButton } from 'react-native-paper';
import { Poll } from '../types';

const PollDetailScreen = ({ route }: any) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  
  // Mock poll data - in real app, this would come from route.params
  const poll: Poll = {
    id: '1',
    title: 'Should we organize a rally next month?',
    description: 'Vote on organizing a major rally for youth engagement',
    deadline: '2025-11-30',
    options: [
      { id: '1', text: 'Yes, organize it', votes: 245 },
      { id: '2', text: 'No, postpone', votes: 67 },
      { id: '3', text: 'Need more details', votes: 89 }
    ],
    totalVotes: 401,
    status: 'active',
    createdBy: 'Rajesh Kumar',
    createdAt: '2025-11-20'
  };

  const handleSubmitVote = () => {
    if (!selectedOption) {
      Alert.alert('Error', 'Please select an option');
      return;
    }
    Alert.alert('Success', 'Your vote has been submitted!');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{poll.title}</Title>
          <Paragraph style={styles.description}>{poll.description}</Paragraph>
          <Paragraph style={styles.meta}>Created by: {poll.createdBy}</Paragraph>
          <Paragraph style={styles.meta}>Deadline: {poll.deadline}</Paragraph>
          <Paragraph style={styles.votes}>{poll.totalVotes} total votes</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Cast Your Vote</Title>
          <RadioButton.Group
            onValueChange={value => setSelectedOption(value)}
            value={selectedOption}
          >
            {poll.options.map((option) => (
              <View key={option.id} style={styles.optionItem}>
                <RadioButton.Item
                  label={option.text}
                  value={option.id}
                />
              </View>
            ))}
          </RadioButton.Group>
          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleSubmitVote}
          >
            Submit Vote
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Current Results</Title>
          {poll.options.map((option) => {
            const percentage = Math.round((option.votes / poll.totalVotes) * 100);
            return (
              <View key={option.id} style={styles.resultItem}>
                <Paragraph>{option.text}</Paragraph>
                <ProgressBar
                  progress={option.votes / poll.totalVotes}
                  color="#2196F3"
                  style={styles.progressBar}
                />
                <Paragraph style={styles.resultText}>
                  {option.votes} votes ({percentage}%)
                </Paragraph>
              </View>
            );
          })}
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
  description: {
    marginTop: 8,
    fontSize: 16
  },
  meta: {
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic'
  },
  votes: {
    marginTop: 12,
    fontWeight: 'bold',
    color: '#2196F3',
    fontSize: 18
  },
  optionItem: {
    marginVertical: 4
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#2196F3'
  },
  resultItem: {
    marginVertical: 12
  },
  progressBar: {
    marginVertical: 8,
    height: 10,
    borderRadius: 5
  },
  resultText: {
    color: '#666',
    fontSize: 14
  }
});

export default PollDetailScreen;
