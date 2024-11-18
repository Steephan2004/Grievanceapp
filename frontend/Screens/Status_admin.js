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
import { TextInput } from "react-native-gesture-handler";

const Status_admin = () => {
  const { t } = useTranslation();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");
  const [showCalendar, setShowCalendar] = useState(false);
  const [button, setButton] = useState(true);
  const [buttonValue, setButtonValue] = useState(t("showstatus"));
  const [data, setData] = useState([]);
  const [showStatusDetails, setShowStatusDetails] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showRemark, setShowRemark] = useState(false);
  const [remark, setRemark] = useState("");
  const [status,setStatus]=useState('')

  const [csrfToken, setCsrfToken] = useState(null); // State to store CSRF token
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
    fetchCsrfToken(); // Fetch CSRF token when component mounts
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

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch(
        "http://192.168.43.221:8000/get_csrf_token/"
      );
      const data = await response.json();
      console.log(data.csrfToken);
      setCsrfToken(data.csrfToken);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  
  const handleSubmit = async(submitId) => {
    setShowStatusDetails(!showStatusDetails);
    setShowRemark(!showRemark);
    setShowRemark(false); // Hide the remark input after submission (optional)
    setSelectedItemId(null);
    try {
      if (!csrfToken) {
        console.error("CSRF token not available");
        return;
      }

      const response = await fetch(
        "http://192.168.43.221:8000/update_status/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
            Referer: "http://192.168.43.221:8000/",
          },
          body: JSON.stringify({
            id: submitId,
            status: status,
            remark:remark
          }),
        }
      );
      if (response.ok) {
        console.log("Status updated successfully");
      } else {
        // Log the status code and response text to understand the failure
        const errorText = await response.text();
        console.error(
          "Failed to update status: ${response.status} - ${errorText}"
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const statusDetails = (itemId, newStatus) => {
    setShowRemark(!showRemark);
    setSelectedItemId(itemId);

    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === itemId) {
          setStatus(newStatus)
          return { ...item, Status: newStatus };
        }
        return item;
      });
    });
  };

  const statusDetails1 = (itemId) => {
    setShowStatusDetails(!showStatusDetails);
    setShowRemark(false)
    setSelectedItemId(itemId);
  };

  const handleRemarkChange = (itemId, newRemark) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === itemId) {
          setRemark(newRemark)
          return { ...item, remark: newRemark }; // Update the remark for the specific item
        }
        return item;
      });
    });
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
    return (
      <View style={styles.card}>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "700",
              color: "#fff",
            }}
          >
            {item.Venue}
          </Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 15, borderRadius: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {t("date")}: <Text>{item.Date}</Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {t("venue")}: <Text>{item.Floor}</Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {t("Room")}: <Text>{item.RoomNo}</Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {t("complaint")}: <Text>{item.Complaint}</Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {t("status")}: <Text>{item.Status}</Text>
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {t("Remark")}: <Text>{item.remark}</Text>
          </Text>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => statusDetails1(item.id)}
          >
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                padding: 15,
                backgroundColor: "#2ba5be",
                borderRadius: 5,
                fontSize: 18,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              {t("updatestatus")}
            </Text>
          </TouchableOpacity>
          {showStatusDetails && selectedItemId === item.id && (
            <View
              style={{
                alignItems: "center",
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => statusDetails(item.id, "PROCESSING")}
              >
                <Text
                  style={{
                    backgroundColor: "#2ba5be",
                    padding: 12,
                    borderRadius: 5,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {t("processing")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => statusDetails(item.id, "COMPLETED")}
              >
                <Text
                  style={{
                    backgroundColor: "#2ba5be",
                    padding: 12,
                    borderRadius: 5,
                    marginLeft: 10,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {t("completed")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {showRemark && selectedItemId === item.id && (
            <View>
              <Text style={styles.label}>Add Remark:</Text>
              <TextInput
                style={styles.input}
                value={item.remark} // Bind the specific item's remark value
                onChangeText={(newRemark) =>
                  handleRemarkChange(item.id, newRemark)
                }
                placeholder="Enter your remark"
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleSubmit(item.id)} // Pass the item id for submit
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
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
            <Text style={styles.Text}>{t("venue")}</Text>
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
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#2ba5be",
    padding: 10,
    borderRadius: 5,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Status_admin;
