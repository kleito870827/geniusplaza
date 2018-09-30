import { createStore } from 'redux';
// import thunk from 'redux-thunk';

import rootReducer from '../reducers';


// export default createStore( rootReducer, applyMiddleware(thunk) );
export default createStore( rootReducer );
