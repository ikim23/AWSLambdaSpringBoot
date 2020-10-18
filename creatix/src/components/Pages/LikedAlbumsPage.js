import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { fetchLikedAlbums } from '../../actions/musicLibraryActions';
import { ShimmerList, ListItem } from '../List';
import Heading from '../Heading/Heading';

class LikedAlbumsPage extends PureComponent {
  componentDidMount() {
    const { dispatch, likedAlbumIds } = this.props;
    dispatch(fetchLikedAlbums(likedAlbumIds));
  }

  handleShowAlbumDetail = albumId =>
    this.props.history.push(`/album/${albumId}`);

  renderAlbum = ({ id, name, artistName, imageUrl }) => (
    <ListItem
      iconName="ChevronRight"
      onClick={() => this.handleShowAlbumDetail(id)}
    >
      <Persona
        text={name}
        secondaryText={artistName}
        imageUrl={imageUrl}
        size={PersonaSize.size40}
      />
    </ListItem>
  );

  render() {
    const { isFetching, albums } = this.props;
    return (
      <div>
        <Heading text="Liked albums" />
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

LikedAlbumsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      artistName: PropTypes.string,
      imageUrl: PropTypes.string
    })
  ).isRequired,
  likedAlbumIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

const mapStateToProps = state => ({
  isFetching: state.musicLibrary.isFetching,
  albums: state.musicLibrary.albums,
  likedAlbumIds: state.musicLibrary.likedAlbumIds
});

export default connect(mapStateToProps)(LikedAlbumsPage);
