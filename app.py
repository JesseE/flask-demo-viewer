from flask import Flask, render_template
from views.home.views import home_page
from views.demo.views import demo_viewer
from werkzeug.serving import run_simple
from flask_assets import Environment, Bundle
import watchdog
import os
import pathlib

app = Flask(__name__)

hostname = '127.0.0.1'
port = 5000
files_to_watch = [
        'gulpfile.js',
        'app.py',
        ',templates/base.html'
        '.templates/**/**/*.html',
        'dist/*.js',
        'dist/*.css',
        'dist/*.html'
]

assets = Environment(app)
js = Bundle('js/index.js')
css = Bundle('css/index.css')
assets.register('css_bundle', css)
assets.register('js_bundle', js)

app.register_blueprint(home_page)
app.register_blueprint(demo_viewer)

run_simple(hostname, port, app,
    use_reloader=True, 
    threaded=True, 
    reloader_type='watchdog',
    extra_files=files_to_watch
)
