import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const stylesDescricao = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },

  imgCarousel: {
    flex: 1,
  },

  btnContainer: {
    position: "absolute",
    bottom: "11%",
    left: "44%",
    zIndex: 100, // Garanta que o botão fique acima de outros elementos
  },

  btnVoltar: {
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "12%",
    top: "3%",
    left: "3%",
    zIndex: 100
  },

  btnDescricao: {
    borderRadius: 100,
    backgroundColor: "black",
  },

  svg: { 
    position: "absolute", 
    top: "-28%",    // Mantém o SVG na parte superior da Animated View
    width: '100%',
    height: '15%', // Ajuste a altura conforme necessário para garantir que ele apareça
    zIndex: 10,
  },  

  cardDescricao: {
    backgroundColor: 'white', // Fundo branco para contraste
    padding: 20,              // Espaçamento interno para o conteúdo
    position: 'absolute',     // Para garantir que a posição se ajuste dentro da view animada
    bottom: 0,               // Alinha o card com a parte superior
    width: '100%',            // Ocupa toda a largura da tela
    height: '100%',            // Ajuste conforme o design desejado
    shadowColor: '#000',      // Sombra para destacar o card
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,             // Sombra no Android
  },
  
  animatedView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: '50%',  // Inicialmente, só o SVG visível
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,  // Garante que a view esteja acima de outros componentes
  },
  

  titulo: {
    color: "black", 
    fontSize: 30, 
    fontFamily: "DisplayBold",
    textAlign: "center"
  },

  pais: {
    color: "black", 
    fontSize: 20, 
    fontFamily: "Noto", 
    textAlign: "center"
  },

  continente: {
    color: "black", 
    fontSize: 20, 
    fontFamily: "Noto", 
    textAlign: "center"
  },

  descricao: {
    color: "black", 
    fontSize: 17, 
    textAlign: "center", 
    fontFamily: "Noto"
  },

  curiosidadesTitle: {
    color: "black", 
    fontSize: 20, 
    textAlign: "center", 
    fontFamily: "Noto",
    fontWeight: "bold"
  },

  curiosidades: {
    color: "black", 
    fontSize: 17, 
    textAlign: "center", 
    fontFamily: "Noto"
  },
})
export default stylesDescricao;