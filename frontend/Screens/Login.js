import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import QueryForm from "./QueryForm";
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [Name, setName] = useState("Student");
  const [isDropdownVisible1, setIsDropdownVisible1] = useState(false);
  const [Department, setDepartment] = useState("None");
  const [MobileNo, setMobileNo] = useState("");

  const [data2, setData2] = useState([
    { label: "CSE", value: "CSE" },
    { label: "ECE", value: "ECE" },
    { label: "EEE", value: "EEE" },
    { label: "MECH", value: "MECH" },
    { label: "CIVIL", value: "CIVIL" },
    { label: "None", value: "None" },
  ]);

  const [data1, setData1] = useState([
    { label: t("student"), value: "Student" },
    { label: t("teachstaff"), value: "Teaching Staff" },
    { label: t("nonteachstaff"), value: "Non-Teaching Staff" },
  ]);

  const apiUrl = "http://192.168.43.221:8000/api/login/"; // Replace with your Django API URL

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleDropdown1 = () => {
    setIsDropdownVisible1(!isDropdownVisible1);
  };
  const handleTextChange2 = (inputText) => {
    setMobileNo(inputText);
  };

  const submitForm = async () => {
    if ((Name == t("student") || Name == t("teachstaff")) && Department == "None") {
      alert("Enter your department");
    }
    else if(MobileNo.length!=10){
      alert("Enter correct mobile number")
    }
    else {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            WhoAreYou: Name,
            Department: Department,
            MobileNumber: MobileNo,
          }),
        });

        const responseData = await response.json();
        console.log("API Response:", responseData);
      } catch (error) {
        console.error("API Error:", error);
        // Handle errors here
      }
      navigation.navigate("QueryForm", { Name, MobileNo, Department }); //Changed Just now
    }
  };

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={{}}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <View>
                <Image
                  source={require("../assets/learning.png")}
                  style={{ width: 350, height: 350, borderRadius: 20 }}
                />
              </View>
              <View>
                <Text style={{ ...styles.Text, fontWeight: 600 }}>
                  {t("you")}
                </Text>
                <TouchableOpacity
                  onPress={toggleDropdown}
                  style={styles.pickerContainer}
                >
                  <Text style={{ color: "#2ba5be" }}>
                    {data1.find((item) => item.value === Name)?.label}
                  </Text>
                  <MaterialIcons
                    name={
                      isDropdownVisible ? "arrow-drop-up" : "arrow-drop-down"
                    }
                    size={24}
                    color="#000"
                  />
                </TouchableOpacity>

                {isDropdownVisible && (
                  <SectionList
                    sections={[{ data: data1 }]}
                    keyExtractor={(item, index) => item.value + index}
                    scrollEnabled={false}
                    style={styles.sectionList}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setName(item.value);
                          toggleDropdown();
                        }}
                      >
                        <Text style={styles.dropdownItem}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>

              <View>
                <Text style={{ ...styles.Text, fontWeight: 600 }}>
                  {t("Department")}
                </Text>
                <TouchableOpacity
                  onPress={toggleDropdown1}
                  style={styles.pickerContainer}
                >
                  <Text style={{ color: "#2ba5be" }}>
                    {data2.find((item) => item.value === Department)?.label}
                  </Text>
                  <MaterialIcons
                    name={
                      isDropdownVisible1 ? "arrow-drop-up" : "arrow-drop-down"
                    }
                    size={24}
                    color="#000"
                  />
                </TouchableOpacity>

                {isDropdownVisible1 && (
                  <SectionList
                    sections={[{ data: data2 }]}
                    keyExtractor={(item, index) => item.value + index}
                    scrollEnabled={false}
                    style={styles.sectionList}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setDepartment(item.value);
                          toggleDropdown1();
                        }}
                      >
                        <Text style={styles.dropdownItem}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
              <View style={{ marginBottom: 20 }}>
                <View>
                  <Text style={{ ...styles.Text, fontWeight: 600 }}>
                    {t("MobileNo")}
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder={t("entermobno")}
                    placeholderTextColor={"#2ba5be"}
                    onChangeText={handleTextChange2}
                    value={MobileNo}
                    keyboardType="Numeric"
                    maxLength={10}
                  />
                </View>
              </View>

              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2ba5be",
                    borderRadius: 30,
                    marginTop: 10,
                    marginBottom:20,
                    
                  }}
                  onPress={submitForm}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      padding: 8,
                      fontSize: 20,
                      color: "#fff",
                    }}
                  >
                    {t("Submit")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#2ba5be",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 10,
    bottom: 12,
    width: wp(90),
    alignSelf: "center",
  },
  dropdownItem: {
    padding: 12,
    backgroundColor: "#2ba5be",
    borderBottomWidth: 2,
    borderColor: "#11182711",
    width: wp(92),
    alignSelf: "center",
    color: "#fff",
  },
  Text: {
    paddingBottom: 12,
    paddingTop: 12,
    fontSize: 20,
    left: 10,
    color: "#2ba5be",
  },
  sectionList: {
    maxHeight: wp(80),
  },
  scrollViewContent: {
    padding: 10,
    width: "auto",
    height: "auto",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: wp(100),
    height: hp(100),
    backgroundColor: "#F5FEFD",
  },
  input: {
    height: hp(7),
    borderColor: "#2ba5be",
    borderWidth: 1,
    marginLeft: 10,
    width: wp(90),
    fontSize: 15,
    paddingLeft: 12,
    color: "#2ba5be",
    borderRadius: 5,
  },
});

export default Login;
