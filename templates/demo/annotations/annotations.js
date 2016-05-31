(function(){

	var DEMO_ATTR = 'data-demo';
	var DEMO_ROUTE = '/demo/#components/';
	var ANNOTATED_CLASS = 'is-annotated';
	var isAnnotated = false;
	var components = [].slice.call(document.querySelectorAll('[' + DEMO_ATTR + ']'));
	var toggler = document.querySelector('[data-demo-annotations-toggler]');

	function goToDemo(event) {
		event.preventDefault();
		window.location = DEMO_ROUTE + event.target.getAttribute(DEMO_ATTR);
	}

	function toggleAnnotations() {
		isAnnotated = !isAnnotated;
		var bindAction = isAnnotated ? 'addEventListener' : 'removeEventListener';
		components.forEach(function(component) {
			component.classList.toggle(ANNOTATED_CLASS, isAnnotated);
			component[bindAction]('click', goToDemo);
		});
	}

	toggler.addEventListener('click', toggleAnnotations);

	window.toggleAnnotations = toggleAnnotations;
}());
