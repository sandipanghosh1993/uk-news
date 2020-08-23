import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FullArticleContent from './FullArticleContent';
import { resetContent } from '../actions';

interface FullArticleProps {
  fullArticle: any;
  resetContent?: Function;
}

interface FullArticleState {
  redirect: string;
}

class FullArticle extends React.PureComponent<
  FullArticleProps,
  FullArticleState
> {
  public constructor(props: FullArticleProps) {
    super(props);
    this.state = {
      redirect: ''
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <React.Fragment>
        <div style={{ float: 'left', margin: '10px' }}>
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => {
              this.setState({ redirect: '/' });
              if (this.props.resetContent) this.props.resetContent();
            }}
          >
            <Image
              src={require('../icons/back_icon.png')}
              width="25px"
              height="20px"
            />
          </Button>
        </div>
        <div className="outerdiv">
          <h1 style={{ textAlign: 'center' }}>
            <strong>UK News</strong>
          </h1>
          <hr />
          <Container>
            <h1>{this.props.fullArticle?.title}</h1>
            <p>
              Author: <i>{this.props.fullArticle?.author}</i>
            </p>
            <p
              style={{
                marginTop: '-15px',
                marginBottom: '12px',
                fontSize: '12px'
              }}
            >
              {this.props.fullArticle?.publishedAt}
            </p>
            <Image
              src={this.props.fullArticle?.urlToImage}
              width="100%"
              height="auto"
            />
            <FullArticleContent />
            <p>
              <i>Source:</i>{' '}
              <a href={this.props.fullArticle?.url} target="_blank">
                {this.props.fullArticle?.url}
              </a>
            </p>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    fullArticle: state.fullArticle
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ resetContent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);
