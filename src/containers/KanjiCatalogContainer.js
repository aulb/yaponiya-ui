import { connect } from 'react-redux';
import { compose } from 'redux';
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
  return kanjiMap.valueSeq()
    .toList()
    .sort(sortBy(currentSort));
}

function mapStateToProps(state) {
  return {
    kanjiList: getKanjiList(state.get('kanjis'), state.get('currentSort')),
    currentSort: state.get('currentSort'),
    fetched: state.get('fetched'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSort: (newSort) => {
      dispatch(updateSort(newSort));
    },
    fetchData: (url) => {
      dispatch(fetchData(url));
    },
  };
}

const KanjiCatalogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanjiCatalog);

export default KanjiCatalogContainer;
