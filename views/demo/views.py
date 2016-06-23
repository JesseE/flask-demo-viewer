from flask import Blueprint, render_template
from functools import wraps
from os import listdir 

mypath = 'templates/components/'

demo_viewer = Blueprint('demo_viewer', __name__, template_folder=mypath)

exceptionsList = '.less'
demoHtml = '.demo.html'
demoList = []
moduleList = []
demoviewerList = []
demo = []

def get_demo_directory():
    demo = [ directory for directory in listdir(mypath) if directory != 'demo' ]
    return demo
    
def get_demo_component():
    demo = get_demo_directory()
    for directory in demo:
        if not directory.endswith(exceptionsList): 
            for moduleFile in listdir(mypath +directory):
                if moduleFile.endswith('.html') and not moduleFile.endswith(demoHtml):
                    moduleFile = moduleFile.replace('.html', '')
                    if moduleFile not in moduleList:
                        moduleList.append(moduleFile)
                
@demo_viewer.route('/demo')
def demo_overview_page(**kwargs):
    get_demo_component()
    page = 'home'   
    kwargs.update({
        'module_list': moduleList
    }) 
    return render_template('views/demopage.html', **kwargs)

@demo_viewer.route('/demo/<page>')
def demo_component_page(page, **kwargs):
    get_demo_component()
    kwargs.update({
        'module_list': moduleList
    }) 
    return render_template('components' + '/{0}/{0}.demo.html'.format(page), **kwargs)


@demo_viewer.route('/demoviewer')
def demoviewer_home(**kwargs):
    get_demo_component()
    
    # for item in moduleList:
    #     demoviewerList.append({name: item})
    
    kwargs.update({
        'module_list': moduleList
    }) 
    
    return render_template('views/demoviewerpage.html', **kwargs)