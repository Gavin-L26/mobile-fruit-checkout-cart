import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";

const url = "https://radiant-spire-66706.herokuapp.com";

export default class Price extends Component {
  constructor() {
    super();
    this.state = {
      numApple: 0,
      numBanana: 0,
      numOrange: 0,
      price: 0.0,
      Tax: false,
      Type: "",
    };
  }

  componentDidMount() {
    fetch(url + "/reset").catch((error) => {
      console.error(error);
    });
  }

  handleAddAppleButtonClick() {
    this.setState((prevState) => ({
      numApple: prevState.numApple + 1,
    }));
    this.setState(
      {
        Type: "apple",
      },
      () => {
        console.log(this.state.Type);
        this.addItem();
      }
    );
  }

  handleRemoveAppleButtonClick() {
    if (this.state.numApple > 0) {
      this.setState(
        {
          Type: "apple",
        },
        () => {
          console.log(this.state.Type);
          this.removeItem();
        }
      );
      this.setState((prevState) => ({
        numApple: prevState.numApple - 1,
      }));
    } else {
      Alert.alert("No Apple in Cart");
    }
  }

  handleAddBananaButtonClick() {
    this.setState((prevState) => ({
      numBanana: prevState.numBanana + 1,
    }));
    this.setState(
      {
        Type: "banana",
      },
      () => {
        console.log(this.state.Type);
        this.addItem();
      }
    );
  }

  handleRemoveBananaButtonClick() {
    if (this.state.numBanana > 0) {
      this.setState(
        {
          Type: "banana",
        },
        () => {
          console.log(this.state.Type);
          this.removeItem();
        }
      );
      this.setState((prevState) => ({
        numBanana: prevState.numBanana - 1,
      }));
    } else {
      Alert.alert("No Banana in Cart");
    }
  }

  handleAddOrangeButtonClick() {
    this.setState((prevState) => ({
      numOrange: prevState.numOrange + 1,
    }));
    this.setState(
      {
        Type: "orange",
      },
      () => {
        console.log(this.state.Type);
        this.addItem();
      }
    );
  }

  handleRemoveOrangeButtonClick() {
    if (this.state.numOrange > 0) {
      this.setState(
        {
          Type: "orange",
        },
        () => {
          console.log(this.state.Type);
          this.removeItem();
        }
      );
      this.setState((prevState) => ({
        numOrange: prevState.numOrange - 1,
      }));
    } else {
      Alert.alert("No Orange in Cart");
    }
  }

  handleAddTaxButtonClick() {
    this.addTax();
  }

  handleRemoveTaxButtonClick() {
    this.removeTax();
  }

  async addItem() {
    try {
      let response = await fetch(url + "/addItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.state.Type }),
      });
      let json = await response.json();
      this.setState({
        price: Number(json.totalPrice),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async removeItem() {
    try {
      let response = await fetch(url + "/removeItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.state.Type }),
      });
      let json = await response.json();
      this.setState({
        price: Number(json.totalPrice),
      });
    } catch (error) {
      console.error(error);
    }
  }

  addTax = async () => {
    try {
      let taxResponse = await fetch(url + "/addTax");
      let taxJson = await taxResponse.json();
      var taxState = taxJson.mes;
      let priceResponse = await fetch(url + "/getTotalPrice");
      let priceJson = await priceResponse.json();
      this.setState({
        price: Number(priceJson.totalPrice),
      });
      if (taxState == "already taxed") {
        Alert.alert("Tax Already Included");
      }
    } catch (error) {
      console.error(error);
    }
  };

  removeTax = async () => {
    try {
      let taxResponse = await fetch(url + "/removeTax");
      let taxJson = await taxResponse.json();
      var taxState = taxJson.mes;
      let priceResponse = await fetch(url + "/getTotalPrice");
      let priceJson = await priceResponse.json();
      this.setState({
        price: Number(priceJson.totalPrice),
      });
      if (taxState == "already untaxed") {
        Alert.alert("Tax Already Excluded");
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
