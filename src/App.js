import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'f3c9f2a742564b049aae6a78b4221b32'
 });

const particlesSettings = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 700,
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      urlImage:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange =  (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn:false});
    } else if (route === 'home') {
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, ' ',height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({urlImage: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    )
    .then( (response) => {
      if(response) {
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({
              id: this.state.user.id
          })
        }).then(response=> response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user, {entries:count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  render(){
    const {isSignedIn, urlImage, route, box} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesSettings}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' ? 
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}  
            />
            <FaceRecognition box={box} urlImage={urlImage} />
          </div>
          : (
            route ==='signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;