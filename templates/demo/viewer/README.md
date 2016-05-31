# Demo viewer

## Functionality

Browse and preview all components in the application in isolation.
You can test the responsive behaviour using the viewer controls.
The info panel shows the rendered `README.md` of the component.

## Usage

The viewer is available at `/demo/` and automatically lists all components with a `.demo.html` file.

To add a demo to the viewer create the following files in your `component-name`'s directory:

    component-name/
        component-name.demo.html
        README.md

As a boilerplate for a demo you can use:

    {% extends "demo/component.html" %}
    {% block content %}
        {# your demo here #}
    {% endblock %}

For the demo of a static component you would typically use an include:

    {% extends "demo/component.html" %}
    {% block content %}
        {% include "path-to/component-name/component-name.html" %}
    {% endblock %}

In case of a dynamic component you would import it's macro(s):

    {% extends "demo/component.html" %}
    {% from "path-to/component-name/component-name.html" import componentName  %}
    {% block content %}
        {{ componentName(someParam) }}
    {% endblock %}

To turn your demo into an example, wrap your macro in example markup:

    <div class="demo-example" title="alert on error">
        {{ componentName(someParam) }}
    </div>

## Notes

* Angular is included as a dependency for the viewer, but is not required for production.
The viewer uses Angular version 1.2 to also support older browsers.