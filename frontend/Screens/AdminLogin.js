import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Status_admin from "./Status_admin";
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const AdminLogin = () => {
  const {t}=useTranslation();

  const submitForm = async () => {
    try {
        const response = await fetch(`http://192.168.43.221:8000/check/?name=${Name}&password=${MobileNo}`);
        const jsonData = await response.json();
        console.log(jsonData)
        if (jsonData.status) {
            navigation.navigate('Status_admin');
        }
        else
            alert('Wrong UserName or Password')
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    if (Name === '' || MobileNo === '') {
        alert('Please fill the above fields');
    }
};

  const navigation = useNavigation();
  const [Name, setName] = useState("");
  const [MobileNo, setMobileNo] = useState("");

  const handleTextChange1 = (inputText) => {
    setName(inputText);
  };

  const handleTextChange2 = (inputText) => {
    setMobileNo(inputText);
  };
 

  return (
    <View style={styles.backgroundImage}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar barStyle="dark-content" />

        <View style={{ top: 30 }}>
          <View>
            <Image
              source={require("../assets/security.png")}
              style={{ width: 350, height: 350, borderRadius: 20 }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={{ ...styles.Text, fontWeight: 700 }}>{t("username")}:</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder={t("enteryouruser")}
                onChangeText={handleTextChange1}
                value={Name}
                autoFocus
                maxLength={26}
                placeholderTextColor={'#2ba5be'}
              />
            </View>
          </View>
          <View style={{  marginTop: 20 }}>
            <View>
              <Text style={{ ...styles.Text, fontWeight: 700 }}>
                {t("password")} :
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder={t("enterpass")}
                onChangeText={handleTextChange2}
                value={MobileNo}
                secureTextEntry={true}
                maxLength={26}
                placeholderTextColor={'#2ba5be'}
              />
            </View>
          </View>
          <View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#2ba5be",
                  borderRadius: 10,
                  width: wp(90),
                  marginTop: 20,
                }}
                onPress={submitForm}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    padding: 8,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {t("login")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  input: {
    height: hp(6),
    borderColor: "#2ba5be",
    borderWidth: 1.5,
    marginLeft: 20,
    width: wp(90),
    fontSize: 15,
    paddingLeft: 5,
    color: "#2ba5be",
    borderRadius: 10,
  },
  Text: {
    fontSize: 20,
    marginLeft: 20,
    color: "#2ba5be",
    marginBottom:5
  },
  image: {
    width: 30,
    height: 30,
    left: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'contain'
    justifyContent: "center",
    width: wp(100),
    height: hp(100),
    backgroundColor: "#F5FEFD",
  },
  scrollViewContent: {
    padding: 0,
    width: wp(100),
    height: hp(100),
  },
});

export default AdminLogin;
