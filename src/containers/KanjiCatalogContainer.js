import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchData, updateSort } from '../actions';
import { OPTIONS } from '../helpers/constants';
import KanjiCatalog from '../components/KanjiCatalog';

function sortBy(sort) {
  const descending = (a, b) => -(a.get(sort) - b.get(sort));
  const ascending = (a, b) => a.get(sort) - b.get(sort);

  return sort === OPTIONS.FREQUENCY
    ? descending
    : ascending;
}

function mapStateToProps(state) {
  return {
    kanjiMap: state.get('kanjis'),
    currentSort: sortBy(state.get('currentSort')),
    fetched: state.get('fetched'),
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
