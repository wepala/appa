import React from 'react';
import moment from 'moment';
import {
  Text,
  Card,
  Layout,
  StyleService,
  Avatar,
  Button,
  useStyleSheet,
} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

export default ({item, index, onPress}) => {
  const styles = useStyleSheet(themedStyles);
  let loggedDate = moment(item.startTime).format('Do MMM, YYYY');
  let loggedTime = moment(item.startTime).format('h:mm:ss a');
  return (
    <Layout style={styles.item}>
      <Card testID={'TaskItem'} style={styles.card} onPress={onPress}>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Avatar
              testID="UserAvatar"
              style={styles.avatar}
              shape="round"
              size="medium"
              // source={{
              //   uri:
              //     {user.avatarUrl},
              // }}
              source={require('../../../../assets/images/avatar.png')}
            />
          </Layout>
          <Layout style={styles.column2}>
            <Text testID="LogTitle" category="h6">
              {item.task.title}
            </Text>
            <Text testID="LogDate" category="s2" appearance="hint">
              {loggedDate}
            </Text>
            <Text testID="LogTime" category="s2" appearance="hint">
              {loggedTime}
            </Text>
          </Layout>

          <Layout style={styles.column3}>
            <Button
              testID={'TaskButton'}
              style={styles.buttonOptions}
              status="basic"
              size="tiny"
              appearance="ghost"
              onPress={() => {
                console.log('The Log options?', item);
              }}>
              <FontAwesomeIcon icon={faEllipsisV} color="#777" />
            </Button>
          </Layout>
        </Layout>
      </Card>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  item: {
    marginVertical: 16,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 0,

    shadowColor: '#777',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },

  card: {
    borderRadius: 7,
    borderColor: 'transparent',
    borderWidth: 0,
    flex: 1,
    elevation: 5,
  },

  row: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  column1: {
    width: 'auto',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  column2: {
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    flex: 1,
    marginRight: 8,
  },
  column3: {
    width: 'auto',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  buttonOptions: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 4,
  },
});
