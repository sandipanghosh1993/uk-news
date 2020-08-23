import React from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

interface FullArticleContentProps {
  fullArticleContent: any;
}

const FullArticleContent: React.FC<FullArticleContentProps> = (
  props: FullArticleContentProps
) => {
  if (!props.fullArticleContent) {
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
      style={{
        fontSize: '18px',
        paddingTop: '15px',
        paddingBottom: '10px',
        textAlign: 'justify'
      }}
    >
      <p>{props.fullArticleContent?.content}</p>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    fullArticleContent: state.fullArticleContent
  };
}

export default connect(mapStateToProps)(FullArticleContent);
