import React, {useState} from 'react';
import {
  Text,
  Card,
  Layout,
  Button,
  CheckBox,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

const BacklogItem = ({item, index, onPress}) => {
  const [checked, toggleCheck] = useState(false);
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout style={styles.item}>
      <CheckBox
        testID={'TaskCheckBox'}
        style={styles.checkBox}
        status="primary"
        checked={checked}
        onChange={() =>
          onComplete(item.id, !checked).then(toggleCheck(!checked))
        }
      />
      <Card testID={'TaskItem'} style={styles.card} onPress={onPress}>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text
              numberOfLines={1}
              category="h6"
              style={checked && styles.checked.title}>
              {item.title}
            </Text>
            <Text category="s2" appearance="hint" style={styles.timeSpent}>
              Time Spent:{' '}
            </Text>
          </Layout>

          <Layout style={styles.column2}>
            <Button
              testID={'TaskButton'}
              style={styles.buttonStart}
              status="warning"
              size="tiny"
              appearance="outline"
              onPress={() => {
                console.log('Start Task from backlog?', item);
                // onStart(item.id);
                // setCurrentIndex(index);
              }}>
              <FontAwesomeIcon icon={faCalendarAlt} color="#Ff985f" />
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
    marginLeft: 16,
    borderRadius: 7,
    borderColor: '$background-basic-color-1',
    borderWidth: 0,
    borderLeftWidth: 10,
    flex: 1,
    elevation: 5,
  },

  row: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  column1: {
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    flex: 1,
    marginRight: 8,
  },
  column2: {
    backgroundColor: 'transparent',
    width: 'auto',
    justifyContent: 'center',
  },

  timeSpent: {},
  estimatedTime: {
    textAlign: 'center',
  },
  buttonStart: {
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 4,
  },
});

export default BacklogItem;
