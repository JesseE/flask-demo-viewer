from flask import Blueprint, render_template
from functools import wraps
from os import listdir 
from os.path import isfile, join

mypath = 'templates'
demo_viewer = Blueprint('demo_viewer', __name__, template_folder=mypath)
demo = []

def get_demo_component(): 
    demo = [ n for n in listdir(mypath) if n != 'demo' ]
    return demo

@demo_viewer.route('/demo')
def demo_overview_page():
    page = 'demo'
    get_demo_component()
    return render_template(mypath + '/{0}/{0}.html'.format(page), demo=demo)

@demo_viewer.route('/demo/<page>')
def demo_component_page(page):
    get_demo_component()
    return render_template(mypath + '/{0}/{0}.html'.format(page), demo=demo)
