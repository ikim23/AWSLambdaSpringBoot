import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import {
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react/lib/MessageBar';
import { dismissErrorMessage } from '../../actions/musicLibraryActions';

class Menu extends PureComponent {
  getItems = () => [
    {
      key: 'artists',
      name: 'Artists',
      iconProps: {
        iconName: 'MusicNote'
      },
      onClick: () => this.props.history.push('/artists')
    },
    {
      key: 'liked',
      name: 'Liked albums',
      iconProps: {
        iconName: 'HeartFill'
      },
      onClick: () => this.props.history.push('/')
    }
  ];

  render() {
    const { dispatch, errorMessage } = this.props;
    return (
      <div style={{ paddingBottom: '1em' }}>
        <CommandBar items={this.getItems()} />
        {errorMessage && (
          <div style={{ marginTop: '.5em' }}>
            <MessageBar
              messageBarType={MessageBarType.warning}
              onDismiss={() => dispatch(dismissErrorMessage())}
            >
              {errorMessage}
            </MessageBar>
          </div>
        )}
      </div>
    );
  }
}

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  errorMessage: PropTypes.string
};

Menu.defaultProps = {
  errorMessage: ''
};

const mapStateToProps = state => ({
  errorMessage: state.musicLibrary.errorMessage
});

export default connect(mapStateToProps)(withRouter(Menu));
