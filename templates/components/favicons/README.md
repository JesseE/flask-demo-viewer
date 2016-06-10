# Favicons

## Functionality

Consistent branding cross platform.

## Usage

### Generate

To generate the favicons use:

	npm run favicons:generate

The generated image and manifest files are located in `static/favicons/`.
The generated HTML partial with meta tags for all files is in `favicons.html`.

As `favicons.html`, the image and manifest files is auto-generated,
don't try to edit them manually. Instead use `config.js` to configure the favicons.

### Include

Include the generated HTML partial:

	{% include "components/core/favicons/favicons.html" %}

