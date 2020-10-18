import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { fetchAlbumDetail } from '../../actions/musicLibraryActions';

class AlbumDetailPage extends PureComponent {
  componentDidMount() {
    const { dispatch, albumId } = this.props;
    dispatch(fetchAlbumDetail(albumId));
  }

  render() {
    const { name, artistName, released, imageUrl } = this.props;
    return (
      <Persona
        text={artistName}
        secondaryText={name}
        tertiaryText={released}
        imageUrl={imageUrl}
        size={PersonaSize.size100}
      />
    );
  }
}

AlbumDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  albumId: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  name: PropTypes.string,
  released: PropTypes.string,
  imageUrl: PropTypes.string,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
  ...state.musicLibrary.albumDetail,
  albumId: props.match.params.albumId,
  isFetching: state.musicLibrary.isFetching
});

export default connect(mapStateToProps)(AlbumDetailPage);
