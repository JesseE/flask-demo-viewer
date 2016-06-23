from flask import Blueprint, render_template
from os import listdir
import os.path

home_page = Blueprint('home_page', __name__, template_folder='templates')
mypath = 'templates/'

@home_page.route('/')
def home(**kwargs):
    pageList = ['demo']                
    kwargs.update({
        'pageList': pageList
    })
    return render_template('views/homepage.html', **kwargs)