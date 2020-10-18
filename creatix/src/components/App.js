/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import {
  AlbumDetailPage,
  AlbumsPage,
  ArtistsPage,
  LikedAlbumsPage,
  NotFoundPage
} from './Pages';
import Menu from './Menu/Menu';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Menu />
        </div>
        <Switch>
          <Route exact path="/" component={LikedAlbumsPage} />
          <Route exact path="/artists" component={ArtistsPage} />
          <Route exact path="/:artistId/albums" component={AlbumsPage} />
          <Route exact path="/album/:albumId" component={AlbumDetailPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
