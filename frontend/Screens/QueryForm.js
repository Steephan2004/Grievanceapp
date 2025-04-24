import React, { useState,useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function QueryForm({ route }) {
  const value = route.params;
  const { t } = useTranslation();

  const [Name, setName] = useState(value.Name);
  const [MobileNumber, setMobileNumber] = useState(
    parseInt(value.MobileNo, 10)
  );
  const [Department, setDepartment] = useState(value.Department);

  const data1 = [
    { id: "1", label: "CSE", value: "CSE" },
    { id: "2", label: "EEE", value: "EEE" },
    { id: "3", label: "ECE", value: "ECE" },
    { id: "4", label: "MECH", value: "MECH" },
    { id: "5", label: "NCC", value: "NCC" },
    { id: "6", label: "HOSTEL", value: "HOSTEL" },
    { id: "7", label: "CANTEEN", value: "CANTEEN" },
  ];
  const data2 = [
    { id: "1", label: t("ground"), value: "Ground Floor" },
    { id: "2", label: t("1st"), value: "1st Floor" },
    { id: "3", label: t("2nd"), value: "2nd Floor" },
    { id: "4", label: t("3rd"), value: "3rd Floor" },
  ];
  const data3 = [
    { id: '1', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '2', categoryId: '1', subcategoryId: '2', value: 'J7494' },
    { id: '3', categoryId: '1', subcategoryId: '3', value: 'J2462' },
    { id: '4', categoryId: '2', subcategoryId: '1', value: 'J2437' },
    { id: '5', categoryId: '2', subcategoryId: '2', value: 'J2363' },
    { id: '6', categoryId: '3', subcategoryId: '1', value: 'J3479' },
    { id: '7', categoryId: '3', subcategoryId: '3', value: 'J3082' },
    { id: '8', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '9', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '10', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '11', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '12', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '13', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '14', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '15', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '16', categoryId: '1', subcategoryId: '1', value: "J8622" },
    { id: '17', categoryId: '1', subcategoryId: '1', value: "J8622" },
  ];
  

  const apiUrl = "http://192.168.43.221:8000/api/Queryform/";

  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(t("selectplace"));
  const [selectedLanguage1, setSelectedLanguage1] = useState(t("selectfloor"));
  const [selectedLanguage2, setSelectedLanguage2] = useState(t("selectroom"));
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible1, setIsDropdownVisible1] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [filteredData,setFilteredData]=useState(data3)
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("Hii");

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const toggleDropdown1 = () => {
    setIsDropdownVisible1(!isDropdownVisible1);
  };
  const toggleDropdown2 = () => {
    setIsDropdownVisible2(!isDropdownVisible2);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);

    setTitle(t("Comp"));
    setMail("Computer");
  };
  const toggleModal1 = () => {
    setModalVisible(!isModalVisible);
    setTitle(t("civ"));
    setMail("Civil");
  };
  const toggleModal2 = () => {
    setModalVisible(!isModalVisible);
    setTitle(t("Elec"));
    setMail("Electrical");
  };
  const toggleModal3 = () => {
    setModalVisible(!isModalVisible);
    setTitle(t("plum"));
    setMail("Plumbing");
  };
  const toggleModal4 = () => {
    setModalVisible(!isModalVisible);
    setTitle(t("others"));
    setMail("Others");
  };

  const handleInputChange1 = (text) => {
    setInputValue1(text);
  };
  const handleInputChange2 = (text) => {
    setInputValue2(text);
  };
  const submitForm = async () => {
    if (inputValue2) {
      alert("Complaint Successfully Sent");
      setModalVisible(!isModalVisible);
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            Name: Name,
            MobileNumber: MobileNumber,
            Department: Department,
            Venue: selectedLanguage,
            Floor: selectedLanguage1,
            RoomNo: selectedLanguage2,
            Complaint: inputValue2,
          }),
        });
        const responseData = await response.json();
        console.log("API Response:", responseData);
      } catch (error) {
        console.log("API Error:", error);
      }
      try {
        const response = await fetch(
          `http://192.168.43.221:8000/email/?title=${title}&venue=${selectedLanguage}&floor=${selectedLanguage1}&RoomNo=${inputValue1}&complaint=${inputValue2}&mail=${mail}`
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else alert("Please enter the value first");
    setTitle("Computer based Problems");
  };
  useEffect(() => {
    // Update filteredData based on selectedCategoryId and selectedSubcategoryId
    setFilteredData(data3.filter(
      item => item.categoryId === selectedCategoryId && item.subcategoryId === selectedSubcategoryId
    ));
  }, [selectedCategoryId, selectedSubcategoryId]);

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 50,
                  marginBottom: 20,
                  color: "#2ba5be",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {t("prob")}
              </Text>
              <View style={styles.box}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={toggleModal}
                >
                  <Image
                    source={require("../assets/computer.jpg")}
                    style={styles.image}
                  />
                  <Text
                    style={{ fontSize: 18, color: "#2ba5be", fontWeight: 600 }}
                  >
                    {" "}
                    {t("Comp")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={toggleModal1}
                >
                  <Image
                    source={require("../assets/civil.jpg")}
                    style={styles.image}
                  />
                  <Text
                    style={{ fontSize: 18, color: "#2ba5be", fontWeight: 600 }}
                  >
                    {t("civ")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={toggleModal2}
                >
                  <Image
                    source={require("../assets/elec.jpg")}
                    style={styles.image}
                  />
                  <Text
                    style={{ fontSize: 18, color: "#2ba5be", fontWeight: 600 }}
                  >
                    {t("Elec")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={toggleModal3}
                >
                  <Image
                    source={require("../assets/plumbing.jpg")}
                    style={styles.image}
                  />
                  <Text
                    style={{ fontSize: 18, color: "#2ba5be", fontWeight: 600 }}
                  >
                    {t("plum")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.box}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={toggleModal4}
                >
                  <Image
                    source={require("../assets/download.png")}
                    style={styles.image}
                  />
                  <Text
                    style={{ fontSize: 18, color: "#2ba5be", fontWeight: 600 }}
                  >
                    {t("others")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Modal */}
        <View style={styles.pageContainer}>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
          >
            <View style={styles.modalContainer}>
              
              <View style={styles.modalContent}>

                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 15,
                    color: "#2ba5be",
                    fontWeight: 600,
                  }}
                >
                  {title}
                </Text>
                
                <View style={styles.TextBox}>
                  <View>
                    <TouchableOpacity
                      onPress={toggleDropdown}
                      style={styles.pickerContainer}
                    >
                      <Text style={{ color: "#2ba5be" }}>
                        {selectedLanguage}
                      </Text>
                      <MaterialIcons
                        name={
                          isDropdownVisible
                            ? "arrow-drop-up"
                            : "arrow-drop-down"
                        }
                        size={24}
                        color="#2ba5be"
                      />
                    </TouchableOpacity>

                    {isDropdownVisible && (
                      <FlatList
                        data={data1}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        style={styles.flatList}
                        nestedScrollEnabled={true}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedCategoryId(item.id);
                              setSelectedLanguage(item.value);
                              toggleDropdown();
                              console.log(selectedCategoryId);
                              
                            }}
                          >
                            <Text style={styles.dropdownItem}>
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </View>
                <View style={styles.TextBox}>
                  <View>
                    <TouchableOpacity
                      onPress={toggleDropdown1}
                      style={styles.pickerContainer}
                    >
                      <Text style={{ color: "#2ba5be" }}>
                        {selectedLanguage1}
                      </Text>
                      <MaterialIcons
                        name={
                          isDropdownVisible1
                            ? "arrow-drop-up"
                            : "arrow-drop-down"
                        }
                        size={24}
                        color="#2ba5be"
                      />
                    </TouchableOpacity>

                    {isDropdownVisible1 && (
                      <FlatList
                        data={data2}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        style={styles.flatList}
                        nestedScrollEnabled={true}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedLanguage1(item.value);
                              setSelectedSubcategoryId(item.id);
                              console.log(selectedSubcategoryId);
                              toggleDropdown1();
                            }}
                          >
                            <Text style={styles.dropdownItem}>
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </View>
                <View style={styles.TextBox}>
                  <View>
                    <TouchableOpacity
                      onPress={toggleDropdown2}
                      style={styles.pickerContainer}
                    >
                      <Text style={{ color: "#2ba5be" }}>
                        {selectedLanguage2}
                      </Text>
                      <MaterialIcons
                        name={
                          isDropdownVisible2
                            ? "arrow-drop-up"
                            : "arrow-drop-down"
                        }
                        size={24}
                        color="#2ba5be"
                      />
                    </TouchableOpacity>
                    
                    {isDropdownVisible2 && (
                      <FlatList
                        data={filteredData}
                        keyExtractor={item => item.id}
                        scrollEnabled={true}
                        style={styles.flatList}
                        nestedScrollEnabled={true}
                        
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedLanguage2(item.value);
                              console.log(selectedLanguage2);
                              
                              toggleDropdown2();
                            }}
                          >
                            <Text style={styles.dropdownItem}>
                              {item.value}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </View>
                
                <View style={styles.TextBox}>
                  <Text style={styles.text1}>{t("complaint")}:</Text>
                  <TextInput
                    style={styles.TextInput1}
                    placeholder={t("entercomplaint")}
                    onChangeText={handleInputChange2}
                    value={inputValue2}
                    multiline
                    placeholderTextColor={"#2ba5be"}
                  />
                </View>
                <TouchableOpacity onPress={submitForm} disabled={false}>
                  <Text
                    style={{
                      backgroundColor: "#2ba5be",
                      padding: 10,
                      width: wp(40),
                      textAlign: "center",
                      color: "#fff",
                      fontSize: 15,
                      borderRadius: 20,
                      fontWeight: 700,
                    }}
                  >
                    {t("Submit")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.close} onPress={toggleModal}>
                  <MaterialCommunityIcons
                    name="close-thick"
                    color="#2ba5be"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    marginTop: 0,
    backgroundColor: "blue",
    width: wp(100),
    height: hp(10),
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: hp(35),
    width: wp(80),
    resizeMode: "stretch",
    borderRadius: 20,
    padding: 5,
  },
  box: {
    height: hp(45),
    width: wp(90),
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  pageContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  modalContainer: {
    position: "relative",
    alignSelf: "center",
    elevation: 10,
  },
  modalContent: {
    width: "auto",
    height: "auto",
    backgroundColor: "#F5FEFD",
    elevation: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  close: {
    position: "absolute",
    top: 10,
    right:5,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#2F015B",
  },
  click: {
    backgroundColor: "#FFAD00",
    padding: 10,
    marginBottom: 10,
    top: 50,
    borderRadius: 25,
    width: 230,
    alignSelf: "center",
    elevation: 7,
  },
  text1: {
    fontSize: 18,
    color: "#2ba5be",
    width: wp(24),
  },
  TextBox: {
    marginTop: 10,
    flexDirection: "row",
  },
  TextInput: {
    height: 45,
    borderColor: "#2ba5be",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#2ba5be",
    width: wp(55),
    borderRadius: 5,
  },
  TextInput1: {
    height: 40,
    borderColor: "#2ba5be",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#2ba5be",
    width:wp(57),
    height: hp(10),
    borderRadius: 5,
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
    width: "auto",
    height: "auto",
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: "#2ba5be",
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: wp(80),
    alignSelf: "center",
    color: "#fff",
    borderRadius:3,
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
    width: wp(80),
    alignSelf: "center",
    
  },
  flatList:{
    height:hp(27)
  }
});
