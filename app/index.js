import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//name validation: must have both a first and last name
const validateName = (name) => {
    return /\s/.test(name);
  };
  
//email validation: must have characters before and after the @ symbol, followed by a period and characters after the period
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

//phone validation: phone numbers must be 11 characters long
const validatePhone = (phone) => {
  const digits = phone.replace(/\D/g, ''); 
    return digits.length === 11;
};

const Stack = createStackNavigator();

//this is the User's landing page
const ProfileScreen = ({ navigation, route}) => {
  const [userInfo, setUserInfo] = useState({
    avatar: require('../images/cuteCatPic1.jpeg'),
    name: 'Matthew Kao',
    phone: '15109609498',
    email: 'matthewkao@berkeley.edu',
    studentId: '3036970313',
  });

  // Update the avatar based on user selection.
  useEffect(() => {
    if (route.params?.avatar) {
      handleAvatarChange(route.params.avatar);
    }
  }, [route.params?.avatar]);

  const updateField = (field, newValue) => {
    setUserInfo({ ...userInfo, [field]: newValue });
  };

  //alternate colors between blue and gold for field values to match ND symbol
  const getInfoColor = (index) => {
    return index % 2 === 0 ? 'blue' : 'gold';
  };

  const handleAvatarChange = (newAvatar) => {
    setUserInfo({ ...userInfo, avatar: newAvatar });
  };

  //field validations and descriptive alerts
  const validateAndSave = (field, newValue) => {
    let isValid = false;
    switch (field) {
      case 'name':
        isValid = validateName(newValue);
        if (!isValid) Alert.alert('Invalid Name', 'Please enter both first and last name.');
        break;
      case 'email':
        isValid = validateEmail(newValue);
        if (!isValid) Alert.alert('Invalid Email', 'Please enter a valid email address.');
        break;
      case 'phone':
        isValid = validatePhone(newValue);
        if (!isValid) Alert.alert('Invalid Phone', 'Please enter a valid phone number that 11 characters long');
        break;
      default:
        isValid = true;
        break;
    }
  
    if (isValid) {
      updateField(field, newValue);
    }
    return isValid; 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Text style={styles.header}>Profile</Text>
    <View style={styles.container}>

      {/* Circular Avatar */}
    <TouchableOpacity onPress={() => navigation.navigate('SelectAvatar')}>
      <Image source={userInfo.avatar} style={styles.avatar} />
    </TouchableOpacity>

    {/* Name */}
    <TouchableOpacity
      style = {styles.item}
      onPress={() =>
        navigation.navigate('Edit', {
          fieldName: 'name',
          value: userInfo.name,
          validateAndSave: (newValue) => {
            const isValid = validateAndSave('name', newValue);
            if (isValid) {
              navigation.goBack();
            }
          },
        })
      }
    >
      <Text style={styles.label}>Name</Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, {color: getInfoColor(0)}]}>{userInfo.name}</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </View>
    </TouchableOpacity>

    {/* Phone */}
    <TouchableOpacity
      style = {styles.item}
      onPress={() =>
        navigation.navigate('Edit', {
          fieldName: 'phone',
          value: userInfo.phone,
          validateAndSave: (newValue) => {
            const isValid = validateAndSave('phone', newValue);
            if (isValid) {
              navigation.goBack();
            }
          },
        })
      }
    >
      <Text style={styles.label}>Phone</Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, {color: getInfoColor(1)}]}>{userInfo.phone}</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </View>
    </TouchableOpacity>

    {/* Email */}
    <TouchableOpacity
      style = {styles.item}
      onPress={() =>
        navigation.navigate('Edit', {
          fieldName: 'email',
          value: userInfo.email,
          validateAndSave: (newValue) => {
            const isValid = validateAndSave('email', newValue);
            if (isValid) {
              navigation.goBack();
            }
          },
        })
      }
    >
      
      <Text style={styles.label}>Email</Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, {color: getInfoColor(2)}]}>{userInfo.email}</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </View>
    </TouchableOpacity>

    {/* Student ID */}
    <TouchableOpacity
      style = {styles.item}
      onPress={() =>
        navigation.navigate('Edit', {
          fieldName: 'studentId',
          value: userInfo.studentId,
          validateAndSave: (newValue) => {
            const isValid = validateAndSave('studentId', newValue);
            if (isValid) {
              navigation.goBack();
            }
          },
        })
      }
    >
      <Text style={styles.label}>Student ID</Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, {color: getInfoColor(3)}]}>{userInfo.studentId}</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </View>
    </TouchableOpacity>
    </View>
      <View style={{...styles.remainingSpaceContainer, backgroundColor: 'white'}}>
      <View style={{ ...styles.logoContainer, marginTop: 50, marginBottom: 50, backgroundColor: 'white'}}>
          <Image source={require('../images/NDlogo.jpeg')} style={styles.logo}  />
      </View>
    </View>
    </SafeAreaView>

  );
};

// Screen for selecting a new avatar.
const SelectAvatarScreen = ({ navigation }) => {
  const avatars = [
    require('../images/cuteCatPic1.jpeg'),
    require('../images/cuteCatPic2.jpeg'),
    require('../images/cuteCatPic3.jpeg'),
    require('../images/cuteDogPic1.jpeg'),
    require('../images/cuteDogPic2.jpeg'),
    require('../images/cuteDogPic3.jpeg'), 
  ];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.titleText}>Please select the cutest picture</Text>
      {avatars.map((avatar, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate('Profile', { avatar });
          }}
        >
          <Image source={avatar} style={{ width: 100, height: 100, margin: 10 }} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// One Screen for editing user details such as Name, Phone Number, Email and studentID .
const EditScreen = ({ route, navigation }) => {
  const [value, setValue] = useState(route.params.value);
  const { fieldName, validateAndSave } = route.params;

  //Alert the user when they try to go back without passing the validation
  const handleGoBack = () => {
    Alert.alert(
      "Discard Changes", 
      "Are you sure you want to discard your changes and go back?", 
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigation.goBack(), 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.editContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          value={value}
        />
        <TouchableOpacity style={styles.saveButton} onPress={() => {
            const isValid = validateAndSave(value);
            if (isValid) {
              navigation.goBack();
            }
        }}>
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
          <Text style={styles.goBackButtonText}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const EditAvatarScreen = ({ route, navigation }) => {
  //this is my cutest picture, so this is my default avatar :)
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

// Sets up the app's navigation structure, managing transitions between screens.
const App = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, headerShadowVisible: false }} />
        <Stack.Screen name="Edit" component={EditScreen} options={{headerShown: false, title: ""}} />
        <Stack.Screen name="EditAvatar" component={EditAvatarScreen} />
        <Stack.Screen name="SelectAvatar" component={SelectAvatarScreen} options = {{headerShown: false}}/>
      </Stack.Navigator>
    );
  };


//styling for the application
const styles = StyleSheet.create({
  arrow: {
    color: '#ccc',
    fontSize: 18,
  },
  avatar: {
    alignSelf: 'center',
    height: 100,
    marginBottom: 20,
    marginTop: 20,
    width: 100,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  editContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 60,
  },
  goBackButton: {
    backgroundColor: 'gray',
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  goBackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginRight: 5,
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    marginBottom: 20,
  },
  item: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  label: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    backgroundColor: 'transparent',
    height: 150,
    resizeMode: 'contain',
    width: 150,
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  remainingSpaceContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  saveButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    elevation: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    color: '#2F4F4F',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default App;