import React, { Component } from 'react';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
import './App.css';

import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`)
      .then((response) => {
        console.log(response.data)
        this.setState({
          posts: response.data
        })
        // toast.success(`got posts`)
        console.log('got posts')
      })
      .catch((error) => {
        // toast.error(`didn't get posts`)
        console.log(`didn't get posts`)
      })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((response) => {
        console.log('put response', response)
        this.setState({ posts: response.data })
      })
      .catch((error) => {
        console.log(`put didn't work`, error)
      })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then((reuslts) => {
        this.setState({ posts: reuslts.data })
      })
      .catch((error) => {
        console.log(`delete didn't work`)
      })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text })
      .then((results) => {
        this.setState({ posts: results.data })
      })
      .catch((error)=>{
        console.log(`post didn't work`)
      })

  }

  render() {
    const { posts } = this.state;
    // let postDisplay = this.state.posts.map((post) => (
    //   <Post 
    //   updatePostFn={this.updatePost}
    //   key={post.id}
    //   text={post.text}
    //   date={post.date}
    //   id={post.id}
    //   />
    // ))
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            this.state.posts.map((post) => (
              <Post key={post.id}
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
                // createPostFn={this.createPost}
              />))
          }
          {/* {postDisplay} */}

        </section>
      </div>
    );
  }
}

export default App;

