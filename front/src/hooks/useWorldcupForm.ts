import React, { useReducer } from 'react';

export interface WorldcupState {
  title: string;
  desc: string;
  keywords: string[];
}

export type WorldcupAction =
  | { type: 'CHANGE_TITLE'; payload: string }
  | { type: 'CHANGE_DESC'; payload: string }
  | { type: 'ADD_KEYWORD'; payload: string }
  | { type: 'ADD_KEYWORDS'; payload: string[] }
  | { type: 'DELETE_KEYWORD' };

const initialWorldcupState: WorldcupState = {
  title: '',
  desc: '',
  keywords: [],
};

const worldcupFormReducer = (state: WorldcupState, action: WorldcupAction): WorldcupState => {
  switch (action.type) {
    case 'CHANGE_TITLE': {
      const { payload: newTitle } = action;
      return { ...state, title: newTitle };
    }

    case 'CHANGE_DESC': {
      const { payload: newDesc } = action;
      return { ...state, desc: newDesc };
    }

    case 'ADD_KEYWORD': {
      const { payload: newKeyword } = action;
      return { ...state, keywords: [...state.keywords, newKeyword] };
    }

    case 'ADD_KEYWORDS': {
      const { payload: newKeyword } = action;
      return { ...state, keywords: [...newKeyword] };
    }

    case 'DELETE_KEYWORD': {
      return { ...state, keywords: [...state.keywords.slice(0, -1)] };
    }

    default: {
      throw new Error('Unexpected action type');
    }
  }
};

const useWorldcupForm = (): [WorldcupState, React.Dispatch<WorldcupAction>] => {
  const [worldcupFormState, worldcupFormDispatcher] = useReducer(worldcupFormReducer, initialWorldcupState);
  return [worldcupFormState, worldcupFormDispatcher];
};

export default useWorldcupForm;
