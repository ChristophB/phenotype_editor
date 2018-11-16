function showMessage(text, state, timeout = false) {
	$.snackbar({ content: text, style: 'snackbar-' + state, timeout: timeout ? 3000 : 0 });
}