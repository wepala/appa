import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Layout,
  Input,
  StyleService,
  useStyleSheet,
  Text,
} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import TopBar from '../components/TopBar';
import {useEffect} from 'react';

export default ({
  navigation,
  route,
  status,
  addFeedback,
  getStories,
  stories,
}) => {
  useEffect(() => {
    if (!stories.length) {
      getStories();
    }
  }, [getStories, stories]);

  const [form, setForm] = useState({
    title: null,
    desc: '',
    tags: [],
  });

  const toggleOption = (option) => {
    const index = form.tags.indexOf(option);
    let tags = form.tags;
    if (index > -1) {
      tags.splice(index, 1);
    } else {
      tags.push(option);
    }
    setForm({...form, tags});
    console.log(form);
  };

  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Request Features" navigation={navigation} route={route} />
      <LinearGradient
        colors={['#b0d9ff', '#eff9ff']}
        style={styles.linearGradient}>
        <Text category="h1" style={styles.title}>
          What should Appa do next?
        </Text>
        <Layout style={styles.content}>
          <Input
            testID="TaskDescription"
            style={styles.input}
            multiline={true}
            placeholder="Other"
            clearButtonMode="unless-editing"
            numberOfLines={3}
            maxLength={100}
            value={form.description}
            onChangeText={(val) => setForm({...form, title: val})}
          />
          <Text style={styles.label} category="s2">
            Tags
          </Text>
          <Layout style={styles.grid}>
            {stories.length > 0 || stories === null
              ? stories.map((story, index) => {
                  return index % 2 === 0 ? (
                    <Layout
                      key={story.id}
                      style={[styles.item, styles.itemLeft]}>
                      <Button
                        testID="StoryButton"
                        style={styles.buttonOptions}
                        status="info"
                        appearance={
                          form.tags.indexOf(story.title) > -1
                            ? 'filled'
                            : 'outline'
                        }
                        onPress={() => toggleOption(story.title)}>
                        {story.title}
                      </Button>
                    </Layout>
                  ) : (
                    <Layout
                      key={story.id}
                      style={[styles.item, styles.itemRight]}>
                      <Button
                        testID="StoryButton"
                        style={styles.buttonOptions}
                        status="info"
                        appearance={
                          form.tags.indexOf(story.title) > -1
                            ? 'filled'
                            : 'outline'
                        }
                        onPress={() => toggleOption(story.title)}>
                        {story.title}
                      </Button>
                    </Layout>
                  );
                })
              : null}
          </Layout>
          <Button
            testID="SubmitButton"
            disabled={!form.tags.length || form.title === ''}
            size="giant"
            style={styles.buttonSubmit}
            onPress={() => addFeedback(form)}>
            SUBMIT
          </Button>
        </Layout>
      </LinearGradient>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'transparent',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    paddingBottom: 16,
  },

  item: {
    width: '50%',
    backgroundColor: 'transparent',
  },
  itemRight: {
    paddingRight: 4,
  },
  itemLeft: {
    paddingLeft: 4,
  },

  input: {
    width: '100%',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginTop: 32,
  },
  subTitle: {
    paddingBottom: 32,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  label: {
    marginBottom: 8,
  },
  buttonOptions: {
    width: '100%',
    borderRadius: 50,
    marginBottom: 8,
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  buttonSubmit: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
});
