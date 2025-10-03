from flask import Flask, send_from_directory, request, abort
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

# BASE_DIR = 'D:/apiportal/etabella-nestjs/assets/'
BASE_DIR = ''

@app.route('/doc/<case>/<filename>')
def serve_file(case, filename):
    if 'ID' in request.args:
        id_value = request.args.get('ID')
        print(f"ID: {id_value}")

    file_path = os.path.join(BASE_DIR, 'doc', case, filename)
    print(f"Serving file from path: {file_path}")

    if not os.path.isfile(file_path):
        print("File not found:", file_path)
        abort(404, description="Resource not found")
    
    return send_from_directory(os.path.dirname(file_path), os.path.basename(file_path))

@app.route('/screenshot/<case>/<filename>')
def serve_screenshot(case, filename):
    if 'ID' in request.args:
        id_value = request.args.get('ID')
        print(f"ID: {id_value}")

    file_path = os.path.join(BASE_DIR, 'screenshot', case, filename)
    print(f"Serving screenshot from path: {file_path}")

    if not os.path.isfile(file_path):
        print("Screenshot not found:", file_path)
        abort(404, description="Resource not found")
    
    return send_from_directory(os.path.dirname(file_path), os.path.basename(file_path))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
