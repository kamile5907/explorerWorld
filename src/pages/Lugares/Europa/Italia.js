import React, { useRef, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  Pressable
} from "react-native";
import stylesPaises from "../../../styles/StylePaises";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;
const SPACING = 20;

const places= [
  {
    id: "Torre de Pisa",
    source: require("../../../images/Europa/italia1.jpg"),
    title: "Torre de Pisa",
    carousel: [
    {img: require("../../../images/Europa/pisa1.jpg")},
    {img: require("../../../images/Europa/pisa2.jpg")},
    {img: require("../../../images/Europa/pisa3.jpg")},
    {img: require("../../../images/Europa/pisa4.jpg")},
 ] },
  {
    id: "Coliseu",
    source: require("../../../images/Europa/italia2.jpg"),
    title: "Coliseu",
    carousel: [
      {img: require("../../../images/Europa/coliseu1.jpg")},
      {img: require("../../../images/Europa/coliseu2.jpg")},
      {img: require("../../../images/Europa/coliseu3.jpg")},
      {img: require("../../../images/Europa/coliseu4.jpg")},
    ]
  },
  {
    id: "Catedral de Milão",
    source: require("../../../images/Europa/italia3.jpg"),
    title: "Catedral de Milão",
    carousel: [
      {img: require("../../../images/Europa/catedral1.jpg")},//
      {img: require("../../../images/Europa/catedral2.jpg")},
      {img: require("../../../images/Europa/catedral3.jpg")},
      {img: require("../../../images/Europa/catedral4.jpg")},
    ]
  },
  {
    id: "Ponte dos Suspiros",
    source: require("../../../images/Europa/italia4.jpg"),
    title: "Ponte Dos Suspiros",
    carousel: [
      {img: require("../../../images/Europa/ponte1.jpg")},
      {img: require("../../../images/Europa/ponte2.jpg")},
      {img: require("../../../images/Europa/ponte3.jpg")},
      {img: require("../../../images/Europa/ponte4.jpg")},
    ]
  },
  {
   
    id: "Panteão",
    source: require("../../../images/Europa/italia5.jpg"),
    title: "Panteão",
    carousel: [
      {img: require("../../../images/Europa/panteao1.jpg")},
      {img: require("../../../images/Europa/panteao2.jpg")},
      {img: require("../../../images/Europa/panteao3.jpg")},
      {img: require("../../../images/Europa/panteao4.jpg")},
    ]
  },
];

const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();



  const [font] = useFonts({
    Pacifico: require("../../../fonts/Pacifico-Regular.ttf"),
    Bebas: require("../../../fonts/Bebas.ttf"),
    Noto: require("../../../fonts/NotoSherif.ttf"),
    BonaNova: require("../../../fonts/BonaNovaItalic.ttf"),
    BonaNovaBold: require("../../../fonts/BonaNovaBold.ttf"),
    Lilita: require("../../../fonts/LilitaOne.ttf"),
    Display: require("../../../fonts/DisplayExtraBoldItalic.ttf"),
    DisplayBold: require("../../../fonts/DisplayBoldItalic.ttf"),
    DisplayItalic: require("../../../fonts/DisplayItalic.ttf"),
  });
  if (!font) {
    return null;
  }


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



 return(
  <View>
         
    <View style={{height: 1000}}>
      <ImageBackground 
       resizeMode="cover"
       source={require("../../../images/Europa/frança2.jpg")}
       blurRadius={5}>
    
    <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "10%",
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={35}
                  color="white"
                />
              </TouchableOpacity>
              <View style={{ height: 50}}>
              <Text style={{fontFamily: "DisplayItalic", fontSize: 40, textAlign: "center"}}>Pontos Turisticos</Text>
              </View>
            
   <View style={{height: 900, justifyContent:'center', alignItems:'center'}}>
    <View style={{height:240}}></View>
        <Animated.FlatList
              data={places}
              keyExtractor={(item) => item.title}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={ITEM_WIDTH + SPACING * 2}
              decelerationRate="fast"
              bounces={true}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              contentContainerStyle={{ paddingHorizontal: SPACING }}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * (ITEM_WIDTH + SPACING * 2),
                  index * (ITEM_WIDTH + SPACING * 2),
                  (index + 1) * (ITEM_WIDTH + SPACING * 2),
                ];
  
                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.9, 1, 0.9],
                  extrapolate: "clamp",
                });
  
                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.6, 1, 0.6],
                  extrapolate: "clamp",
                });
  
                const rotate = scrollX.interpolate({
                  inputRange,
                  outputRange: ["-8deg", "0deg", "8deg"],
                  extrapolate: "clamp",
                });
                return (
                  <Animated.View
                    style={[  styles.itemContainer,{transform: [{ scale }, { rotate }],opacity,
                    opacity: itemAnimations[index], }]}
                  >

                        <TouchableOpacity>
                        <Pressable onPress={() => navigation.navigate('DescriptionPage', { id: item.id, carousel: item.carousel })}>
                        <View style={{ width: 330, height: 400, alignItems: "center", justifyContent: "center", backgroundColor:'white'   }}>
                    <Image source={item.source} style={styles.image} />
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 20,
                        fontFamily: "Display",
                      }}
                    >
                      {item.title}
                    </Text>

                        </View>
                  </Pressable>
                      </TouchableOpacity>
                      
                    </Animated.View>
                );
              }}
            />
          
        </View>
        </ImageBackground>
        </View>
   </View>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  carouselContainer: {
    justifyContent: "center",
    height: 900,
  },
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  spacer: {
    height: "20%",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING,
    overflow: "hidden",
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    width: "90%",
    height: "80%",
 
  },
});

export default Carousel;