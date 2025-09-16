import React, { useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import IssueCard from "../components/IssueCard"; // fixed path
import placeholderImage from "../assets/placeholder.png"; // your placeholder image

// Define the type for an issue
interface Issue {
  id: number;
  title: string;
  description: string;
  image: any;
}

export default function HomeScreen() {
  // State holding all reported issues
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: 1,
      title: "Pothole on Main Street",
      description: "Large pothole near 5th Avenue",
      image: placeholderImage,
    },
    {
      id: 2,
      title: "Streetlight not working",
      description: "Streetlight off near park entrance",
      image: placeholderImage,
    },
    {
      id: 3,
      title: "Garbage not collected",
      description: "Overflowing garbage bin near park",
      image: placeholderImage,
    },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to CivicLens 👋</Text>

      {/* Dynamically render all issues */}
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          title={issue.title}
          description={issue.description}
          image={issue.image}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f2f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
