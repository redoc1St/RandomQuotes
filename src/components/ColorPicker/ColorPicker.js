import React, { Component } from 'react';
import clsx from 'clsx';
import './ColorPicker.css'
const colors = ['#61dafb', '#F8A910', '#AAE4E6', '#EAE8E0', '#BDDFE3']


class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeColor: colors[0]
        }
    }

    onHandleChangeColor=(newColor)=>{
        this.setState({activeColor:newColor})   
        this.props.onChangeBackgroundColor(newColor,"từ thẳng con gửi lên từ colorPicker đến thg cha")
        // this.props.onChangeTextColor(newColor)
    }

    render() {
        const { activeColor } = this.state;

        return (
            <div className='ColorPicker'>
                {colors.map(color => {
                    const clsName= clsx({
                        'ColorPicker-item':true,
                        'active':activeColor===color
                    });

                    return (
                        (
                            <span
                                onClick={()=>this.onHandleChangeColor(color)}
                                key={color}
                                style={{ background: color }}
                                className={clsName} />
                        )
                    )
                })}
            </div>
        )
    }
}
export default ColorPicker;