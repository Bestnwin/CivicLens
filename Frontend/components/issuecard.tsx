import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export default function IssueCard({ title, description, image }) {
  const [upvotes, setUpvotes] = useState(0);
  const [status, setStatus] = useState('Pending');

  const handleUpvote = () => setUpvotes(upvotes + 1);
  const handleResolve = () => setStatus('Resolved');

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text>Status: {status}</Text>
      <Text>Upvotes: {upvotes}</Text>
      <View style={styles.buttons}>
        <Button title="Upvote" onPress={handleUpvote} />
        <Button title="Resolve" onPress={handleResolve} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  description: { fontSize: 14, marginBottom: 5 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  image: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 }
});
