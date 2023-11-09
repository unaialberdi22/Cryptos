import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CoinDetailScreen = ({ route }) => {
  const { coin } = route.params;
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={goBack} style={styles.button}>
        <Text style={styles.buttonText}>Back to List</Text>
      </Pressable>
      {Object.entries(coin).map(([key, value]) => (
        <View key={key} style={styles.detailItem}>
          <Text style={styles.detailLabel}>{key}:</Text>
          <Text style={styles.detailValue}>
            {typeof value === "string" ? value : JSON.stringify(value)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#262626",
  },
  detailLabel: {
    color: "#fff",
  },
  detailValue: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#141414",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff",
  },
});

export default CoinDetailScreen;
