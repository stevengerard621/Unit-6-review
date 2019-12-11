import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PostDisplay from './PostDisplay';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            posts: [],
            image_url: ''
        }
    }

    handleInput = e => {
        this.setState({
            image_url: e.target.value
        })
    }

    addPost = () => {
        axios.post(`/api/post/${this.props.user.user_id}`, {image_url: this.state.image_url}).then(res => {
            this.setState({
                posts: res.data,
                image_url: ''
            })
        }).catch(err => console.log(err))
    }

    deletePost = id => {
        axios.delete(`/api/post/${id}/${this.props.user.user_id}`).then(res => {
            this.setState({
                posts: res.data
            })
        })
    }


    componentDidMount(){
        axios.get(`/api/posts/${this.props.user.user_id}`).then(res => {
            this.setState({posts: res.data})
        })
        .catch(err => console.log(err))
    }

    render(){
        const mappedPosts = this.state.posts.map((post, index) => {
            return (
                <PostDisplay deletePost={this.deletePost} key={index} post={post}/>
            )
        })
        return(
            <div>
                <input onChange={e => this.handleInput(e)}value={this.state.image_url} placeholder='Drop Image here Bro' type="text"/>
                <button onClick={this.addPost}>SUBMIT POST</button>
                {mappedPosts}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}
///CONNECT ALLOWS US TO CONNECT TO STORE////
export default connect(mapStateToProps)(Dashboard);