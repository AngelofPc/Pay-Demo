export const setIsSending = (dispatch, isSending) => {
  dispatch({
    type: 'isSending',
    payload: isSending,
  });
};

export const setIsLoading = (dispatch, isLoading) => {
  dispatch({
    type: 'isLoading',
    payload: isLoading,
  });
};
