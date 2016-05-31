from flask import Blueprint, render_template, request, send_from_directory, config
from functools import wraps
from os import listdir 
import glob
import os
import markdown2
from cache import cache

mypath = 'templates/components/'
demo_viewer = Blueprint('demo_viewer', __name__, template_folder=mypath)
exceptions = 'base.html'
demoHtml = '.demo.html'
demoList = []
moduleList = []

@demo_viewer.route('/demo')
@cache.cached(timeout=60)
def render_index():
    demo = get_demo_directory()
    return render_template('demo/index.html', components=demo)

@demo_viewer.route('/viewer/assets/<path:filename>')
@cache.cached(timeout=60)
def serve_asset(filename):
    demo_dir = os.path.dirname(os.path.realpath(__file__))
    return send_from_directory(demo_dir + '/viewer/assets', filename)

@demo_viewer.route('/components/')
@cache.cached(timeout=60)
def render_component_index():
    demo = get_demo_directory()
    return render_template('demo/component-index.html', components=demo)

@demo_viewer.route('/components/<path:path>')
@cache.cached(timeout=60)
def render_component(path):
    return render_template('components/{0}/{0}.demo.html'.format(path))

@demo_viewer.route('/components/<path:path>/readme')
@cache.cached(timeout=60)
def render_component_readme(path):
    template_dir = os.path.normpath( os.path.join(os.path.dirname(os.path.realpath(__file__)), '..'))
    readme_filename = '%s/components/%s/README.md' % (template_dir, path)
    return render_readme(readme_filename)

def render_readme(path):
    content = ''
    with open(path, 'r') as readme:
        content = readme.read()
    return markdown2.markdown(content, extras=["tables"])

def get_demo_directory():
    demo = [ directory for directory in listdir(mypath) if directory != 'demo' ]
    return demo