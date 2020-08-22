import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

interface NewsProps {
  source: string;
  title: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
}

interface NewsState {}

const News: React.FC<NewsProps> & {} = (props: NewsProps) => {
  return (
    <Container onClick={handleClick}>
      <Row className="newstitle">
        <Col sm={9} md={9} lg={9}>
          <p
            style={{
              fontSize: '14px',
              marginBottom: '2px',
              color: '#696969'
            }}
          >
            {props.source}
          </p>
          <h5>{props.title}</h5>
          <p style={{ color: '#70757a' }}>{props.description}</p>
          <p style={{ fontSize: '12px', marginTop: '-10px', color: '#808080' }}>
            {props.publishedAt}
          </p>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Image src={props.urlToImage} width="144px" height="144px" rounded />
        </Col>
      </Row>
    </Container>
  );
};

const handleClick = () => {
  console.log('hello');
};

/*function mapStateToProps(state: any) {
  return {
    newsList: state.newsList
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ fetchNewsList: fetchNewsList }, dispatch);
}*/

export default /*connect(mapStateToProps, mapDispatchToProps)*/ News;
