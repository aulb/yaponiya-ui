import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchData, updateOrder } from '../actions';
import KanjiCatalog from '../components/KanjiCatalog';

function sortBy(sort, order) {
  const ascending = (a, b) => a.get(order) - b.get(order);
  const descending = (a, b) => -ascending(a, b);

  const sorts = {
    ascending, descending
  }

  return sorts[sort];
}

function mapStateToProps(state) {
  return {
    kanjiMap: state.get('kanjis'),
    currentSort: sortBy(state.get('currentSort'), state.get('currentOrder')),
    currentOrder: state.get('currentOrder'),
    fetched: state.get('fetched'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateOrder: (newOrder) => {
      // TODO: updateOrder
      compose(dispatch, updateOrder)(newOrder);
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
