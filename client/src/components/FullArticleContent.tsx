import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface FullArticleContentProps {
  fullArticleContent: any;
}

interface FullArticleContentState {}

class FullArticleContent extends React.PureComponent<
  FullArticleContentProps,
  FullArticleContentState
> {
  public constructor(props: FullArticleContentProps) {
    super(props);
  }
  public render() {
    if (!this.props.fullArticleContent) {
      return (
        <div style={{ textAlign: 'center', height: '50vh', marginTop: '25vh' }}>
          <Spinner animation="grow" size="sm" />{' '}
          <Spinner animation="grow" size="sm" />{' '}
          <Spinner animation="grow" size="sm" />{' '}
        </div>
      );
    }
    return (
      <div
        style={{ fontSize: '18px', paddingTop: '15px', paddingBottom: '10px' }}
      >
        <p>{this.props.fullArticleContent?.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    fullArticleContent: state.fullArticleContent
  };
}

export default connect(mapStateToProps)(FullArticleContent);
