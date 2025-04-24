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
import QueryForm from "./QueryForm";
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const GuestLogin = () => {

  const apiUrl = "http://192.168.43.221:8000/api/GuestLogin/";
  const Department='Guest'
  const { t } = useTranslation();

  const navigation = useNavigation();
  const [Name, setName] = useState("");
  const [MobileNo, setMobileNo] = useState("");

  const handleTextChange1 = (inputText) => {
    setName(inputText);
  };

  const handleTextChange2 = (inputText) => {
    setMobileNo(inputText);
  };
  const submitForm = async () => {
    if (Name != "" && MobileNo.length == 10) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            Name: Name,
            MobileNumber: MobileNo,
          }),
        });

        const responseData = await response.json();
        console.log("API Response:", responseData);
      } catch (error) {
        console.log("Api Error:", error);
      }
      navigation.navigate("QueryForm",{Name,MobileNo,Department});//Changed Just now
    } else alert("Enter the Value or check your mobile number properly");
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
              source={require("../assets/guestlogin.png")}
              style={{ width: 400, height: 400, borderRadius: 20 }}
            />
          </View>
          <View style={{  marginTop: 20 }}>
            <View>
              <Text style={{ ...styles.Text, fontWeight: 700 }}>{t("Name")} :</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder={t("enteryourname")}
                onChangeText={handleTextChange1}
                value={Name}
                autoFocus
                maxLength={26}
                placeholderTextColor={'#2ba5be'}

              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={{ ...styles.Text, fontWeight: 700 }}>
                {t("MobileNo")} :
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder={t("entermobno")}
                onChangeText={handleTextChange2}
                value={MobileNo}
                keyboardType="Numeric"
                maxLength={10}
                placeholderTextColor={'#2ba5be'}
              />
            </View>
          </View>
          <View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#2ba5be",
                  borderRadius: 30,
                  width: wp(95),
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
                  {t("Submit")}
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
    borderWidth: 2,
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
    marginBottom:5,
  },
  image: {
    width: 30,
    height: 30,
    left: 20,
    elevation:5,
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

export default GuestLogin;
