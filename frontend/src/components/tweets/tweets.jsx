import React from "react";
import { withRouter } from "react-router-dom";
import TweetBox from "./tweet_box";

class Tweet extends React.Component {
    constructor(props) {
        super(props);

        this.state = { tweets: [], fetched: false };
    }

    componentWillMount() {
        this.props.fetchTweets();
    }

    componentWillReceiveProps(newState) {
        this.setState({ tweets: newState.tweets, fetched: true });
    }

    render() {
        if (!this.state.fetched) return null;
        if (this.state.tweets.length === 0) {
            return <div>There are no Tweets</div>;
        } else {
            return (
                <div>
                    <h2>All Tweets</h2>
                    {this.state.tweets.map(tweet => (
                        <TweetBox key={tweet._id} text={tweet.text} />
                    ))}
                </div>
            );
        }
    }
}

export default withRouter(Tweet);
