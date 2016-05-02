from flask import Flask
from views.home.home_page import home_page

app = Flask(__name__)

app.register_blueprint(home_page, url_prefix='/')

if __name__ == '__main__':
    app.run(debug=True)