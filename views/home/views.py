from flask import Blueprint, render_template
from os import listdir
import os.path

home_page = Blueprint('home_page', __name__, template_folder='templates')
mypath = 'templates/'

@home_page.route('/')
def home():
    pageList = ['demo']                
    return render_template('components/home/home.demo.html', pageList=pageList)