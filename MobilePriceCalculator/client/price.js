import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";

const url = "http://192.168.2.34:5000";

export default class Price extends Component {
  constructor() {
    super();
    this.state = {
      numApple: 0,
      numBanana: 0,
      numOrange: 0,
      price: 0.0,
      Tax: false,
    };
  }

  handleAddAppleButtonClick() {
    this.addApple();
  }

  handleRemoveAppleButtonClick() {
    this.removeApple();
  }

  handleAddBananaButtonClick() {
    this.addBanana();
  }

  handleRemoveBananaButtonClick() {
    this.removeBanana();
  }

  handleAddOrangeButtonClick() {
    this.addOrange();
  }

  handleRemoveOrangeButtonClick() {
    this.removeOrange();
  }

  handleAddTaxButtonClick() {
    this.addTax();
  }

  handleRemoveTaxButtonClick() {
    this.removeTax();
  }

  addApple = async () => {
    try {
      let response = await fetch(url + "/getApple");
      let json = await response.json();
      var applePrice = Number(json.price);
      if (this.state.Tax) {
        applePrice = applePrice * 1.13;
      }
      this.setState((prevState) => ({
        price: (Number(prevState.price) + applePrice).toFixed(2),
        numApple: prevState.numApple + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  removeApple = async () => {
    try {
      let response = await fetch(url + "/getApple");
      let json = await response.json();
      var applePrice = Number(json.price);
      if (this.state.Tax) {
        applePrice = applePrice * 1.13;
      }
      if (this.state.numApple > 0) {
        this.setState((prevState) => ({
          price: (Number(prevState.price) - applePrice).toFixed(2),
          numApple: prevState.numApple - 1,
        }));
      } else {
        Alert.alert("No Apple in Cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  addBanana = async () => {
    try {
      let response = await fetch(url + "/getBanana");
      let json = await response.json();
      var bananaPrice = Number(json.price);
      if (this.state.Tax) {
        bananaPrice = bananaPrice * 1.13;
      }
      this.setState((prevState) => ({
        price: (Number(prevState.price) + bananaPrice).toFixed(2),
        numBanana: prevState.numBanana + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  removeBanana = async () => {
    try {
      let response = await fetch(url + "/getBanana");
      let json = await response.json();
      var bananaPrice = Number(json.price);
      if (this.state.Tax) {
        bananaPrice = bananaPrice * 1.13;
      }
      if (this.state.numBanana > 0) {
        this.setState((prevState) => ({
          price: (Number(prevState.price) - bananaPrice).toFixed(2),
          numBanana: prevState.numBanana - 1,
        }));
      } else {
        Alert.alert("No Banana in Cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  addOrange = async () => {
    try {
      let response = await fetch(url + "/getOrange");
      let json = await response.json();
      var orangePrice = Number(json.price);
      if (this.state.Tax) {
        orangePrice = orangePrice * 1.13;
      }
      this.setState((prevState) => ({
        price: (Number(prevState.price) + orangePrice).toFixed(2),
        numOrange: prevState.numOrange + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  removeOrange = async () => {
    try {
      let response = await fetch(url + "/getOrange");
      let json = await response.json();
      var orangePrice = Number(json.price);
      if (this.state.Tax) {
        orangePrice = orangePrice * 1.13;
      }
      if (this.state.numOrange > 0) {
        this.setState((prevState) => ({
          price: (Number(prevState.price) - orangePrice).toFixed(2),
          numOrange: prevState.numOrange - 1,
        }));
      } else {
        Alert.alert("No Orange in Cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  addTax = async () => {
    try {
      if (this.state.Tax == false) {
        this.setState((prevState) => ({
          price: (Number(prevState.price) * 1.13).toFixed(2),
          Tax: true,
        }));
      } else {
        Alert.alert("Tax Already Included");
      }
    } catch (error) {
      console.error(error);
    }
  };

  removeTax = async () => {
    try {
      if (this.state.Tax) {
        this.setState((prevState) => ({
          price: (Number(prevState.price) / 1.13).toFixed(2),
          Tax: false,
        }));
      } else {
        Alert.alert("No Tax Included");
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <SafeAreaView>
        <Text>Apple- In Cart: {this.state.numApple}</Text>
        <View style={styles.fixToText}>
          <Button
            title="ADD"
            onPress={() => this.handleAddAppleButtonClick()}
          />
          <Button
            title="REMOVE"
            onPress={() => this.handleRemoveAppleButtonClick()}
          />
        </View>
        <Text>Banana- In Cart: {this.state.numBanana}</Text>
        <View style={styles.fixToText}>
          <Button
            title="ADD"
            onPress={() => this.handleAddBananaButtonClick()}
          />
          <Button
            title="REMOVE"
            onPress={() => this.handleRemoveBananaButtonClick()}
          />
        </View>
        <Text>Orange- In Cart: {this.state.numOrange}</Text>
        <View style={styles.fixToText}>
          <Button
            title="ADD"
            onPress={() => this.handleAddOrangeButtonClick()}
          />
          <Button
            title="REMOVE"
            onPress={() => this.handleRemoveOrangeButtonClick()}
          />
        </View>
        <Text>Tax</Text>
        <View style={styles.fixToText}>
          <Button
            title="WITH TAX"
            onPress={() => this.handleAddTaxButtonClick()}
          />
          <Button
            title="WITHOUT TAX"
            onPress={() => this.handleRemoveTaxButtonClick()}
          />
        </View>
        <Text>Total Price: {this.state.price}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
