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
import {connect} from 'react-redux';
import PKCE from '../../weos/auth/pkce';
import {setToken, setUser} from '../../weos/model/commands';

const mapStateToProps = (state) => ({
  user: state.weos.user,
});

const mapDispatchToProps = {
  setToken,
  setUser,
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
        screen: null,
      };
      this.componentState = {user: this.props.user};
    }

    componentDidMount() {
      Linking.addEventListener('url', this.handleOpenUrl);
      Linking.getInitialURL().then((url) => {
        if (url) {
          this.handleOpenUrl(url, 'Complete');
        }
      });
    }

    componentWillUnmount() {
      Linking.removeEventListener('url', this.handleOpenUrl);
    }

    /**
     * Handle Connecting to WEOS
     * @param {string} screen - Screen to go to after successful login
     */
    handleWeosConnect = (screen) => {
      this.setState({
        loading: true,
      });
      this.setState({screen});
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
    handleOpenUrl = async (urlString) => {
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
        this.props.navigation.navigate(this.state.screen);
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
          loading={this.state.loading}
          componentState={this.componentState}
        />
      );
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(ConnectHOC);
};

export default connectWeos;
