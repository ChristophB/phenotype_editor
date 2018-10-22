const settings = require('electron-settings')

$('#refresh-ontology-table-button').click(() => {
	if (settings.get('host')) {
		$('#ontology-table').bootstrapTable('refresh', { url: settings.get('host') + '/phenotype' });
	}
});

(function() {
	if (settings.get('host')) {
		$('#ontology-table').bootstrapTable('refresh', { url: settings.get('host') + '/phenotype' });
	}
})();