import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { searchArtists } from '../../actions/musicLibraryActions';
import SearchBox from '../SearchBox/SearchBox';
import { ShimmerList, ListItem } from '../List';
import Heading from '../Heading/Heading';

class ArtistsPage extends PureComponent {
  state = {
    searchText: ''
  };

  handleSearch = () =>
    this.props.dispatch(searchArtists(this.state.searchText));

  handleShowAlbums = artistId => this.props.history.push(`/${artistId}/albums`);

  renderArtist = ({ id, name }) => (
    <ListItem iconName="ChevronRight" onClick={() => this.handleShowAlbums(id)}>
      <Persona text={name} size={PersonaSize.size40} />
    </ListItem>
  );

  render() {
    const { isFetching, artists } = this.props;
    return (
      <div>
        <Heading text="Artists" />
        <SearchBox
          value={this.state.searchText}
          onChange={searchText => this.setState({ searchText })}
          onClear={() => this.setState({ searchText: '' }, this.handleSearch)}
          onSubmit={this.handleSearch}
        />
        <ShimmerList
          showShimmer={isFetching}
          items={artists}
          onRenderCell={this.renderArtist}
        />
      </div>
    );
  }
}

ArtistsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = state => ({
  isFetching: state.musicLibrary.isFetching,
  artists: state.musicLibrary.artists
});

export default connect(mapStateToProps)(ArtistsPage);
