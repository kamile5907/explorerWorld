import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity, Modal, Animated, Dimensions, FlatList } from 'react-native';
import { getDescriptionById } from '../server/firebaseConfig';
import { useNavigation } from "@react-navigation/native";
import stylesDescricao from "../styles/StyleDescricao";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function DescricaoPage({ route }) {
  const { id, carousel } = route.params;  
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  
  const navigation = useNavigation();

  const { width } = Dimensions.get("window");
  const ITEM_WIDTH = width * 1.0;  // Alterando a largura para centralizar
  const ITEM_HEIGHT = ITEM_WIDTH * 2.7;

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);  // Referência para o FlatList

  const places = [{carousel}];

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

  useEffect(() => {
    let index = 0;  // Inicia no primeiro item
    const interval = setInterval(() => {
      index += 1;  // Avança para o próximo item
      if (index >= places.length) {
        index = 0;  // Reinicia do primeiro item quando chega ao fim
      }
      flatListRef.current?.scrollToOffset({ offset: index * ITEM_WIDTH, animated: true });  // Rolagem automática
    }, 2000);  // Define o intervalo de 3 segundos

    return () => clearInterval(interval);  // Limpa o intervalo ao desmontar o componente
  }, [places]);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, transform: [{ scale }] }}>
        <ImageBackground source={item.source} style={{ flex: 1 }} resizeMode="cover">
        </ImageBackground>
      </Animated.View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!description) {
    return <Text>Descrição não encontrada!</Text>;
  }

  return (
    <View style={stylesDescricao.container}>
      <Animated.FlatList
        ref={flatListRef}  // Atribui a referência ao FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 0 }}
        snapToInterval={ITEM_WIDTH}  // Faz a rolagem "parar" a cada item
        decelerationRate="fast" // Controle de desaceleração
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        snapToAlignment="center"  // Alinha o item no centro
      />
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 40, left: 20 }}>
        <MaterialCommunityIcons name="arrow-left" size={35} color={"white"} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setVisible(true)} style={{bottom: 30, alignItems: "center", position: "absolute" }}>
        <MaterialCommunityIcons name="text-box-outline" size={50} color="black" />
        <Text style={{fontSize: 25, fontWeight: "bold", color: "red"}}>Descrição</Text>
      </TouchableOpacity>
      


      <Modal transparent={true} animationType="slide" visible={visible}>
        <TouchableOpacity onPress={() => setVisible(false)} style={{position: 'absolute', top: 40, left: 20}}>
        <MaterialCommunityIcons name="arrow-left" size={35} color="black" />
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