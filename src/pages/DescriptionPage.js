import React, { useEffect, useState, useRef } from 'react';
import Svg, { Path } from "react-native-svg";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList
} from 'react-native';
import { getDescriptionById } from '../server/firebaseConfig';
import { useNavigation } from "@react-navigation/native";
import stylesDescricao from "../styles/StyleDescricao";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function DescricaoPage({ route }) {
  const { id, carousel } = route.params;
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewUp, setViewUp] = useState(false); // Controla o estado das animações
  
  const navigation = useNavigation();

  const { width, height } = Dimensions.get("window");
  const ITEM_WIDTH = width * 1.0;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.8;

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(0)).current; // Um único Animated.Value para controlar ambas as animações

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
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      if (index >= carousel.length) {
        index = 0;
      }
      flatListRef.current?.scrollToOffset({ offset: index * ITEM_WIDTH, animated: true });
    }, 1500);

    return () => clearInterval(interval);
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
      <Animated.View style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT * 1.2, borderRadius: 20, transform: [{ scale }] }}>
        <ImageBackground source={item.img} style={stylesDescricao.imgCarousel} resizeMode="cover" />
      </Animated.View>
    );
  };

  const toggleAnimations = () => {
    Animated.timing(slideAnim, {
      toValue: viewUp ? 0 : 1, // Controla a direção das animações
      duration: 500,
      useNativeDriver: true,
    }).start();
    setViewUp(!viewUp); // Alterna o estado
  };

  // Animação para a View
  const slideUpView = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],  // Ajusta para controlar a posição da View
  });

  // Animação para o botão
  const slideUpButton = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -400],  // Ajusta para controlar a posição do botão
  });


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!description) {
    return <Text>Descrição não encontrada!</Text>;
  }

  return (
    <View style={stylesDescricao.container}>
      <View style={{ flex: 1 }}>

      <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={stylesDescricao.btnVoltar}
          >
            <MaterialCommunityIcons
              name="arrow-left-thin"
              size={50}
              color="white"
            />
          </TouchableOpacity>

        <Animated.FlatList
          ref={flatListRef}
          data={carousel}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${id}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 0 }}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          snapToAlignment="center"
        />

        <Animated.View style={[stylesDescricao.animatedView, { transform: [{ translateY: slideUpView }] }]}>
          <Svg
            viewBox="0 0 1440 320"
            width="100%"
            height={height * 0.15} 
            preserveAspectRatio="none"
            style={stylesDescricao.svg}
          >
            <Path
              fill="#fff"
              fillOpacity="1"
              d="M0,128L60,112C120,96,240,64,360,85.3C480,107,600,181,720,213.3C840,245,960,235,1080,240C1200,245,1320,267,1380,277.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </Svg>

          <View style={stylesDescricao.cardDescricao}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={stylesDescricao.titulo}>{description.title}</Text>
              <Text style={stylesDescricao.pais}>{description.country}</Text>
              <Text style={stylesDescricao.continente}>{description.continent}</Text>
              <Text style={stylesDescricao.descricao}>{description.description}</Text>
              <Text style={stylesDescricao.curiosidadesTitle}>Curiosidades</Text>
              <Text style={stylesDescricao.curiosidades}>{description.curiosidades}</Text>
            </ScrollView>
          </View>
        </Animated.View>

        <Animated.View style={[stylesDescricao.btnContainer, { transform: [{ translateY: slideUpButton }] }]}>
          <TouchableOpacity
            onPress={toggleAnimations}
            style={stylesDescricao.btnDescricao}
          >
            <MaterialCommunityIcons
              name={viewUp ? "arrow-down-thin" : "arrow-up-thin"}
              size={50}
              color="white"
            />
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
}

export default DescricaoPage;
