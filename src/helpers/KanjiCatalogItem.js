import { Record } from 'immutable';

const KanjiCatalogItem = new Record({
  id: 0,
  alphabetical: 0,
  isFlash: false,
  /* Why `Number.MAX_SAFE_INTEGER` or `Number.MIN_SAFE_INTEGER`?
   * The reason is because when its not defined, that means its usually a
   * hard kanji (lots of stroke counts, not taught in any grade, or appeared in
   * in any jlpt) or a kanji not frequently used (lowest rank, rank 1 being the highest)
   */
  /* Categorical based sorting */
  jlpt: Number.MIN_SAFE_INTEGER,
  grade: Number.MAX_SAFE_INTEGER,
  stroke_count: Number.MAX_SAFE_INTEGER,
  /* Sequential based sorting */
  heisig: Number.MAX_SAFE_INTEGER,
  tweet: Number.MAX_SAFE_INTEGER,
  news: Number.MAX_SAFE_INTEGER,
});

export default KanjiCatalogItem;
