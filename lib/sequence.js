var runSequence = require('run-sequence');
/**
 * return a function that runs a tasks in sequence and reports an error if it
 * occurs
 * @param  {array} tasks  tasks to run
 * @return {undefined}
 */
module.exports = function sequence(tasks, cb) {
	return runSequence.apply(null, tasks.concat(function (err) {
		//if any error happened in the previous tasks, exit with a code > 0
		if (err) {
			var exitCode = 2;
			console.log('[ERROR] gulp build task failed', err);
			console.log('[FAIL] gulp build task failed - exiting with code ' + exitCode);
			return process.exit(exitCode);
		} else {
			return cb();
		}
	}));
};
