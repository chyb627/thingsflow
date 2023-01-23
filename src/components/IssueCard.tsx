/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React from 'react';
import { Text, View } from 'react-native';
import { Margin } from './Margin';

export const IssueCard: React.FC<{
  issueNum: number;
  issueTitle: string;
  issueWriter: string;
  issueDate: string;
  issuecomments: number;
}> = ({ issueNum, issueTitle, issueWriter, issueDate, issuecomments }) => {
  const writeDate = dayjs(issueDate).format('YYYY년 MM월 DD일');

  return (
    <View style={{ flex: 1, padding: 14 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 3 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{`#${issueNum} ${issueTitle}`}</Text>
          <Margin height={8} />
          <Text style={{ fontSize: 12 }}>{`작성자: ${issueWriter}, 작성일: ${writeDate}`}</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'right' }}>{`코멘트: ${issuecomments}`}</Text>
        </View>
      </View>

      <Margin height={12} />
      <View style={{ width: '100%', height: 0.5, backgroundColor: 'lightgrey' }} />
    </View>
  );
};
