import React from 'react';
import ReactDOM from 'react-dom';
import Yaponiya from './Yaponiya';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

ReactDOM.render(<Yaponiya />, document.getElementById('root'));
registerServiceWorker();
