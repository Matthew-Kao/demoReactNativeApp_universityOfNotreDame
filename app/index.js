import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Image, Alert, SafeAreaView, Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const validateName = (name) => {
    // Checks if there's at least one space
    return /\s/.test(name);
  };
  
  const validateEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const validatePhone = (phone) => {
    // Checks if there are 10 digits in the phone number
    const digits = phone.replace(/\D/g, ''); // Removes any non-digit characters
    return digits.length === 11;
  };


const Stack = createStackNavigator();

const SelectAvatarScreen = ({ navigation }) => {
  const avatars = [
    require('../images/cuteCatPic1.jpeg'),
    require('../images/cuteCatPic2.jpeg'),
    require('../images/cuteCatPic3.jpeg'),
    require('../images/cuteDogPic1.jpeg'),
    require('../images/cuteDogPic2.jpeg'),
    require('../images/cuteDogPic3.jpeg'), // Add path to your images accordingly
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

const EditScreen = ({ route, navigation }) => {
  const [value, setValue] = useState(route.params.value);
  const { fieldName, validateAndSave } = route.params;

  const handleGoBack = () => {
    Alert.alert(
      "Discard Changes", // Title of the alert
      "Are you sure you want to discard your changes and go back?", // Message of the alert
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigation.goBack(), // Navigate back if 'Yes' is pressed
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
          placeholder={`Enter ${fieldName}`}
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

const ProfileScreen = ({ navigation, route}) => {
  const [userInfo, setUserInfo] = useState({
    avatar: require('../images/cuteCatPic1.jpeg'),
    name: 'Matthew Kao',
    phone: '15109609498',
    email: 'matthewkao@berkeley.edu',
    studentId: '3036970313',
  });

  useEffect(() => {
    if (route.params?.avatar) {
      handleAvatarChange(route.params.avatar);
    }
  }, [route.params?.avatar]);

  const updateField = (field, newValue) => {
    setUserInfo({ ...userInfo, [field]: newValue });
  };

  const handleAvatarChange = (newAvatar) => {
    setUserInfo({ ...userInfo, avatar: newAvatar });
  };

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
    return isValid; // Return the validation result
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
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit', { 
        fieldName: 'name', 
        value: userInfo.name, 
        validateAndSave: (newValue) => {
            const isValid = validateAndSave('name', newValue);
            if (isValid) {
              navigation.goBack();
            }
          },})}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{userInfo.name}</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>
      </TouchableOpacity>

      {/* Phone */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit', { 
        fieldName: 'phone', 
        value: userInfo.phone, 
        validateAndSave: (newValue) => {
            const isValid = validateAndSave('phone', newValue);
            if (isValid) {
              navigation.goBack();
            }
          },
        })}>
        <Text style={styles.label}>Phone</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{userInfo.phone}</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>
      </TouchableOpacity>

      {/* Email */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit', { 
        fieldName: 'email', 
        value: userInfo.email, 
        validateAndSave: (newValue) => {
            const isValid = validateAndSave('email', newValue);
            if (isValid) {
              navigation.goBack();
            }
          },})}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{userInfo.email}</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>
      </TouchableOpacity>

      {/* Student ID */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit', { 
        fieldName: 'studentId', 
        value: userInfo.studentId, 
        validateAndSave: (newValue) => {
            updateField('studentId', newValue); // Directly update without validation
            navigation.goBack();
          },
      })}>
        <Text style={styles.label}>Student ID</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{userInfo.studentId}</Text>
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
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, headerShadowVisible: false }} />
        <Stack.Screen name="Edit" component={EditScreen} options={{headerShown: false, title: ""}} />
        <Stack.Screen name="EditAvatar" component={EditAvatarScreen} />
        <Stack.Screen name="SelectAvatar" component={SelectAvatarScreen} options = {{headerShown: false}}/>
      </Stack.Navigator>
    );
  };



const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
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
    color: 'lightblue',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    fontSize: 18,
    marginRight: 5,
    color: 'gold'
  },
  logoContainer: {
    alignItems: 'center', // This centers the logo horizontally.
    justifyContent: 'center', // This aligns the logo to the bottom.
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'transparent' // You can adjust this value to move the logo up from the very bottom.
  },
  logo: {
    width: 150, // Set the width of your logo.
    height: 150, // Set the height of your logo.
    resizeMode: 'contain',
    backgroundColor: 'transparent' // This ensures the logo's aspect ratio is maintained.
  },

  arrow: {
    fontSize: 18,
    color: '#ccc',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // Change this as needed for your app's theme
  },
  editContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 60,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  remainingSpaceContainer: {
    flex: 1, // This will take all the available space
    justifyContent: 'center', // This will center the logo container on the cross axis (vertically in this case)
    alignItems: 'center', // This will center the logo container on the main axis (horizontally in this case)
    paddingVertical: 20, // Add padding if needed to ensure there's some space above and below the logo
  },
  goBackButton: {
    backgroundColor: 'gray', // Or any other color you prefer
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10, // Add some margin at the top for spacing
    // Add any additional styling you want for the button
  },
  goBackButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    // Add any additional styling you want for the text
  },
  titleText: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold', // Bold font weight
    textAlign: 'center', // Center align text
    marginVertical: 20, // Add vertical margin for spacing
    color: '#2F4F4F', // Dark slate gray color for the text
    // You can add additional styling such as fontFamily if you have custom fonts
  },
});

export default App;
