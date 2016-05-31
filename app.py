from flask import Flask
from views.home.views import home_page
from templates.demo.views import demo_viewer
from cache import cache
from configmodule import *

app = Flask(__name__)

app.config['CACHE_TYPE'] = 'simple'
cache.init_app(app)

app.register_blueprint(home_page)
app.register_blueprint(demo_viewer)

# create config file for dev env 

app.config.from_object('configmodule.Config') 

# create fabric connection to external server for quick deployment

# create a config that changes between dev and prod 
if __name__ == '__main__':
    app.run(debug=True)