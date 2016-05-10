from flask import Flask
from views.home.views import home_page
from views.demo.views import demo_viewer

app = Flask(__name__)

app.register_blueprint(home_page)
app.register_blueprint(demo_viewer)

# create a config that changes between dev and prod 
if __name__ == '__main__':
    app.run(debug=True)