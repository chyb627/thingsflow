import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export type Issue = {
  issueNum: number;
  issueTitle: string;
  issueWriter: string;
  issueDate: string;
  issuecomments: number;
  issueBody?: string;
  avatarUrl: string;
};

export interface IssueContextInterface {
  issue: Issue;
  setIssue: Dispatch<SetStateAction<Issue>>;
}

const defaultState = {
  issue: {
    issueNum: 0,
    issueTitle: '',
    issueWriter: '',
    issueDate: '',
    issuecomments: 0,
    issueBody: '',
    avatarUrl: '',
  },
  setIssue: (issue: Issue) => {},
} as IssueContextInterface;

export const IssueContext = createContext(defaultState);

type IssueProvideProps = {
  children: ReactNode;
};

const IssueProvider = ({ children }: IssueProvideProps) => {
  const [issue, setIssue] = useState<Issue>({
    issueNum: 0,
    issueTitle: '',
    issueWriter: '',
    issueDate: '',
    issuecomments: 0,
    issueBody: '',
    avatarUrl: '',
  });

  return <IssueContext.Provider value={{ issue, setIssue }}>{children}</IssueContext.Provider>;
};
export default IssueProvider;
