import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import lightOffImage from './assets/icons/eco-light-off.png';
import lightOnImage from './assets/icons/eco-light.png';
import dioWhiteLogo from './assets/icons/logo-dio-white.png';
import dioLogo from './assets/icons/logo-dio.png';
import Torch from "react-native-torch";
import RNShake from 'react-native-shake';

const App = () => {
  // atraés do useState (verificacao de estado) + 
  // iremos alterar a variavel toggle para usar como um evento que define quando a lanterna estará +
  // desligada ou ativa (inicializado como false -> desligado)
  // Este toggle impacta tanto para a lanterna em si quanto para as imagens utilizadas e suas respectivas classes de estilo
  const [toggle, settoggle] = useState(false);

  // este handle é utilizado para lidar com a alteracao do toggle (faz a utilizacao do useState acima, setando true or false no toggle) 
  // logo abaixo existem duas utilizacoes que estao explicadas logo acima do codigo utilizador #utilizador 1 / #utilizador 2
  const handleChangeToggle = () => {settoggle(((oldToggle) => !oldToggle))};


  useEffect(() => { 
    // Aqui sera ligada a lanterna
    // chamada do torch 
    // O use effect irá escutar a alteracao de eventos monitorando o estado atual da var toggle e executando sua funcao de callback
    // assim chamando o torch para realizar a alteracao de estado da lanterna conforme o estado atual do toggle (true or false)
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //#utilizador 2 - Este evento ficará ativo aguardando (através da lib RNShake) a acao do usuario de 'chacoalhar/balançar' o celular.
    // e assim alterar o estado do toggle para true or false e acionar a ativacao ou nao da lanterna
    const subscription = RNShake.addListener(() => settoggle(((oldToggle) => !oldToggle)));

    // Quando a lanterna estiver ativa e o usuario chacoalhar novamente o subscription sera removido alterando o toggle para false e desativando a lanterna.
    // essa funcao deve ser chamada quando o componente for DESMONTADO!
    return () => subscription.remove();

  }, [])
  
  // #utilizador 1 - o toggle esta sendo alterado atraves do listener de eventos 'onPress' que escuta o evento de toque na tela
  // logo quando a tela é tocada o evento onPress executa a acao discriminada para si
  return  <View style={toggle ? style.containerLight : style.container}> 
            <TouchableOpacity onPress={handleChangeToggle}>
              <Image 
                style = {toggle ? style.litghtingOn : style.litghtingOff }
                source= {toggle ? lightOnImage : lightOffImage}
              />
              <Image 
                style = { style.dioLogo }
                source= {toggle ? dioLogo : dioWhiteLogo}
              />                   
            </TouchableOpacity>
          </View>;
}

export default App;

const style = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  litghtingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150
  },
  litghtingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
    tintColor: 'white'
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  }  
});
