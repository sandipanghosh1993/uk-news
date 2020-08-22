import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNewsList } from '../actions/index';
import News from './News';

interface NewsListProps {
  fetchNewsList?: Function;
  newsList?: any;
}

interface NewsListState {}

class NewsList extends React.PureComponent<NewsListProps, NewsListState> {
  public constructor(props: NewsListProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    if (this.props.fetchNewsList) this.props.fetchNewsList();
  }

  // public static getDerivedStateFromProps(prevProps: any, nextState: any) {
  //   console.log('-------->', prevProps.newsList);
  //   return null;
  // }

  public render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />;
    // }
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
