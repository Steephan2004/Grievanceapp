import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const Status = () => {
  const { t } = useTranslation();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");
  const [showCalendar, setShowCalendar] = useState(false);
  const [button, setButton] = useState(true);
  const [buttonValue, setButtonValue] = useState(t("showstatus"));
  const [data, setData] = useState([]);

  const data1 = [
    { id: "1", label: "CSE", value: "CSE" },
    { id: "2", label: "EEE", value: "EEE" },
    { id: "3", label: "ECE", value: "ECE" },
    { id: "4", label: "MECH", value: "MECH" },
    { id: "5", label: "NCC", value: "NCC" },
    { id: "6", label: "HOSTEL", value: "HOSTEL" },
    { id: "7", label: "ALL", value: "ALL" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.43.221:8000/get_data/");
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const buttonChange = () => {
    if (button == true) setButtonValue(t("hidestatus"));
    else setButtonValue(t("showstatus"));
    setButton(!button);
  };
  const showCalendarFunc = () => {
    if (selectedLanguage !== "None") setShowCalendar(!showCalendar);
    else alert("Select a value first");
  };

  const renderItem = ({ item }) => {
    let amountColor;

    if (item.Status == "COMPLETED") {
      amountColor = "green";
    } else if (item.Status == "PROCESSING") {
      amountColor = "#2ba5be";
    } else {
      amountColor = "#ED2939";
    }

    return (
      <View style={styles.card}>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {item.Venue}
          </Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 15, borderRadius: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {t("date")}: <Text>{item.Date}</Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {t("venue")}: <Text>{item.Floor}</Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {t("Room")}: <Text>{item.RoomNo}</Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {t("complaint")}: <Text>{item.Complaint}</Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {t("status")}:{" "}
            <Text style={{ color: amountColor, fontWeight: 800 }}>
              {item.Status}
            </Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
              {t("Remark")}: <Text>{item.Remark}</Text>
            </Text>
        </View>
      </View>
    );
  };

  let filteredData = data;

  if (selectedLanguage !== "ALL") {
    filteredData = data.filter((item) => item.Venue === selectedLanguage);
  }

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={{ ...styles.Text, fontWeight: 700 }}>
              {t("venue")}
            </Text>
            <TouchableOpacity
              onPress={toggleDropdown}
              style={styles.pickerContainer}
            >
              <Text style={{ color: "#2ba5be" }}>{selectedLanguage}</Text>
              <MaterialIcons
                name={isDropdownVisible ? "arrow-drop-up" : "arrow-drop-down"}
                size={24}
                color="#2ba5be"
              />
            </TouchableOpacity>

            {isDropdownVisible && (
              <FlatList
                data={data1}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                style={styles.flatList}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedLanguage(item.value);
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
            <TouchableOpacity
              style={{ backgroundColor: "#2ba5be", borderRadius: 5 }}
              onPress={() => {
                showCalendarFunc();
                buttonChange();
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  padding: 10,
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                {buttonValue}
              </Text>
            </TouchableOpacity>
          </View>
          {showCalendar && (
            <View style={styles.scroll}>
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={renderItem}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: hp(100),
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
    width: wp(92),
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
  flatList: {
    maxHeight: wp(80),
    marginBottom: 10,
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
  card: {
    backgroundColor: "#2ba5be",
    padding: 16,
    margin: 8,
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: "auto",
    width: wp(90),
  },
});

export default Status;
