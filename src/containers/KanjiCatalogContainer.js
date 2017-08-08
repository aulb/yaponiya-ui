import { connect } from 'react-redux';
import { compose } from 'redux';
import { switchOrder, switchSort } from '../actions';
import KanjiCatalog from '../components/KanjiCatalog';

function sortBy(sort, order) {
  const ascending = (a, b) => a.get(order) - b.get(order);
  const descending = (a, b) => -ascending(a, b);

  const sorts = { ascending, descending };

  return sorts[sort];
}

function mapStateToProps(state) {
  return {
    kanjiMap: state.get('kanjis'),
    sortFunction: sortBy(state.get('currentSort'), state.get('currentOrder')),
    currentSort: state.get('currentSort'),
    currentOrder: state.get('currentOrder'),
    fetched: state.get('fetched'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchOrder: (newOrder) => {
      compose(dispatch, switchOrder)(newOrder);
    },
    switchSort: (newSort) => {
      compose(dispatch, switchSort)(newSort);
    },
  };
}

const KanjiCatalogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanjiCatalog);

export default KanjiCatalogContainer;
