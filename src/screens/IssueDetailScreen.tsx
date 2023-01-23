/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Header } from '../components/Header/Header';
import { IssueCard } from '../components/IssueCard';
import { RemoteImage } from '../components/RemoteImage';
import { useRootNavigation } from '../navigation/RootNavigation';
import { IssueContext } from '../store/issue-context';

const bottomSpace = getBottomSpace();

export const IssueDetailScreen = () => {
  const navigation = useRootNavigation<'IssueDetail'>();
  const { issue } = useContext(IssueContext);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={{ flex: 1, paddingBottom: bottomSpace }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName={'arrow-back'} onPress={onPressBack} />
          <Header.Title title="Organization Name / Repository Name" />
        </Header.Group>
      </Header>

      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignSelf: 'center', paddingHorizontal: 8 }}>
            <RemoteImage url={issue.avatarUrl} width={40} height={40} />
          </View>

          <IssueCard
            issueNum={issue.issueNum}
            issueTitle={issue.issueTitle}
            issueWriter={issue.issueWriter}
            issueDate={issue.issueDate}
            issuecomments={issue.issuecomments}
          />
        </View>

        <View style={{ paddingHorizontal: 24 }}>
          <Text>{issue.issueBody}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
