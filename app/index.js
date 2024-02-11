import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const EditScreen = ({ route, navigation }) => {
  const [value, setValue] = useState(route.params.value);
  const { fieldName, updateField } = route.params;

  return (
    <View style={styles.editContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
      />
      <Button
        title={`Save ${fieldName}`}
        onPress={() => {
          updateField(value);
          navigation.goBack();
        }}
      />
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    name: 'Matthew Kao',
    phone: '(510) 960 - 9498',
    email: 'matthewkao@berkeley.edu',
    avatar: require('../images/cuteCatPic1.jpeg'),
  });

  const updateField = (field, newValue) => {
    setUserInfo({ ...userInfo, [field]: newValue });
  };

  const handleAvatarChange = (newAvatar) => {
    setUserInfo({ ...userInfo, avatar: newAvatar });
  };

  return (
    <View style={styles.container}>

      {/* Circular Avatar */}
      <TouchableOpacity onPress={() => navigation.navigate('EditAvatar', { avatar: userInfo.avatar, setAvatar: handleAvatarChange })}>
        <Image source={userInfo.avatar} style={styles.avatar} />
      </TouchableOpacity>

      {/* Name */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit', { fieldName: 'name', value: userInfo.name, updateField: (newValue) => updateField('name', newValue) })}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{userInfo.name}</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>
      </TouchableOpacity>

      {/* Phone */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit', { fieldName: 'phone', value: userInfo.phone, updateField: (newValue) => updateField('phone', newValue) })}>
        <Text style={styles.label}>Phone</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{userInfo.phone}</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>
      </TouchableOpacity>

      {/* Email */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit', { fieldName: 'email', value: userInfo.email, updateField: (newValue) => updateField('email', newValue) })}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{userInfo.email}</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const EditAvatarScreen = ({ route, navigation }) => {
    const selectNewAvatar = () => {
        return require('../images/cuteCatPic1.jpeg'); 
      }; 
  
    return (
      <View style={styles.editContainer}>
        <Button
          title="Select New Avatar"
          onPress={() => {
            const newAvatar = selectNewAvatar();
            route.params.setAvatar(newAvatar);
            navigation.goBack();
          }}
        />
      </View>
    );
  };

const App = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="EditAvatar" component={EditAvatarScreen} />
      </Stack.Navigator>
    );
  };



const styles = StyleSheet.create({
  avatar: {
    width: 100, 
    height: 100, 
    alignSelf: 'center', 
    marginTop: 20, 
    marginBottom: 20, 
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    fontSize: 18,
    marginRight: 5,
  },
  arrow: {
    fontSize: 18,
    color: '#ccc',
  },
  editContainer: {
    padding: 20,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default App;