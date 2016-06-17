# DOM

## Functionality

DOM helper methods to easily find and operate on multiple elements.

## Usage

Import the helpers:

	import dom from './../../core/dom/dom';

Call `dom(selection)` with an optional selection (element or elements, defaults to `document`),
which gives you access to several convenience methods (see `dom.ts`) like `find(selector)`:

	dom(container).find('[nested-item]').map(element => ...)
