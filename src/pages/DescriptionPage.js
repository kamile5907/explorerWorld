import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity, Modal, Animated, Dimensions, FlatList } from 'react-native';
import { getDescriptionById } from '../server/firebaseConfig';
import { useNavigation } from "@react-navigation/native";
import stylesDescricao from "../styles/StyleDescricao";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function DescricaoPage({ route }) {
  const { id } = route.params;  
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  
  const navigation = useNavigation();

  const { width } = Dimensions.get("window");
  const ITEM_WIDTH = width * 1.0;
  const ITEM_HEIGHT = ITEM_WIDTH * 2.7;

  const places = [
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
      title: "Plaza de Espanha",
    },
    {
      id: "Museu Guggenheim Bilbao",
      source: require("../images/Europa/espanha5.jpg"),
      title: "Museu Guggenheim Bilbao",
    },
  ];

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

  const renderItem = ({ item }) => (
    <View style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT,  }}>
      <ImageBackground source={item.source} style={{ flex: 1 }} resizeMode="cover">
      </ImageBackground>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!description) {
    return <Text>Descrição não encontrada!</Text>;
  }

  return (
    <View style={stylesDescricao.container}>
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
        contentContainerStyle={{ paddingVertical: 20 }} // Add vertical padding
      />
      
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ position: 'absolute', top: 40, left: 20 }}>
        <MaterialCommunityIcons name="arrow-left" size={35} color={"white"} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setVisible(true)} style={{ position: 'absolute', bottom: 40, right: 20 }}>
        <MaterialCommunityIcons name="arrow-up-circle-outline" size={40} color="black" />
      </TouchableOpacity>

      <Modal transparent={true} animationType="fade" visible={visible}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={{ color: 'black', padding: 20 }}>Fechar modal</Text>
        </TouchableOpacity>
        
        <View style={{ position: 'absolute', bottom: 0, height: "50%", width: "100%", backgroundColor: "white", borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 7 }}>
          <ScrollView>
            <Text style={stylesDescricao.texto}>{description.title}</Text>
            <Text style={stylesDescricao.texto2}>{description.country}</Text>
            <Text style={stylesDescricao.texto2}>{description.continent}</Text>
            <Text style={stylesDescricao.texto3}>{description.description}</Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default DescricaoPage;
