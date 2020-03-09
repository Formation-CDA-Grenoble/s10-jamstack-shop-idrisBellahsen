import React, { Component } from 'react';
import Axios from 'axios';
import { Image } from 'react-bootstrap';

const makeQuery = (slug) => `
query MyQuery {
  product(filter: {slug: {eq: "${slug}"}}) {
    _createdAt
    id
    name
    content
    slug
    image {
        url
      }
    
  }
}`;

export default class Product extends Component {
  state = {
    data: null,
  }

  componentDidMount = () => {
    const slug = this.props.match.params.slug;
    const query = makeQuery(slug);

    Axios.post(
      // GraphQL endpoint
      'https://graphql.datocms.com/',
      // Requête GraphQL
      { query },
      // Options pour authentifier notre requête
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_DATOCMS_API_KEY}`,
        } 
      },
    )
    .then(response => {
      if (response.data.hasOwnProperty('errors')) {
        for (let error of response.data.errors) {
          console.error('Error while querying GraphQL API:', error.message);
        }
      } else {
        const { data } = response.data;
        this.setState({ data });
      }
    })
    .catch(error => console.error(error));
  }

  render = () => {
    const { data } = this.state;

    if (data === null) {
      return <div>Loading...</div>;
    }

    const { product } = data;

    return (
      <article>
        <h1>{product.name}</h1>
        <Image src={product.image.url} fluid />
        <p>{product.content}</p>
      </article>
    );
  }
}
