from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

count = 0


@app.route("/")  # No argument provided
@app.route("/<increaser>")  # Argument provided
def hello(increaser=None):
    try:
        global count
        if increaser is None:
            count += 1
        else:
            count += int(increaser)
        out = "Hello, World! " + str(count)
        print(out)
        return out
    except:
        print("increaser")
        return "Dette er ikke OK: " + increaser


if __name__ == "__main__":
    app.run()

print("Kake")
