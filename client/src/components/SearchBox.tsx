import React from 'react';
import { Image, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSearchedNews } from '../actions/index';
import NewsList from './NewsList';

interface SearchBoxProps {
  fetchSearchedNews?: Function;
}

interface SearchBoxState {
  text: string;
}

class SearchBox extends React.PureComponent<SearchBoxProps, SearchBoxState> {
  public constructor(props: SearchBoxProps) {
    super(props);
    this.state = {
      text: ''
    };
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
            console.log(event.target.value);
            this.setState({ text: event.target.value.trim() });
          }}
        />
        <InputGroup.Append>
          <Button
            disabled={!this.state.text}
            variant="outline-secondary"
            onClick={(event: any) => {
              if (this.props.fetchSearchedNews)
                this.props.fetchSearchedNews(this.state.text);
            }}
          >
            Go
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ fetchSearchedNews: fetchSearchedNews }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBox);
