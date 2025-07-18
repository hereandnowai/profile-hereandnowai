import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.hereandnowai.com/wp-json/wp/v2/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Posts from hereandnowai.com</h1>
      </header>
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
