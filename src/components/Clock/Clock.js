import React, { Component } from 'react';
class Clock extends Component {
    constructor(props) {     //cái này thường để khai bảo các biến status,...
        super(props);
        this.state = {
            count: 0
        }
    }

    componentWillUnmount() {
        console.log('unmount')
        clearInterval(this.interval)
    }

    componentDidMount() {
        console.log('vao interval')
        console.log('did mount');
        this.interval = setInterval(() => {
            this.setState(preState => {
                return {
                    count: preState.count + 1
                }
            })
        }, 1000);
    }

    render() {
        return (<div>{this.state.count}</div>)

    }
}
export default Clock;