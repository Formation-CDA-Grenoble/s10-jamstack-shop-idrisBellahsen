import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductPreview = ({ name, content, _createdAt, image, slug }) =>
  <Card>
    <Card.Header as="h3">
      {name}
    </Card.Header>
    <Card.Body>
      <Image src={image.url} fluid />
     <div> {content}</div>
      <div>
        <Link to={`/product/${slug}`}>
          <Button variant="primary">Read more...</Button>
        </Link>
      </div>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">
        Published on {new Date(_createdAt).toLocaleString('en-EN')}
      </small>
    </Card.Footer>
  </Card>
;

export default ProductPreview;
