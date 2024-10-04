import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, Animated, ScrollView, ImageBackground, TouchableOpacity, Modal, Button, Dimensions } from 'react-native';
import { getDescriptionById } from '../server/firebaseConfig';
import { useFonts } from "expo-font";
import stylesDescricao from "../styles/StyleDescricao";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

function DescricaoPage({ route }) {
  const { id, image } = route.params;  
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blur, setBlur] = useState(false);

  const navigation = useNavigation();

  const [desaparecerView, setDesaparecerView] = useState(new Animated.Value(0));
  const [aparecerView, setAparecerView] = useState(new Animated.Value(390)); 

  useEffect(() => {
    
  }, []);

  const FecharAnimaçao = () => {

    setAparecerView(new Animated.Value(390));
    setBlur(false);
    Animated.sequence([
      Animated.timing(desaparecerView, {
        toValue: 390,  
        duration: 2000,  
        useNativeDriver: true, 
      }),
    ]).start();
  }

  const animatedView = () => {

    setBlur(true)
    Animated.sequence([
      Animated.timing(aparecerView, {
        toValue: 0, 
        duration: 1500,  
        useNativeDriver: true, 
      }),
    ]).start();
  }



  const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;
const SPACING = 20;

  const places= [
    {
      id: "Museu do Prado",
      source: require("../images/Europa/espanha1.jpg"),
      title: "Museu do Prado",
    },
    {
      id: "Cidade das Artes e das Ciências",
      source: require("../images/Europa/espanha2.jpg"),
      title: "Cidade das Artes e das Ciências",
    },
    {
      id: "Catedral de Santiago de Compostela",
      source: require("../images/Europa/espanha3.jpg"),
      title: "Catedral de Santiago de Compostela",
    },
    {
      id: "Plaza da España",
      source: require("../images/Europa/espanha4.jpg"),
      title: "Plaza de España",
    },
    {
      id: "Museu Guggenheim Bilbao",
      source: require("../images/Europa/espanha5.jpg"),
      title: "Museu Guggenheim Bilbao",
    },
  ];


    const scaleAnim = useRef(new Animated.Value(0)).current;
  const bgOpacityAnim = useRef(new Animated.Value(0)).current;
  const itemAnimations = places.map(
    () => useRef(new Animated.Value(0)).current
  );

  useEffect(() => {
    // Primeiro, anima a opacidade da imagem de fundo
    Animated.timing(bgOpacityAnim, {
      toValue: 1,
      duration: 1,
      useNativeDriver: true,
    }).start(() => {
      // Depois que a imagem de fundo aparecer, começa a animação de escala
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        // Após a escala, anima os itens do FlatList um de cada vez
        itemAnimations.forEach((anim, index) => {
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            delay: index * 100, // Cada item com um atraso
            useNativeDriver: true,
          }).start();
        });
      });
    });
  }, []);





  const [visible, setVisible] = useState(false);

  visModal = (vis) => {
    if (!visible) {
      setVisible(vis);
    } else {
      setVisible(vis);
    }
  };
 

  useEffect(() => {
    const getDescription = async () => {
      try {
        const data = await getDescriptionById(id);  
        setDescription(data);
      } catch (error) {
        console.error("Erro ao buscar descrição:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getDescription();
    } else {
      console.error("ID indefinido");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!description) {
    return <Text>Descrição não encontrada!</Text>;
  }

  return (
      <View style={stylesDescricao.container}>
        
    <ImageBackground
    style={{height:'100%', width:'100%', justifyContent:'flex-end'}}
    source={require("../images/Europa/italia.jpg")} blurRadius={ blur ? 10 : 0}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons name="arrow-left" size={35} color={"white"} />
        </TouchableOpacity>
      
      
      <View style={{ justifyContent: "flex-end", alignItems: "center"}}>
      <TouchableOpacity  onPress={() => {visModal(true);
        animatedView();
      }} style={{}}>
      <MaterialCommunityIcons
                        name="arrow-up-circle-outline"
                        size={40}
                        color="black"
                      />
                      
      </TouchableOpacity>
      
      
      <Modal transparent={true} animationType="fade" visible={visible} style={{backgroundColor: "red", }}>
      <TouchableOpacity onPress={() => {visModal(false);  FecharAnimaçao();} } >
      <Text>fechar modal</Text>
      </TouchableOpacity>
      
      <Animated.View
        style={{
          transform: [{ translateY: aparecerView}],
          position: 'absolute',  
          bottom: 0,  
          height: "50%",
          width: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          padding: 7,
        }}
      >
        <ScrollView>
        <Text style={stylesDescricao.texto}>{description.title}</Text>
          <Text style={stylesDescricao.texto2}>{description.country}</Text>
          <Text style={stylesDescricao.texto2}>{description.continent}</Text>
       
      <Text style={stylesDescricao.texto3}>{description.description}</Text>

      </ScrollView>
      </Animated.View>
      
      
      
      </Modal>
      
      </View>
      
      
      </ImageBackground>
    </View>
    
  );
}

export default DescricaoPage;
