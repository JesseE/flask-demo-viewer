# Annotations

Visually annotate components and link to their isolated preview.

**Note**: Use in development / debug mode only

## Usage

Annotate components with `data-demo`:

    <element {% if config['DEBUG'] %}data-demo="components/core/header"{% endif %}>

Include styling, script and toggler button on `base.html`:

    {% if config['DEBUG'] %}
        {% include "demo/annotations/annotations.html" %}
    {% endif %}
