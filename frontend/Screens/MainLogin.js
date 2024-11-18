import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import GuestLogin from "./GuestLogin";
import Login from "./Login";
import Status from "./Status";
import Status_admin from "./Status_admin";
import AdminLogin from "./AdminLogin";
import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import { useState } from "react";

const { width, height } = Dimensions.get("window");
export default function MainLogin() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    
  };
  const Tamil=()=>{
    setModalVisible(!isModalVisible);
    changeLanguage('ta')
  }
  const Hindi=()=>{
    setModalVisible(!isModalVisible);
    changeLanguage('hi')
  }
  const English=()=>{
    setModalVisible(!isModalVisible);
    changeLanguage('en')
  }
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <View style={styles.backgroundImage}>
      <View
        style={{
          flex: 0,
          flexDirection:'row',
          justifyContent:'flex-end',
          paddingTop: 40,
          paddingRight: 15,
          
        }}
      >
        <TouchableOpacity onPress={toggleModal}>
        <Image
            source={require("../assets/world.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(AdminLogin)}>
          <Image
            source={require("../assets/user.png")}
            style={{ width: 30, height: 30 ,marginLeft:15}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <StatusBar style="auto" />
        <View >
          <Text style={{fontSize:29,paddingBottom:40,textAlign:'center',color:'#2ba5be',fontWeight:800,}}>{t('title')}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(Login)}
          >
            <Text style={styles.text}>{t('login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(GuestLogin)}
          >
            <Text style={styles.text}>{t('guest')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2ba5be" }]}
            onPress={() => navigation.navigate(Status)}
          >
            <Text style={[styles.text, { color: "#fff" }]}>{t('status')}</Text>
          </TouchableOpacity>
          
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
          >
            <View style={{backgroundColor:'#fff'}}>
              <TouchableOpacity onPress={Tamil}>
                <Text style={styles.modeltext}>தமிழ்</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={English}>
                <Text style={styles.modeltext}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={Hindi}>
                <Text style={styles.modeltext}>हिन्दी</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop:150,
  },
  button: {
    width: width < 800 ? wp(80) : wp(40),
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginBottom: 30,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#2ba5be",
    fontWeight: 700,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'contain'
    justifyContent: "center",
    width: wp(100),
    height: hp(100),
    backgroundColor: "#F5FEFD",
  },
  modeltext:{
    fontWeight:600,
    textAlign:'center',
    padding:20,
    borderTopWidth:.3,
    color:"#2ba5be",
    fontSize:16,
  }
};
