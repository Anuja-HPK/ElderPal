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
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginBottom: 30,
            paddingBottom: -70,
            borderBottomRightRadius: 70,
            borderBottomLeftRadius: 70,
            backgroundColor: "rgba(128, 128, 128, 0.3)",
          }}
        >
          <Text
            style={{
              marginVertical: 60, //vertical margin
              fontSize: 50,
              fontWeight: 800,
            }}
          >
            TodoList
          </Text>
        </View>

        <View style={{ marginLeft: 15 }}>
          <TouchableOpacity
            style={{
              marginRight: 120,
              paddingLeft: 30,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 30,
              backgroundColor: "rgba(128, 128, 128, 0.8)",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: 400}}>
              + Add a New Task
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginRight: 30,
            alignItems: "flex-end",
            marginVertical: 500,
          }}
        >
          <TouchableOpacity
            style={{
              paddingLeft: 22,
              paddingRight: 22,
              borderRadius: 50,
              backgroundColor: "rgba(128, 128, 128, 0.8)",
            }}
          >
            <Text style={{ fontSize: 50, fontWeight: 300 }}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

  );
}
