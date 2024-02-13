import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";

export default function TodoList() {
  return (
    <ImageBackground
      source={require("../assets/todo_home.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              marginVertical: 60,
              fontSize: 50,
              fontWeight: 800,
            }}
          >
            TodoList
          </Text>
          <TouchableOpacity>
            <Text>Add a New Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
