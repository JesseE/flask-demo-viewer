from flask import Flask
from views.home.home_page import home_page
from views.demo.demo_viewer import demo_viewer

mypath = 'templates'

app = Flask(__name__)

app.register_blueprint(home_page, url_prefix='/')
app.register_blueprint(demo_viewer)

if __name__ == '__main__':
    app.run(debug=True)