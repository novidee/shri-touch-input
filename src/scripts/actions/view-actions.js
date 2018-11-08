import { createActions } from 'shri-architecture';

const viewActions = [
  'positionChange',
  'scaleChange',
  'angleDistanceChange'
];

export default createActions(viewActions);
