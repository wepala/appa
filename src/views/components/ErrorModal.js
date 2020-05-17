import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Layout, Modal, Text} from '@ui-kitten/components';

const ErrorModal = ({children, isVisible = false}) => {
  const [visible, setVisible] = React.useState(isVisible);

  return (
    <Layout style={styles.container} level="1">
      <Modal visible={visible}>
        <Card disabled={true}>
          <Text>{children}</Text>
          <Button onPress={() => setVisible(false)}>Close</Button>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
  },
});

export default ErrorModal;
