import { webContents } from 'electron';
import validateAction from '../helpers/validateAction';

export const forwardToRendererWithParams = (params = {}) => store => next => action => {
  const { selector = () => true, storeid = '' } = params;
  if (!validateAction(action)) return next(action);
  if (action.meta && action.meta.scope === 'local') return next(action);

  // change scope to avoid endless-loop
  const rendererAction = {
    ...action,
    meta: {
      ...action.meta,
      scope: 'local',
    },
  };

  const allWebContents = webContents.getAllWebContents().filter(selector);

  allWebContents.forEach(contents => {
    contents.send(`redux-action-${storeid || 'all'}`, rendererAction);
  });

  return next(action);
};

const forwardToRenderer = forwardToRendererWithParams(); // default

export default forwardToRenderer;
