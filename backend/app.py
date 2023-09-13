from flask import Flask,jsonify,request
from flask_cors import CORS 
import pymongo
import json
from bson import json_util
from datetime import datetime 

myClient =pymongo.MongoClient("mongodb://localhost:27017")
myDB=myClient['praticalTest']

app = Flask(__name__)
CORS(app)

@app.route("/bookList",methods=['GET'])
def getBookList():
    mycol = myDB["books"]
    res=mycol.find({})
    res_list = [json.loads(json_util.dumps(doc)) for doc in res]
    return jsonify({"res": res_list})



@app.route("/add", methods=['POST'])
def postBook():
    try:
        mycol = myDB["books"]
        data = request.json
        data['date']=datetime.now()
        mycol.insert_one(data)
        return jsonify({'message': 'Book inserted successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
