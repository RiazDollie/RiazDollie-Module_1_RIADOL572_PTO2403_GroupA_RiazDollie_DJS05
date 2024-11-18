const initialState = {
    count: 0,
  };
  
  const ADD = "ADD";
  const SUBTRACT = "SUBTRACT";
  const RESET = "RESET";
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case ADD:
        return { count: state.count + 1 };
      case SUBTRACT:
        return { count: state.count - 1 };
      case RESET:
        return { count: 0 };
      default:
        return state;
    }
  }
  
  function initializeStore(reducer) {
    let currentState = initialState;
    let listeners = [];
    return {
      getState: () => currentState,
      dispatch: (action) => {
        currentState = reducer(currentState, action);
        listeners.forEach((listener) => listener());
      },
      subscribe: (listener) => {
        listeners.push(listener);
        return () => {
          listeners = listeners.filter((l) => l !== listener);
        };
      },
    };
  }
  
  let myStore = initializeStore(reducer);
  
  console.log('Initial State:', myStore.getState());
  
  myStore.subscribe(() => console.log('State after change:', myStore.getState()));
  
  console.log('Scenario 1');
  myStore.getState();
  
  console.log('Scenario 2');
  myStore.dispatch({ type: ADD });
  myStore.dispatch({ type: ADD });
  
  console.log('Scenario 3');
  myStore.dispatch({ type: SUBTRACT });
  
  console.log('Scenario 4');
  myStore.dispatch({ type: RESET });