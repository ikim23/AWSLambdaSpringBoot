import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import {
  fetchAlbums,
  toggleAlbumLike
} from '../../actions/musicLibraryActions';
import { ShimmerList, ListItem } from '../List';
import Heading from '../Heading/Heading';

class AlbumsPage extends PureComponent {
  componentDidMount() {
    const { dispatch, artistId } = this.props;
    dispatch(fetchAlbums(artistId));
  }

  componentDidUpdate() {
    this.list.forceUpdate();
  }

  renderAlbum = ({ id, name, released, imageUrl }) => {
    const { likedAlbumIds, dispatch } = this.props;
    const isLiked = likedAlbumIds.includes(id);
    return (
      <ListItem
        iconName={isLiked ? 'HeartFill' : 'Heart'}
        iconStyle={{ color: isLiked ? 'red' : undefined }}
        onClick={() => dispatch(toggleAlbumLike(id))}
      >
        <Persona
          text={name}
          secondaryText={released}
          imageUrl={imageUrl}
          size={PersonaSize.size40}
        />
      </ListItem>
    );
  };

  render() {
    const { isFetching, albums, artistName } = this.props;
    return (
      <div>
        <Heading text={artistName} />
        <ShimmerList
          ref={ref => (this.list = ref)}
          showShimmer={isFetching}
          items={albums}
          onRenderCell={this.renderAlbum}
        />
      </div>
    );
  }
}

AlbumsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  artistId: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      released: PropTypes.string,
      imageUrl: PropTypes.string
    })
  ).isRequired,
  likedAlbumIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

const mapStateToProps = (state, props) => ({
  artistId: props.match.params.artistId,
  artistName: state.musicLibrary.artistName,
  isFetching: state.musicLibrary.isFetching,
  albums: state.musicLibrary.albums,
  likedAlbumIds: state.musicLibrary.likedAlbumIds
});

export default connect(mapStateToProps)(AlbumsPage);
