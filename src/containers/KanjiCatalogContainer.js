import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchData, updateSort } from '../actions';
import KanjiCatalog from '../components/KanjiCatalog';

// TODO: Get proper order a.get(order) - b.get(order)
function sortBy(sort, order) {
  const ascending = (a, b) => a.get(order) - b.get(order);
  const descending = (a, b) => -ascending(a, b);

  const sorts = {
    ascending, descending
  }

  return sorts[sort];// sorts[sort];
}

function mapStateToProps(state) {
  return {
    kanjiMap: state.get('kanjis'),
    currentSort: sortBy(state.get('currentSort'), state.get('currentOrder')),
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
