
<<<<<<< HEAD
import { getLabels, getLabelsIdList, getLabelsList, getLabelsMap, getLabelFilters } from 'state/labels/selectors';
=======
import { getLabels, getLabelsIdList, getLabelsList, getLabelsMap, getSelectedLabel } from 'state/labels/selectors';
>>>>>>> 7b71791a (ENG-3124 unit tests for label form updated + amended unmount state to remove selected label)


const LABELS_MAP = {
  HELLO: {
    key: 'HELLO',
    titles: {
      en: 'Hello',
      it: 'Ciao',
    },
  },
  GOODBYE: {
    key: 'GOODBYE',
    titles: {
      en: 'Goodbye',
      it: 'Addio',
    },
  },
};
const LABELS_LIST = [
  'HELLO',
  'GOODBYE',
];
const STATE = {
  labels: {
    map: LABELS_MAP,
    list: LABELS_LIST,
    filters: { keyword: 'testkey' },
    selected: LABELS_MAP.HELLO,
  },
};


describe('state/labels/selectors', () => {
  it('getLabels returns the labels state', () => {
    expect(getLabels(STATE)).toEqual(STATE.labels);
  });

  it('getSelectedLabel returns the selected label', () => {
    expect(getSelectedLabel(STATE)).toEqual(STATE.labels.selected);
  });

  it('getLabelsIdList returns the labels id list', () => {
    expect(getLabelsIdList(STATE)).toEqual(STATE.labels.list);
  });

  it('getLabelsMap returns the labels map', () => {
    expect(getLabelsMap(STATE)).toEqual(STATE.labels.map);
  });

  it('getLabelsList returns the labels list', () => {
    expect(getLabelsList(STATE)).toEqual([
      LABELS_MAP.HELLO,
      LABELS_MAP.GOODBYE,
    ]);
  });

  it('getLabelFilters returns the label filters', () => {
    expect(getLabelFilters(STATE)).toEqual(STATE.labels.filters);
  });
});
