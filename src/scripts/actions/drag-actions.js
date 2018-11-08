import { createActions } from 'shri-architecture';

const dragActions = [
  'dragStart',
  'dragStop',
  'drag'
];

export default createActions(dragActions);
