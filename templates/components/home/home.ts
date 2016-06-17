import dom from './../dom/dom';

const HOME_SELECTOR = '[data-button-action]';

export default class Home {

	static isSupported:boolean = ('addEventListener' in document);

	static enhance (selector:string = HOME_SELECTOR): Home[] {
		if(!Home.isSupported) { return []; }
		const elements:HTMLElement[] = dom().find(selector);
		return elements.map(element => new Home(element));		
	}
	
	element:HTMLElement;

	constructor (element:HTMLElement) {
		this.element = element;
		
		window.addEventListener('onload', function() {
			this.alert();
			this.notsure();
		})
	}
	
	alert () : void {
		console.log('does it even work');
	}
	
	nope(): void {
		console.log('nope');
		let nope = 'Nope';
		
	}
	
	does() : void {
		console.log('ba');
	}
	
	notsure(): void {
		let itemsList = [1,2,3,4,5,6,7,8,9];
		for (var item in itemsList) {
			console.log(item);
		}
		alert();
	}
	
	
}
