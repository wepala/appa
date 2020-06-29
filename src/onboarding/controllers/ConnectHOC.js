import React, {Component} from 'react';
import {Alert, Linking} from 'react-native';
import URL from 'url-parse';
import {
  CLIENT_ID,
  AUTHORIZE_URL,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  CODE_CHALLENGE_METHOD,
} from 'react-native-dotenv';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PKCE from '../../weos/auth/pkce';
import {setToken, setUser} from '../../weos/model/commands';

const mapStateToProps = (state) => ({
  user: state.weos.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setToken, setUser}, dispatch);
};

const connectWeos = (WrappedComponent) => {
  const ConnectHOC = class extends Component {
    constructor(props) {
      super(props);
      PKCE.config.setVars({
        CLIENT_ID,
        AUTHORIZE_URL,
        REDIRECT_URI,
        RESPONSE_TYPE,
        SCOPE,
        CODE_CHALLENGE_METHOD,
      });
      this.state = {
        loading: false,
      };

      this.componentState = {user: this.props.user};
    }

    handleWeosConnect = () => {
      this.setState({
        loading: true,
      });
      Linking.openURL(PKCE.authorizeURL());
    };

    accountCreation = () => {
      Alert.alert(
        'Account Creation',
        'Do you want to create a new account with this email address?',
        [
          {
            text: 'Cancel',
            onPress: () => Linking.openURL(PKCE.createAccountURL(false)),
          },
          {
            text: 'Confirm',
            onPress: () => Linking.openURL(PKCE.createAccountURL(true)),
          },
        ],
        {cancelable: false},
      );
    };

    /**
     * Handle PKCE URL Opening
     *
     * @param {string} screen - Screen name to navigate to when complete
     * @param {string} urlString - Url returned by PKCE
     */
    handleOpenUrl = async (screen, urlString) => {
      const url = new URL(urlString.url, true);
      const {code, state, confirm_creation} = url.query;

      if (confirm_creation) {
        this.setState({
          loading: false,
        });
        this.accountCreation();
        this.setState({
          loading: false,
        });
        return;
      }

      try {
        let authToken = await PKCE.exchangeAuthCode(code, state);
        let user = await PKCE.getUserInfo(authToken);
        user.sub = JSON.parse(user.sub);
        this.props.setToken(authToken);
        this.props.setUser(user);
        this.setState({
          loading: false,
        });
        this.props.navigation.navigate(screen);
      } catch (error) {
        console.log('Error occurred ', error);
        this.setState({
          loading: false,
        });
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          handleConnect={this.handleWeosConnect}
          handleOpenUrl={this.handleOpenUrl}
          loading={this.state.loading}
          componentState={this.componentState}
        />
      );
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(ConnectHOC);
};

export default connectWeos;
