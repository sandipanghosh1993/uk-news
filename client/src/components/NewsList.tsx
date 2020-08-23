import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNewsList } from '../actions/index';
import News from './News';

interface NewsListProps {
  fetchNewsList?: Function;
  newsList?: any;
}

class NewsList extends React.PureComponent<NewsListProps, {}> {
  public constructor(props: NewsListProps) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.fetchNewsList) {
      this.props.fetchNewsList();
    }
  }

  public render() {
    return (
      <React.Fragment>
        {this.props.newsList?.data?.map((el: any, index: number) => {
          return (
            <div key={index}>
              <News
                source={el.source.name}
                title={el.title}
                description={el.description}
                publishedAt={el.publishedAt}
                urlToImage={el.urlToImage}
                url={el.url}
                author={el.author}
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    newsList: state.newsList
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ fetchNewsList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
