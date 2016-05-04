from flask import Blueprint, render_template

mypath = 'templates'
home_page = Blueprint('home_page', __name__, template_folder=mypath)

@home_page.route('/')
def home():
    user = 'Admin'
    return render_template(mypath + '/home/home.html', user=user)