import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Icons for the card
import { useHeartCount } from "../contexts/HeartCountContext"; // Use the custom hook for heart count

const VehicleCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { incrementHeartCount } = useHeartCount();

  const getImage = (name) => {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes("toyota")) {
      return require("../assets/images/toyota.jpg");
    } else if (lowerCaseName.includes("honda")) {
      return require("../assets/images/hondacivic2.jpg");
    } else if (lowerCaseName.includes("ford")) {
      return require("../assets/images/ford.jpg");
    } else if (lowerCaseName.includes("tesla")) {
      return require("../assets/images/tesla3.jpg");
    } else if (lowerCaseName.includes("chevrolet")) {
      return require("../assets/images/chervolet.jpg");
    } else if (lowerCaseName.includes("nissan")) {
      return require("../assets/images/nissan.jpeg");
    } else if (lowerCaseName.includes("audi")) {
      return require("../assets/images/audi3.jpg");
    } else if (lowerCaseName.includes("bmw")) {
      return require("../assets/images/bmw2.jpg");
    } else if (lowerCaseName.includes("mercedes")) {
      return require("../assets/images/benz.jpg");
    } else if (lowerCaseName.includes("kia")) {
      return require("../assets/images/kia.jpg");
    } else {
      return require("../assets/images/hondacivic.jpeg");
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    incrementHeartCount(isFavorite ? -1 : 1);
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={getImage(item.name)} style={styles.image} />

      <View style={styles.cardDetails}>
        {/* Vehicle Name with Heart Icon at the end */}
        <View style={styles.nameContainer}>
          <Text style={styles.vehicleName}>{item.name}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Icon
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "red" : "#555"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.vehiclePrice}>${item.price}</Text>

        {/* Vehicle Details */}
        <View style={styles.vehicleInfo}>
          <View style={styles.infoItem}>
            <Icon name="fuel" size={20} color="#0F3464FF" />
            <Text style={styles.infoText}>{item.fuelType}</Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="car-shift-pattern" size={20} color="#0F3464FF" />
            <Text style={styles.infoText}>{item.transmission}</Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="horse" size={20} color="#0F3464FF" />
            <Text style={styles.infoText}>{item.horsepower} HP</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VehicleCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  cardDetails: {
    marginTop: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Push heart icon to the end
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F3464FF",
    flex: 1, // Takes available space to push the heart icon to the right
  },
  vehiclePrice: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  vehicleInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
  },
});
