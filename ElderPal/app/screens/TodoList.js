import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {request, PERMISSIONS} from 'react-native-permissions';

export default function TodoList() {
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

  // const requestPermission = async () => {
  //   try {
  //     const permission =
  //       Platform.OS === 'android'
  //         ? PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM
  //         : PERMISSIONS.IOS.NOTIFICATIONS;
  //     const result = await request(permission);
  //     console.log(result);

  //     if (result === 'granted') {
  //       console.log('Permission granted');
  //       // Add tasks or perform actions that require permission here
  //     } else if (result === 'blocked') {
  //       console.log('Permission request blocked');
  //       // Inform the user and provide instructions to grant permission manually
  //     } else {
  //       // Inform the user and provide instructions to grant permission manually
  //       Alert.alert(
  //         'Permission Required',
  //         'This app needs permission to schedule reminders for your tasks. Please grant permission in app settings.',
  //         [
  //           {
  //             text: 'Go to Settings',
  //             onPress: () => {
  //               Linking.openSettings(); // Open app settings on Android
  //             },
  //           },
  //           {text: 'Cancel', onPress: () => {}}, // Handle cancel button
  //         ],
  //         {cancelable: false}, // Prevent user from dismissing without action
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error requesting permission:', error);
  //   }
  // };

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

      // Schedule notification for the task's time
      // const notificationDate = new Date(taskDate);
      // notificationDate.setHours(taskTime.getHours());
      // notificationDate.setMinutes(taskTime.getMinutes());

      // PushNotification.localNotificationSchedule({
      //   message: newTask, // Notification message
      //   date: notificationDate, // Date and time to fire the notification
      // });

      // Add the task to the tasks list
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
      setTaskTime(new Date());
      setTaskDate(new Date());
      setShowAddTaskField(false);
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
    scrollViewRef.current.scrollTo({y: 0, animated: true});
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
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text
          style={{
            marginVertical: 60,
            fontSize: 50,
            fontWeight: '800',
            color: '#393939',
          }}>
          TodoList
        </Text>
      </View>

      <View style={{flex: 1}}>
        {!showAddTaskField && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setShowAddTaskField(true);
              // Scroll to the top
              scrollViewRef.current.scrollTo({y: 0, animated: true});
            }}>
            <Text style={{fontSize: 25, fontWeight: '400', color: '#393939'}}>
              + Add Task
            </Text>
          </TouchableOpacity>
        )}

        <ScrollView
          ref={scrollViewRef}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}>
          {showAddTaskField && (
            <View style={styles.addTaskField}>
              <TextInput
                style={[
                  styles.inputField,
                  {fontSize: 24, fontWeight: '600', color: '#3A3A3A'},
                ]}
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
                <Text
                  style={{
                    fontSize: 24,
                    marginTop: 10,
                    fontWeight: '600',
                    color: '#3A3A3A',
                  }}>
                  {taskTime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputField}
                onPress={() => setShowDatePicker(true)}>
                <Text
                  style={{
                    fontSize: 24,
                    marginTop: 10,
                    fontWeight: '600',
                    color: '#3A3A3A',
                  }}>
                  {taskDate.toLocaleDateString()}
                </Text>
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
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={[
                    styles.addTaskButton,
                    {marginRight: 10, marginLeft: '30%'},
                  ]}
                  // onPress={() => {
                  //   requestPermission().then(granted => {
                  //     if (granted) {
                  //       handleAddTask();
                  //     } else {
                  //       // Handle case when permission is not granted
                  //       console.log('Permission not granted');
                  //       // Optionally, you can show a message to the user informing them that the task cannot be added without permission
                  //     }
                  //   });
                  // }}>
                  onPress={handleAddTask}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: '500',
                      color: '#393939',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addTaskButton}
                  onPress={cancelAddTask}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: '500',
                      color: '#393939',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>
            {tasks.map((task, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'rgba(73,208,73, 0.4)',
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between', 
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: 25, fontWeight: '800', color: '#393939'}}>
                    {task.task}
                  </Text>
                  {task.time && typeof task.time === 'object' && (
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '500',
                        color: '#393939',
                      }}>
                      {task.time.toLocaleTimeString()}
                    </Text>
                  )}
                  {task.date && typeof task.date === 'object' && (
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '500',
                        color: '#393939',
                      }}>
                      {task.date.toLocaleDateString()}
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => deleteTask(index)}>
                  <Image
                    source={require('../assets/delete.png')}
                    style={{width: 30, height: 30}}
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
    marginBottom: 30,
    paddingBottom: -70,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 70,
    backgroundColor: 'rgba(37,142,37, 0.6)',
  },
  addButton: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(73,208,73, 0.8)',
  },
  addTaskField: {
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTaskButton: {
    marginRight: 120,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(73,208,73, 0.8)',
  },
  inputField: {
    height: 50,
    width: 300,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(73,208,73, 0.7)',
    paddingHorizontal: 10,
    fontSize: 20,
  },
  dateTimePickerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
