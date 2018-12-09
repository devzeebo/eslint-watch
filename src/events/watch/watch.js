import chokidar from 'chokidar';
import createLogger from '../../logger';

const logger = createLogger('watch:chokidar');

const ignoredPath = /\.git|node_modules|bower_components/;

export default {
  createWatcher(dirs, options = {}) {
    logger.debug('Watching %o %o', dirs, options);
    const ignored = options.ignored ? new RegExp(`${ignoredPath.source}|${options.ignored.source}`) : ignoredPath;
    const watcher = chokidar.watch(dirs, { ignored });

    return {
      on: watcher.on.bind(watcher),
      add: watcher.add.bind(watcher),
      unwatch: watcher.unwatch.bind(watcher),
      close: watcher.close,
    };
  },
};
