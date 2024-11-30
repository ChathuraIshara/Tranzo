import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import VehicleCard from "./VehicleCard";
import Icon from "react-native-vector-icons/Ionicons";
import { useHeartCount } from "../contexts/HeartCountContext"; // Import the custom hook

const CardScreen = ({ route }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Get username from route parameters
  const { username } = route.params;
  const { heartCount, incrementHeartCount } = useHeartCount();

  // Fetch vehicle data from the API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("https://freetestapi.com/api/v1/cars");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        const formattedData = data.map((car) => ({
          id: car.id.toString(),
          name: `${car.make} ${car.model}`,
          price: parseFloat(car.price),
          image: car.image,
          fuelType: car.fuelType,
          transmission: car.transmission,
          horsepower: car.horsepower,
        }));
        setVehicles(formattedData);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Filter functions
  const sortByPriceAscending = () => {
    const sorted = [...vehicles].sort((a, b) => a.price - b.price);
    setVehicles(sorted);
    setIsFilterVisible(false);
  };

  const sortByNameAscending = () => {
    const sorted = [...vehicles].sort((a, b) => a.name.localeCompare(b.name));
    setVehicles(sorted);
    setIsFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Icon name="person-outline" size={30} color="#0F3464FF" />
        <Text style={styles.welcomeText}>Hi, {username}!</Text>
        <View style={styles.heartContainer}>
          <Icon name="heart" size={24} color="red" />
          <Text style={styles.heartCount}>{heartCount}</Text>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <Icon name="car-sport" size={30} color="#0F3464FF" />
        <Text style={styles.header}>Available Vehicles</Text>
        <TouchableOpacity onPress={() => setIsFilterVisible(true)}>
          <Icon name="filter-outline" size={30} color="#0F3464FF" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0F3464FF" />
      ) : (
        <FlatList
          data={vehicles}
          renderItem={({ item }) => (
            <VehicleCard item={item} onHeartClick={incrementHeartCount} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Filter Modal */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={sortByPriceAscending}
            >
              <Text style={styles.modalOptionText}>💲 Price (Ascending)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={sortByNameAscending}
            >
              <Text style={styles.modalOptionText}>🔤 Name (Ascending)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOption, styles.cancelButton]}
              onPress={() => setIsFilterVisible(false)}
            >
              <Text style={[styles.modalOptionText, styles.cancelText]}>
                ✖️ Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F3464FF",
  },
  heartContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  heartCount: {
    marginLeft: 5,
    fontSize: 18,
    color: "red",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0F3464FF",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F3464FF",
    textAlign: "center",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#0F3464FF",
    marginBottom: 10,
  },
  modalOptionText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#FF4C4C", // Red background for cancel button
  },
  cancelText: {
    color: "#FFFFFF", // White text for better contrast
  },
});
