var eslint = require('eslint');

var fixer = function(filenames) {
    var formatter = eslint.CLIEngine.getFormatter();
    var engine = new eslint.CLIEngine({fix: true});

    var report = engine.executeOnFiles(filenames);
    var filesWithFixes = report.results.filter(function(result) {
        return result.hasOwnProperty('output');
    });

    eslint.CLIEngine.outputFixes(report);

    var results = report.results;
    var output = formatter(results);

    for (var i = 0; i < filesWithFixes.length; i++) {
       console.log('Fixed: ' + filesWithFixes[i].filePath);
    }

    exitCode = (report.errorCount || filesWithFixes.length) ? 1 : 0;
};

if (require.main === module){
    fixer(process.argv.slice(2));
}

process.on('exit', function() {
    process.exit(exitCode);
});

module.exports = fixer;
