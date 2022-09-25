import './App.css';
import React, { Component } from 'react';
import QuoteBox from './components/QuoteBox/QuoteBox';
import Clock from './components/Clock/Clock';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Tags from './components/Tags/Tags';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowClock: true,
      activeColor: '#61dafb',
      // textColor: '#61dafb'
      activeTags: [],
    }
  }

  handleChangeTag = (tagName) => {
    this.setState(preState => {
      const { activeTags: oldActiveTags } = preState;

      const isActive = oldActiveTags.includes(tagName);

      if (isActive) {
        const newActiveTags = oldActiveTags.filter(t => t !== tagName);
        return {
          activeTags: newActiveTags
        }
      }
      return { activeTags: [...oldActiveTags, tagName] }
    })
  }

  toggleShowClock = () => {
    this.setState(preState => ({
      isShowClock: !preState.isShowClock
    }));
  }

  onChangeBackgroundColor = (newColor, message) => {
    console.log(message) //đây là từ thg con gửi lên thg cha theo cái này
    this.setState({ activeColor: newColor })
  }

  // onChangeTextColor= (newColor)=>{
  //   this.setState({textColor:newColor})
  // }

  render() {
    const { isShowClock, activeColor, activeTags } = this.state
    return (
      <div className="App" style={{ background: activeColor }}>
        <div className="App-Header">
          Random Quote Machine
        </div>
        {/* <h1> test thử thôi</h1> */}
        <div>
          <span>Show clock</span>
          <input type='checkbox' checked={isShowClock} onChange={this.toggleShowClock}></input>
        </div>
        {isShowClock ? <Clock></Clock> : null}
        <div className='App-content' style={{ color: activeColor }}>
          <QuoteBox
            activeTags={activeTags}
            mau={this.state.activeColor}  ></QuoteBox>
        </div>
        <div className='App-picker'>
          <ColorPicker onChangeBackgroundColor={this.onChangeBackgroundColor}></ColorPicker>
        </div>
        <div className='App-tag'>
          <Tags handleChangeTag={this.handleChangeTag}
            activeTags={activeTags}></Tags>
        </div>
      </div>
    );
  }


}

export default App;
