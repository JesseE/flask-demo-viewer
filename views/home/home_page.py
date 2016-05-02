from flask import Blueprint, render_template

home_page = Blueprint('home_page', __name__, template_folder='templates')

@home_page.route('/')
def show():
    user = 'Admin'
    return render_template('home/home.html', user=user)