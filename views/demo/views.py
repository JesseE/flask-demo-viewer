from flask import Blueprint, render_template, request
from functools import wraps
from os import listdir 
from cache import cache

mypath = 'templates/components/'
demo_viewer = Blueprint('demo_viewer', __name__, template_folder=mypath)
exceptions = 'base.html'
demoHtml = '.demo'
demoList = []
moduleList = []

def get_demo_directory():
    demoDir = [ directory for directory in listdir(mypath) if directory != 'demo' ]
    return demoDir
    
def get_demo_component():
    #tuple is usefull memory conservation method if you know you wont be manipulating the list you want to conver to tuple
    demoDir = tuple(get_demo_directory())
    for directory in demoDir:
        for directory in listdir(mypath+directory):
            if directory.endswith('html'): 
                directory = directory.replace('.html', '')
                if directory.endswith(demoHtml) and directory not in demoList:
                    demoList.append(directory)
                elif directory not in moduleList and not directory.endswith(demoHtml):
                    moduleList.append(directory)
    
@demo_viewer.route('/demo')
@cache.cached(60)
def demo_overview_page():
    get_demo_component()
    page = 'demo'    
    return render_template('viewer' + '/{0}/{0}.{0}.html'.format(page), moduleList=moduleList)

@demo_viewer.route('/demo/<page>')
@cache.cached(60)
def demo_component_page(page):
    get_demo_component()
    return render_template('components' + '/{0}/{0}.demo.html'.format(page), demoList=demoList)
