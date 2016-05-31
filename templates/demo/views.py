from flask import Blueprint, render_template, request, send_from_directory, config
from functools import wraps
from os import listdir 
from cache import cache
import glob
import os
import markdown2

mypath = 'templates/components/'
demo_viewer = Blueprint('demo_viewer', __name__, template_folder=mypath)
exceptions = 'base.html'
demoHtml = '.demo'
demoList = []
moduleList = []

@demo_viewer.route('/demo')
def render_index():
    return render_template('demo/index.html', components=list_components())

@demo_viewer.route('/viewer/assets/<path:filename>')
def serve_asset(filename):
    demo_dir = os.path.dirname(os.path.realpath(__file__))
    return send_from_directory(demo_dir + '/viewer/assets', filename)

@demo_viewer.route('/components/')
def render_component_index():
    return render_template('demo/component-index.html', components=list_components())

@demo_viewer.route('/components/<path:path>')
def render_component(path):
    name = path.rsplit('/',1)[-1]
    return render_template('components/%s/%s.demo.html' % (path, name))

@demo_viewer.route('/components/<path:path>/readme')
def render_component_readme(path):
    template_dir = os.path.normpath( os.path.join(os.path.dirname(os.path.realpath(__file__)), '..'))
    readme_filename = '%s/components/%s/README.md' % (template_dir, path)
    return render_readme(readme_filename)

def render_readme(path):
    content = ''
    with open(path, 'r') as readme:
        content = readme.read()

    return markdown2.markdown(content, extras=["tables"])

def list_components():
    template_dir = mypath
    files = glob.iglob(template_dir + '*/*.demo.html')
    print files
    components = [file[len(template_dir):file.rindex('/')] for file in files]
    print components
    return components
