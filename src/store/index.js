import { createStore } from 'redux';
import { kanjis } from '../reducers';
import { kanjiFactory } from '../helpers/utils';

export const store = createStore(kanjis, kanjiFactory(2136));

