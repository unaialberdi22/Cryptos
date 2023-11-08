import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList, TextInput } from "react-native";
import CoinItem from "./components/CoinItem";
import CoinDetailScreen from "./components/CoinDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  // Function to fetch cryptocurrency data
  const loadData = async () => {
    try {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr"
      );
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error("Error loading data from the Binance API:", error);
    }
  };

  // Initial data load
  useEffect(() => {
    loadData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: "CryptoMarket" }}>
          {() => (
            <View style={styles.container}>
              <StatusBar backgroundColor="#141414" />
              <View style={styles.header}>
                <Text style={styles.title}>CryptoMarket</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search a Coin"
                  placeholderTextColor="#858585"
                  onChangeText={(text) => text && setSearch(text)}
                />
              </View>
              <FlatList
                style={styles.list}
                data={coins.filter(
                  (coin) =>
                    coin.symbol.toLowerCase().includes("usdt") &&
                    coin.symbol.toLowerCase().includes(search.toLowerCase())
                )}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CoinItem coin={item} onPress={() => setSelectedCoin(item)} />
                )}
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  await loadData();
                  setRefreshing(false);
                }}
              />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});

export default App;
