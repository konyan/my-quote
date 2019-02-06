import "./index.scss";
import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'


class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSelect: 101
        }
    }

    componentDidMount() {

    }

    nextQuote = () => {
        const { quotes } = this.props;
        const { currentSelect } = this.state;

        while (true) {
            let index = Math.floor(Math.random() * quotes.length) + 1;
            if (index !== currentSelect) {
                this.setState({
                    currentSelect: index
                });
                break;
            }
        }

    }

    shareTweet = () => {
        const { quotes } = this.props;
        const { currentSelect } = this.state;

        let link = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quotes[currentSelect]['quote'] + '" ' + quotes[currentSelect]['author']);
        window.open(link, "_blank");
        console.log("click");
    }

    // sharefb = () => {
    //     const { quotes } = this.props;
    //     const { currentSelect } = this.state;
    //     FB.ui({
    //         method: 'share',
    //         display: 'popup',
    //         href: 'https://developers.facebook.com/docs/',
    //     }, function (response) { });
    // }

    render() {
        const { quotes } = this.props;
        const { currentSelect } = this.state;

        return (
            <main>
                <div className="terminal">
                    <div className="terminal__header">
                        <ul>
                            <li className="header__btn header__btn--close"></li>
                            <li className="header__btn header__btn--minimize"></li>
                            <li className="header__btn header__btn--maximize"></li>
                        </ul>
                        <a className="button button--next" id="new-quote" onClick={this.nextQuote}>NEXT</a>
                    </div>
                    <div className="terminal__body" id="quote-box">
                        <h3 id="author" className="body body__author">{quotes[currentSelect]['author']}</h3>
                        <p id="text" className="body body__quote">
                            {quotes[currentSelect]['quote']}
                        </p>
                    </div>
                </div>
                <div className="footer">
                    {/* <img src="/static/ic_facebook.svg" alt="facebook" className="social social--fb" onClick={this.sharefb} /> */}
                    <img src="/static/ic_twitter.svg" alt="twitter" className="social social--tw" onClick={this.shareTweet} />
                </div>
            </main>
        )
    }

}

Index.getInitialProps = async ({ req }) => {
    const res = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    const json = await res.json()
    return { quotes: json.quotes }
}

export default Index