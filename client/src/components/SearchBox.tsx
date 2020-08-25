import React from 'react';
import { Image, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchSearchedNews,
  fetchNewsList,
  setSearchText
} from '../actions/index';
import NewsList from './NewsList';

/**
 * @interface SearchBoxProps
 *
 * Props received by SearchBox
 */
interface SearchBoxProps {
  fetchSearchedNews: Function;
  fetchNewsList: Function;
  setSearchText: Function;
  searchText: any;
}

/**
 * @interface SearchBoxState
 *
 * Props set in SearchBox state
 */
interface SearchBoxState {
  text: string;
}

/**
 * @class SearchBox
 *
 * Component to render a search field to filter out news based on search text
 */
class SearchBox extends React.PureComponent<SearchBoxProps, SearchBoxState> {
  public constructor(props: SearchBoxProps) {
    super(props);
    this.state = {
      text: props.searchText.text
    };
  }

  public componentDidUpdate() {
    // populate the news list with latest news when search text is cleared
    if (!this.state.text && this.props.searchText.text) {
      this.props.fetchNewsList();
      this.props.setSearchText();
    }
  }

  public handleButtonPress(event: any) {
    event.preventDefault();
    if (this.state.text !== this.props.searchText.text) { // check to prevent multiple backend calls if text is same
      this.props.fetchSearchedNews(this.state.text);
      this.props.setSearchText(this.state.text);
    }
  }

  public render() {
    return (
      <InputGroup className="searchbox">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <Image
              src={require('../icons/search_icon.png')}
              width="24px"
              height="24px"
            />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Search..."
          type="search"
          aria-label="search"
          value={this.state.text}
          onChange={(event: any) => {
            this.setState({ text: event.target.value.trim() });
          }}
          onKeyPress={(event: any) => {
            if (event.charCode === 13 && event.target.value.trim()) {
              this.handleButtonPress(event);
            }
          }}
        />
        <InputGroup.Append>
          <Button
            disabled={!this.state.text}
            variant="outline-secondary"
            onClick={this.handleButtonPress.bind(this)}
          >
            Go
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    searchText: state.searchText
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    { fetchSearchedNews, fetchNewsList, setSearchText },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
