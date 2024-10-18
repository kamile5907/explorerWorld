import { StyleSheet } from "react-native";

const stylesDescricao = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },

  imgCarousel: {
    flex: 1,
    borderRadius: 20,
  },

  btnVoltar: { 
    position: 'absolute',
    top: 40, 
    left: 20,
    borderRadius: 100,
    backgroundColor: "black"
  },

  svg: { 
    marginBottom: -1, 
    position: "absolute", 
    bottom: "9.5%" 
  },

  btnAbrirModal: { 
    bottom: 30, 
    alignItems: "center", 
    position: "absolute",
    backgroundColor: "black",
    borderRadius: 100
  },

  textoBtnAbrirModal: { 
    fontSize: 25, 
    fontWeight: "bold", 
    color: "black",
    position: "absolute",
  },

  btnFecharModal: { 
    position: 'absolute', 
    top: 40, 
    left: 20,
  },

  cardModal: { 
    position: 'absolute', 
    bottom: 0, 
    height: "50%", 
    width: "100%", 
    backgroundColor: "white", 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    padding: 7 
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
})
export default stylesDescricao;