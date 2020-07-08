import React, {Component, useState} from 'react';
import {Alert, Linking} from 'react-native';
import URL from 'url-parse';

import {
  CLIENT_ID,
  AUTHORIZE_URL,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  CODE_CHALLENGE_METHOD, ROADMAP_BASEURL,
} from 'react-native-dotenv';
import {connect} from 'react-redux';
import PKCE from '../../weos/auth/pkce';
import {setToken, setUser} from '../../weos/model/commands';
import axios from "axios";

const mapStateToProps = (state) => ({
  user: state.weos.user,
  token: state.weos.token,
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
      this.handler = this.props.user
        ? this.handleLogoutUrl
        : this.handleOpenUrl;
    }

    componentDidMount() {
      Linking.addEventListener('url', this.handler);
      Linking.getInitialURL().then((url) => {
        if (url) {
          this.handler();
        }
      });
    }

    componentWillUnmount() {
      Linking.removeEventListener('url', this.handler);
    }

    /**
     * Handle Connecting to WEOS
     * @param {string} screen - Screen to go to after successful login
     */
    handleWeosConnect = (screen) => {
      this.setState({screen});
      Linking.openURL(PKCE.authorizeURL());
    };


    handleWeosLogout = () => {
      console.log('Logging Out');
      console.log(PKCE.logoutURL(this.props.token.id_token))
      axios
        .get(PKCE.logoutURL(this.props.token.id_token), )
          .then((res) => {
             console.log('Success', res);
            this.props.setToken(null);
            this.props.setUser(null);
            this.props.navigation.goBack();
          })
          .catch((error) => {
             console.log('Error', error);
        });
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
        this.accountCreation();
        return;
      }

      try {
        this.setState({loading: true});
        let authToken = await PKCE.exchangeAuthCode(code, state);
        let user = await PKCE.getUserInfo(authToken);
        user.sub = JSON.parse(user.sub);
        this.props.setToken(authToken);
        this.props.setUser(user);
        this.setState({loading: false});
        this.props.navigation.navigate(this.state.screen);
      } catch (error) {
        console.log(error);
        this.setState({loading: false});

        Alert.alert(
          'WeOs Connect',
          'An Error occurred during login, please try again later',
          [
            {
              text: 'Ok',
              onPress: () => console.log('Please try again later'),
            },
          ],
          {cancelable: false},
        );
      }
    };

    handleLogoutUrl = () => {
      this.setState({loading: true});
      this.props.setToken(null);
      this.props.setUser(null);
      this.setState({loading: false});
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          handleConnect={this.handleWeosConnect}
          handleLogout={this.handleWeosLogout}
          loading={this.state.loading}
          componentState={this.componentState}
        />
      );
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(ConnectHOC);
};

export default connectWeos;
