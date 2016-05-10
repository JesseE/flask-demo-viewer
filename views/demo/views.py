from flask import Blueprint, render_template
from functools import wraps
from os import listdir 
from fnmatch import fnmatch

mypath = 'templates/components/'
demo_viewer = Blueprint('demo_viewer', __name__, template_folder=mypath)
exceptions = 'base.html'
demoHtml = '.demo'
demoList = []
moduleList = []
demo = []

def get_demo_directory():
    demo = [ directory for directory in listdir(mypath) if directory != 'demo' ]
    return demo
    
def get_demo_component():
    demo = get_demo_directory()
    for directory in tuple(demo):
        for directory in listdir(mypath+directory): 
            directory = directory.replace('.html', '')
            if directory.endswith(demoHtml) and directory not in demoList:
                demoList.append(directory)
            if directory not in moduleList:
                moduleList.append(directory)
                
    
@demo_viewer.route('/demo')
def demo_overview_page():
    get_demo_component()
    page = 'demo'    
    return render_template('components' + '/{0}/{0}.{0}.html'.format(page), moduleList=moduleList)

@demo_viewer.route('/demo/<page>')
def demo_component_page(page):
    get_demo_component()
    return render_template('components' + '/{0}/{0}.demo.html'.format(page), demoList=demoList)
