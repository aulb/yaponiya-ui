import React from 'react';
import ReactDOM from 'react-dom';
import Yaponiya from './Yaponiya';
import registerServiceWorker from './registerServiceWorker';
import { kanjiFactory } from './helpers/utils';
import kanjis from './store/reducers';
import './styles/index.css';

ReactDOM.render(<Yaponiya />, document.getElementById('root'));
registerServiceWorker();
