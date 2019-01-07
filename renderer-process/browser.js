const settings = require('electron-settings')

$('#refresh-ontology-table-button').click(() => {
	if (settings.get('host')) {
		$('#ontology-table').bootstrapTable('refresh', { url: settings.get('host') + '/phenotype' })
	}
});

function actionButtonCellFormatter(value, row) {
	return `<a class="btn btn-default" download="${row.id}" href="${settings.get('host')}/phenotype/${row.id}">Download</a>`
		+ `<button class="btn btn-danger" onclick="deleteOntology('${row.id}')">Delete</button>`
}

function deleteOntology(id) {
	if (!confirm(`Deletion is irrevocable! Really delete ontology '${id}'?`)) return

	$.ajax({
		url: `${settings.get('host')}/phenotype/${id}/delete`,
		dataType: 'text',
		contentType: 'application/json',
		processData: false,
		type: 'POST',
		success: function(result) {
			if (settings.get('activeOntologyId') == id) {
				settings.set('activeOntologyId', null)
			}
			document.getElementById('refresh-ontology-table-button').click()
			showMessage(result, 'success', true);
		},
		error: function(result) {
			showMessage(result.responseText, 'danger', true);
		}
	});
}

(function() {
	if (settings.get('host')) {
		$('#ontology-table').bootstrapTable('refresh', { url: settings.get('host') + '/phenotype' })
	}
})()