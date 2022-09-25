import React, { Component } from 'react';
import './QuoteBox.css'
import axios from 'axios'
class QuoteBox extends Component {
    constructor(props) {     //cái này thường để khai bảo các biến status,...
        super(props);
        console.log('constructor');
        this.state = {
            status: 'idle',
            quote: null,
        }
    }

    fetchQuote = async () => {
        try {
            this.setState({ status: 'loading' });
            const res = await axios.get('https://api.quotable.io/random', {
                params: {
                    tags: this.props.activeTags.join(',')
                }
            });
            console.log(res.data.author)
            this.setState({
                status: 'success',
                quote: {
                    content: res.data.content,
                    author: res.data.author,
                    tags: res.data.tags
                }
            })
            console.log(res.data.tags)
        } catch (error) {
            this.setState({ status: 'Error' })
        }
    }

    componentDidMount() {      //lúc load lại ra quote mới
        this.fetchQuote()
    }

    componentDidUpdate(preProps) {
        if (preProps.activeTags !== this.props.activeTags) {
            console.log('vo day')
            this.fetchQuote()

        }
    }

    OnRefreshQuote = async () => {   // lúc ấn 'new quote' cx ra quote mới
        this.fetchQuote()
    }

    renderQuote = () => {
        const { status, quote } = this.state;
        const isIdle = status === 'idle';
        const isLoading = status === 'loading';
        const isError = status === 'error';
        const isSuccess = status === 'success';

        if (isIdle || isLoading) {
            return (
                <div>Loading...</div>
            )
        }
        if (isSuccess) {
            return (
                <>
                    <div className='QuoteBox-content'>
                        {quote.content}
                    </div>
                    <div className='QuoteBox-author'>
                        {quote.author}
                    </div>
                </>
            )
        }
        if (isError) {
            return (
                <div>
                    Something went wrong
                </div>
            )

        }
        return null;
    }

    // componentDidUpdate() {
    //     console.log('did update')
    //     console.log(this.state.status)      //success
    // }



    render() {
        console.log('render');

        return (
            <div className='QuoteBox'>
                {this.renderQuote()}
                {/* <div className='Quote-clock'>{this.state.count}</div> */}
                <div className='QuoteBox-refresh'>
                    <button className='QuoteBox-btn' style={{ backgroundColor: this.props.mau }} onClick={this.OnRefreshQuote}>New Quote </button>
                </div>
            </div>
        )
    }
}
export default QuoteBox