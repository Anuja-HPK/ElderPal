import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Platform, Alert, Linking, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { request, PERMISSIONS } from 'react-native-permissions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TodoList({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskTime, setTaskTime] = useState(new Date());
  const [taskDate, setTaskDate] = useState(new Date());
  const [showAddTaskField, setShowAddTaskField] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedAM, setSelectedAM] = useState(true); // State to track AM or PM selection

  // Ref for ScrollView
  const scrollViewRef = useRef();

  // Load tasks from AsyncStorage on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
          const parsedTasks = JSON.parse(savedTasks).map(task => ({
            ...task,
            time: new Date(task.time), // Parse back to Date object
            date: new Date(task.date), // Parse back to Date object
          }));
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks state changes
  useEffect(() => {
    const saveTasks = async () => {
      try {
        // Filter out tasks with undefined or invalid time properties
        const tasksToSave = tasks
          .filter(task => task.time instanceof Date && !isNaN(task.time))
          .map(task => ({
            ...task,
            time: task.time.toISOString(),
            date: task.date.toISOString(),
          }));
        await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        task: newTask,
        time: taskTime,
        date: taskDate,
      };

      setTasks([...tasks, newTaskObject]);
      setNewTask('');
      setTaskTime(new Date());
      setTaskDate(new Date());
      setShowAddTaskField(false);
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const cancelAddTask = () => {
    setShowAddTaskField(false);
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || taskDate;
    setTaskDate(currentDate);
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || taskTime;
    setTaskTime(currentTime);
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
  };

  const deleteTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <View style={{ flex: 1 }}>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={require("../assets/back.png")} // Changed to back.png
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>TodoList</Text>
      </View>

      <View style={{ flex: 1 }}>
        {!showAddTaskField && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setShowAddTaskField(true);
              scrollViewRef.current.scrollTo({ y: 0, animated: true });
            }}>
            <Text style={styles.addButtonText}>+ Add Task</Text>
          </TouchableOpacity>
        )}

        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}>
          {showAddTaskField && (
            <View style={styles.addTaskField}>
              <TextInput
                style={styles.inputField}
                placeholder="Task"
                value={newTask}
                onChangeText={text => setNewTask(text)}
              />
              <TouchableOpacity
                style={styles.inputField}
                onPress={() => {
                  setShowTimePicker(true);
                  setSelectedAM(true);
                }}>
                <Text style={styles.inputText}>{taskTime.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputField}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.inputText}>{taskDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <View style={styles.dateTimePickerWrapper}>
                  <DateTimePicker
                    value={taskTime}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handleTimeChange}
                  />
                </View>
              )}
              {showDatePicker && (
                <View style={styles.dateTimePickerWrapper}>
                  <DateTimePicker
                    value={taskDate}
                    mode="date"
                    is24Hour={true}
                    display="spinner"
                    onChange={handleDateChange}
                  />
                </View>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addTaskButton}
                  onPress={handleAddTask}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addTaskButton}
                  onPress={cancelAddTask}>
                  <Text style={styles.addButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.taskContainer}>
            {tasks.map((task, index) => (
              <View
                key={index}
                style={styles.taskItem}>
                <View style={styles.taskContent}>
                  <Text style={styles.taskText}>{task.task}</Text>
                  {task.time && typeof task.time === 'object' && (
                    <Text style={styles.taskInfo}>{task.time.toLocaleTimeString()}</Text>
                  )}
                  {task.date && typeof task.date === 'object' && (
                    <Text style={styles.taskInfo}>{task.date.toLocaleDateString()}</Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => deleteTask(index)}>
                  <Image
                    source={require('../assets/delete.png')}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

    </View>
  );
}

const styles = {
  container: {
    alignItems: 'center',
    marginBottom: hp('5%'),
    paddingBottom: -70,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 70,
    backgroundColor: 'rgba(37,142,37, 0.6)',
  },
  title: {
    marginVertical: hp('5%'),
    fontSize: hp('5%'),
    fontWeight: '800',
    color: '#393939',
  },
  addButton: {
    marginHorizontal: wp('4%'),
    marginBottom: hp('1%'),
    paddingHorizontal: wp('7%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 30,
    backgroundColor: 'rgba(73,208,73, 0.8)',
  },
  addButtonText: {
    fontSize: hp('2.5%'),
    fontWeight: '400',
    color: '#393939',
  },
  addTaskField: {
    marginHorizontal: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  addTaskButton: {
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 30,
    backgroundColor: 'rgba(73,208,73, 0.8)',
  },
  inputField: {
    height: hp('7%'),
    width: wp('80%'),
    marginBottom: hp('2%'),
    borderRadius: 10,
    backgroundColor: 'rgba(73,208,73, 0.7)',
    paddingHorizontal: wp('2%'),
    fontSize: hp('2%'),
  },
  inputText: {
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    fontWeight: '600',
    color: '#3A3A3A',
  },
  dateTimePickerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskContainer: {
    marginHorizontal: wp('4%'),
    marginTop: hp('1%'),
  },
  taskItem: {
    backgroundColor: 'rgba(73,208,73, 0.4)',
    padding: hp('1%'),
    marginBottom: hp('1%'),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: hp('2.5%'),
    fontWeight: '800',
    color: '#393939',
  },
  taskInfo: {
    fontSize: hp('2%'),
    fontWeight: '500',
    color: '#393939',
  },
  deleteIcon: {
    width: wp('7%'),
    height: wp('7%'),
  },
  backButton: {
    position: 'absolute',
    top: hp('2%'), // Adjusted to 2% of the screen height
    left: wp('2%'), // Adjusted to 2% of the screen width
    zIndex: 1,
  },

  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    tintColor: 'black',
  },
};
