from flask import Flask, url_for
from flask_cors import CORS, cross_origin
from markupsafe import escape
from openai import OpenAI
from urllib.parse import unquote


app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'index'


@app.route('/login')
def login():
    return 'login123'


@app.route('/user/<username>')
def profile(username):
    return '{}\'s profile'.format(escape(username))


@app.route('/generate/<problem>/<code>/<difficulty>/')
def generate_hint(problem, code, difficulty):
    client = OpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        api_key="Cannot share publicly.",
    )

    content = ("For the coding problem \"" + unquote(unquote(problem)) + "\" what is a "
           + difficulty + " hint for someone who has this code \"" + unquote(unquote(code)) + "\"?")

    print()
    print(content)
    print()

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant designed to provide coding hints. A small hint is purely"
                           " conceptual. A medium hint can include some code. A large hint can include a lot of code."},
            {
                "role": "user",
                "content": content,
            }
        ],
        model="gpt-3.5-turbo",
    )

    return chat_completion.choices[0].message.content


with app.test_request_context():
    print(url_for('index'))
    print(url_for('login'))
    print(url_for('login', next='/'))
    print(url_for('profile', username='John Doe'))
