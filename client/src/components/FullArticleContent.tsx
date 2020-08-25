import React from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

/**
 * @interface FullArticleContentProps
 *
 * Props received by FullArticleContent
 */
interface FullArticleContentProps {
  fullArticleContent: any;
}

/**
 * @function FullArticleContent
 *
 * Component to render full article text
 */
const FullArticleContent: React.FC<FullArticleContentProps> = (
  props: FullArticleContentProps
) => {
  if (!props.fullArticleContent) {
    return (
      <div style={{ textAlign: 'center', height: '50vh', marginTop: '25vh' }}>
        <Spinner animation="grow" size="sm" role="status" />{' '}
        <Spinner animation="grow" size="sm" role="status" />{' '}
        <Spinner animation="grow" size="sm" role="status" />{' '}
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
