$('#refresh-ontology-table-button').click(() => {
	console.log('refreshing data of ontology-table');
	$('#ontology-table').bootstrapTable('refresh');
});