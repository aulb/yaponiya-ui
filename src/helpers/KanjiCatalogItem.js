import { Record } from 'immutable';

const KanjiCatalogItem = new Record({
  id: undefined,
  alphabetical: undefined, // TODO Remove?
  heisig: undefined,
  count: 0,
  isFlash: false,
});

export default KanjiCatalogItem;
