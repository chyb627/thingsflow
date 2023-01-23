/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from 'react';
import { FlatList, Linking, Pressable, useWindowDimensions, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Header } from '../components/Header/Header';
import { IssueCard } from '../components/IssueCard';
import { RemoteImage } from '../components/RemoteImage';
import { Issue, IssueContext } from '../store/issue-context';
import { useRootNavigation } from '../navigation/RootNavigation';

const bottomSpace = getBottomSpace();

export const IssueListScreen = () => {
  const [issueData, setIssueData] = useState<Issue[]>([]);
  const [secondIssueData, setSecondIssueData] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const { width } = useWindowDimensions();
  const { setIssue } = useContext(IssueContext);
  const navigation = useRootNavigation();

  const getIssueData = async () => {
    const requestURL = `https://api.github.com/repos/angular/angular-cli/issues?state=open&sort=comments&page=${page}`;
    const res = await fetch(requestURL);
    const result = await res.json();

    const newArr: Issue[] = [];
    const newSecondArr: Issue[] = [];

    if (page === 1) {
      for (let i = 0; i < 4; i++) {
        const newData = {
          issueNum: result[i].number,
          issueTitle: result[i].title,
          issueWriter: result[i].user.login,
          issueDate: result[i].created_at,
          issuecomments: result[i].comments,
          issueBody: result[i].body,
          avatarUrl: result[i].user.avatar_url,
        };
        newArr.push(newData);
      }

      for (let i = 4; i < result.length; i++) {
        const newData = {
          issueNum: result[i].number,
          issueTitle: result[i].title,
          issueWriter: result[i].user.login,
          issueDate: result[i].created_at,
          issuecomments: result[i].comments,
          issueBody: result[i].body,
          avatarUrl: result[i].user.avatar_url,
        };
        newSecondArr.push(newData);
      }
      setIssueData(newArr);
      setSecondIssueData(newSecondArr);
      setPage(page + 1);
    } else {
      for (let i = 0; i < result.length; i++) {
        const newData = {
          issueNum: result[i].number,
          issueTitle: result[i].title,
          issueWriter: result[i].user.login,
          issueDate: result[i].created_at,
          issuecomments: result[i].comments,
          issueBody: result[i].body,
          avatarUrl: result[i].user.avatar_url,
        };
        newSecondArr.push(newData);
      }

      setSecondIssueData(secondIssueData.concat(newSecondArr));
      setPage(page + 1);
    }
  };

  const onPressIssue = (item: Issue) => {
    setIssue(item);
    navigation.navigate('IssueDetail');
  };

  // End 지점에서 추가적으로 데이터 호출
  const handleLoadMore = () => {
    getIssueData();
  };

  const ListHeaderComponent = () => {
    return (
      <>
        {issueData && issueData.length > 0 ? (
          <FlatList<Issue>
            keyExtractor={(_, index) => `list-header-component-${index}`}
            data={issueData}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    onPressIssue(item);
                  }}>
                  <IssueCard
                    issueNum={item.issueNum}
                    issueTitle={item.issueTitle}
                    issueWriter={item.issueWriter}
                    issueDate={item.issueDate}
                    issuecomments={item.issuecomments}
                  />
                </Pressable>
              );
            }}
          />
        ) : null}

        <Pressable
          onPress={() => {
            Linking.openURL('https://thingsflow.com/ko/home').catch((err) => {
              console.debug(err);
            });
          }}
          style={{ alignSelf: 'center' }}>
          <RemoteImage
            url={
              'https://hellobot-test.s3.ap-northeast-2.amazonaws.com/image/01fdd797-0477-4717-8d70-8551150463f7'
            }
            width={width - 40}
            height={width * 0.2}
          />
        </Pressable>
      </>
    );
  };

  // 처음 랜더링시 데이터 호출
  useEffect(() => {
    getIssueData();
  }, []);

  // 이슈번호, 이슈제목, 작성자, 작성일, 코멘트수
  // Organization Name / Repository Name
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="Organization Name / Repository Name" />
        </Header.Group>
      </Header>

      {secondIssueData && secondIssueData.length > 0 ? (
        <FlatList<Issue>
          keyExtractor={(_, index) => `issue-list-screen-${index}`}
          ListHeaderComponent={ListHeaderComponent}
          data={secondIssueData}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  onPressIssue(item);
                }}>
                <IssueCard
                  issueNum={item.issueNum}
                  issueTitle={item.issueTitle}
                  issueWriter={item.issueWriter}
                  issueDate={item.issueDate}
                  issuecomments={item.issuecomments}
                />
              </Pressable>
            );
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
        />
      ) : null}
    </View>
  );
};
