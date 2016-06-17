export const elementsArray = (nodeList:NodeList): HTMLElement[] => [].slice.call(nodeList);
export const bindEvent = (eventName, handler) => {
	return function listener(event) {
		handler(event);
	}
};
export const bindEventOnce = (eventName, handler) => {
	return function listener(event) {
		handler(event);
		event.target.removeEventListener(event.type, listener, false);
	}
};

export const isSupported = ('querySelector' in document && 'classList' in document.documentElement && 'map' in []);

export const dom = (selection = undefined) => new Dom(selection);
export default dom;

export class Dom {

    elements;

	static isSupported = isSupported;
	isSupported = isSupported;

    constructor(selection = undefined) {
        if(selection === undefined) {
			this.elements = [document];
		} else if(selection instanceof HTMLElement) {
			this.elements = [selection];
        } else if (selection.length > 0 && selection[0] instanceof HTMLElement) {
			this.elements = elementsArray(selection);
		} else {
            this.elements = [];
        }
    }

    find (selector:string): HTMLElement[] {
        return this.elements
            .map(element => elementsArray(element.querySelectorAll(selector)))
            .reduce((a, b) => a.concat(b));
    }

    findOne (selector:string): HTMLElement {
        return this.elements[0].querySelector(selector);
    }

    closest (selector:string, element = this.elements[0]): HTMLElement {
        if (element.matches(selector)) {
            return element;
        } else {
            return this.closest(selector, element.parentNode);
        }
    }

    remove () {
        return this.elements
            .map(element => element.parentNode.removeChild(element));
    }

	on (eventName, handler) {
		return this.elements
			.map(element => element.addEventListener(eventName, bindEvent(eventName, handler)));
	}

	one (eventName, handler) {
		return this.elements
			.map(element => element.addEventListener(eventName, bindEventOnce(eventName, handler)));
	}

	/**
	 * Get the children of a given element
	 * @param element
	 * @returns {Array}
	 */
	elementChildren (element:HTMLElement):HTMLElement[] {
		const childNodes = element.childNodes,
			children = [];
		let i = childNodes.length;

		while (i--) {
			if (childNodes[i].nodeType == 1) {
				children.unshift(childNodes[i]);
			}
		}
		return children;
	}
}
