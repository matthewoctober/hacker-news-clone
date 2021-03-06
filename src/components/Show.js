import React from "react";
import { Link } from "react-router-dom"
import LoadButton from "./LoadButton";
import PostListing from "./PostListing";
class Show extends React.Component {

  componentDidMount() {
    this.props.prepStorage('show');
  }

  componentDidUpdate() {
    this.props.updateStorage();
  }

  componentWillUnmount() {
    this.props.unbindStorage();
  }

  render() {
    const { page, posts } = this.props.state;
    const pagination = posts.show.length > 0 ? <p>More</p> : null;
    const truePosts = posts.show.filter(post => post);
    return (
      <div className="main">
        <Link
        exact='true'
        className="refresh"
        to='/show'
        >
          <LoadButton pullPosts={() => this.props.pullPosts('show')}/>
        </Link>
        <div className='post-wrapper container'>
          <ul className="post-wrapper">
            { this.props.loading('show') }
            {Object.entries(truePosts).map(post => (
              <PostListing key={post[1]["id"]}
              index={Number(post[0]) + 1}
              details={post[1]}
              id={post[1]["id"]}
              state={this.props.state}/>
            ))}
          </ul>
          <Link
            className='pagination'
            style={{ textDecoration: "none" }}
            exact='true' to={`/show/page-${page + 1}`}
            onClick={() => this.props.paginate('show')}
            >
              {pagination}
            </Link>
        </div>
      </div>
    );
  }
}

export default Show;
