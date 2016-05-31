from flask import Blueprint, render_template
from os import listdir
import os.path
from cache import cache

home_page = Blueprint('home_page', __name__, template_folder='templates')
mypath = 'templates/'

@home_page.route('/')
@cache.cached(60)
def home():
    pageList = ['demo']                
    return render_template('components/home/home.demo.html', pageList=pageList)