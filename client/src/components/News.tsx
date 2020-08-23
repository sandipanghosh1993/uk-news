import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { displayFullArticle, fetchFullArticleContent } from '../actions/index';

interface NewsProps {
  source: string;
  title: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
  author: string;
  displayFullArticle: Function;
  fetchFullArticleContent: Function;
}

interface NewsState {
  redirect: string;
}

class News extends React.PureComponent<NewsProps, NewsState> {
  public constructor(props: NewsProps) {
    super(props);
    this.state = {
      redirect: ''
    };
  }

  public handleClick() {
    const { title, author, publishedAt, urlToImage, url } = this.props;
    this.props.displayFullArticle(title, author, publishedAt, urlToImage, url);
    this.props.fetchFullArticleContent(url);
    this.setState({ redirect: '/fullarticle' });
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Container onClick={this.handleClick.bind(this)}>
        <Row className="newstitle">
          <Col sm={9} md={9} lg={9}>
            <p
              style={{
                fontSize: '14px',
                marginBottom: '2px',
                color: '#696969'
              }}
            >
              {this.props.source}
            </p>
            <h5>{this.props.title}</h5>
            <p style={{ color: '#70757a' }}>{this.props.description}</p>
            <p
              style={{ fontSize: '12px', marginTop: '-10px', color: '#808080' }}
            >
              {this.props.publishedAt}
            </p>
          </Col>
          <Col sm={3} md={3} lg={3}>
            <Image
              src={this.props.urlToImage}
              width="144px"
              height="144px"
              rounded
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    { fetchFullArticleContent, displayFullArticle },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(News);
