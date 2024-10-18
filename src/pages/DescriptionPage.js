import React, { useEffect, useState, useRef } from 'react';
import Svg, { Path } from "react-native-svg";
import { 
View, 
Text, 
ActivityIndicator, 
ScrollView, 
ImageBackground, 
TouchableOpacity, 
Modal, 
Animated, 
Dimensions, 
FlatList, 
TouchableWithoutFeedback } from 'react-native';
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
  const ITEM_HEIGHT = ITEM_WIDTH * 1.8;

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);  // Referência para o FlatList

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
      if (index >= carousel.length) {
        index = 0;  // Reinicia do primeiro item quando chega ao fim
      }
      flatListRef.current?.scrollToOffset({ offset: index * ITEM_WIDTH, animated: true, });  // Rolagem automática
    }, 1500);  // Define o intervalo de 1.5 segundos

    return () => clearInterval(interval);  // Limpa o intervalo ao desmontar o componente
  }, [carousel]);

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
      <Animated.View style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 20, transform: [{ scale }] }}>
        <ImageBackground source={item.img} style={stylesDescricao.imgCarousel} resizeMode="cover" />
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
        data={carousel}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${id}-${index}`}  // Define uma key única para cada item
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 0, }}
        snapToInterval={ITEM_WIDTH}  // Faz a rolagem "parar" a cada item
        decelerationRate="fast" // Controle de desaceleração
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        snapToAlignment="center"  // Alinha o item no centro
      />

      <TouchableOpacity onPress={() => navigation.goBack()} style={stylesDescricao.btnVoltar}>
        <MaterialCommunityIcons name="arrow-left-thin" size={35} color={"white"} />
      </TouchableOpacity>

      <Svg
        viewBox="0 0 1440 320"
        width="100%"
        height="20%"
        preserveAspectRatio="none"
        style={stylesDescricao.svg}
      >
        <Path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,128L60,112C120,96,240,64,360,85.3C480,107,600,181,720,213.3C840,245,960,235,1080,240C1200,245,1320,267,1380,277.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </Svg>

      <TouchableOpacity onPress={() => setVisible(true)} style={stylesDescricao.btnAbrirModal}>
        <MaterialCommunityIcons name="arrow-up-thin" size={50} color="white" />
      </TouchableOpacity>

      <Modal transparent={true} animationType="slide" visible={visible}>
          <TouchableOpacity onPress={() => setVisible(false)} style={stylesDescricao.btnFecharModal}>
            <MaterialCommunityIcons name="arrow-left-thin" size={35} color="white" />
          </TouchableOpacity>

          <View style={stylesDescricao.cardModal}>
            <ScrollView>
              <Text style={stylesDescricao.titulo}>{description.title}</Text>
              <Text style={stylesDescricao.pais}>{description.country}</Text>
              <Text style={stylesDescricao.continente}>{description.continent}</Text>
              <Text style={stylesDescricao.descricao}>{description.description}</Text>
            </ScrollView>
          </View>
      </Modal>
    </View>
  );
}

export default DescricaoPage;
