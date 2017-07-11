import { connect, compose } from 'react-redux';
import { fetchData, updateSort } from '../actions';
import { OPTIONS } from '../helpers/constants';
import KanjiCatalog from '../components/KanjiCatalog';

function sortBy(sort) {
  const descending = (a, b) => -(a[sort] - b[sort]);
  const ascending = (a, b) => a[sort] - b[sort];

  return sort === OPTIONS.FREQUENCY
    ? descending
    : ascending;
}

function getKanjiList(kanjiMap, currentSort) {
  return kanjiMap.keySeq()
    .map(key => kanjiMap.get(key))
    .toList()
    .sort(sortBy(currentSort));
}

function mapStateToProps(state) {
  return {
    kanjiList: getKanjiList(state.kanjis, state.currentSort),
    currentSort: state.currentSort,
    fetched: state.fetched,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSort: (newSort) => {
      compose(dispatch, updateSort)(newSort);
    },
    fetchData: (url) => {
      compose(dispatch, fetchData)(url);
    },
  };
}

const KanjiCatalogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanjiCatalog);

export default KanjiCatalogContainer;
