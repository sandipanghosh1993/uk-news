import React from 'react';
import { Image, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSearchedNews, fetchNewsList } from '../actions/index';
import NewsList from './NewsList';

/**
 * @interface SearchBoxProps
 *
 * Props received by SearchBox
 */
interface SearchBoxProps {
  fetchSearchedNews?: Function;
  fetchNewsList?: Function;
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
      text: ''
    };
  }

  public componentDidUpdate() {
    if (!this.state.text && this.props.fetchNewsList) {
      this.props.fetchNewsList();
    }
  }

  public handleButtonPress(event: any) {
    event.preventDefault();
    if (this.props.fetchSearchedNews) {
      this.props.fetchSearchedNews(this.state.text);
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

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ fetchSearchedNews, fetchNewsList }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBox);
