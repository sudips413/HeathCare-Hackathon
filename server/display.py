import json
import pathlib
import numpy as np
import pandas as pd
import os
import sys
from fastai.vision.all import *

def get_x(row): return row['image_id']
def get_y(row): return row['label']

def predict_from_model(img):
    print(img)
    
    temp = pathlib.PosixPath
    pathlib.PosixPath = pathlib.WindowsPath
    mapping = {0: 'Actinic keratosis',
        1: 'Basal cell carcinoma',
        2: 'Benign keratosis',
        3: 'Dermatofibroma',
        4: 'Melanocytic nevus',
        5: 'Melanoma',
        6: 'Squamous cell carcinoma',
        7: 'Vascular lesion',
        8:'Normal'
    }
    learn_inference = load_learner("./model/own_vgg.pkl")
    
    pred_idx,_,probs = learn_inference.predict(img)
    pred_class = mapping[pred_idx]
    prob = probs.max()
    prob = prob.numpy()
    disease_summary(pred_class.lower())
def disease_summary(disease_name):
    with open('./comment.json') as json_file:
        data = json.load(json_file)
    keys = list(map(lambda x : x[0],data.items()))
    dict={}
    if disease_name in keys: 
        data = data[disease_name]
        dict["Disease_Name"] = disease_name
        dict["Description"] = data["Description"]
        dict["Causes"]= data["Causes"]
        dict["RiskFactors"]= data["RiskFactors"]
        dict["Diagnosis"]= data["Diagnosis"]
        dict["Treatment"]= data["Treatment"]
        dict["Prevention"]= data["Prevention"]        
        print(json.dumps(dict))
    else:
        dict["Disease_Name"] = "Not Found"
        print(json.dumps(dict))

if __name__ == "__main__":
    # img = sys.argv[1]
    # predict_from_model(img)
    filepath='D:\\ai-hackathon\\skin_care\\server\\images\\ISIC_0024654.jpg'
    
    predict_from_model(filepath)        
    
    

    
    