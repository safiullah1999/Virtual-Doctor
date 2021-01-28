# -*- coding: utf-8 -*-
"""
Created on Sat Apr 18 23:52:29 2020

@author: Biohazard
"""

# -*- coding: utf-8 -*-
"""
Created on Fri Apr 17 15:59:31 2020

@author: Biohazard
"""

from flask import Flask,request,jsonify
import pickle as pk
import pandas as pd
from sklearn.preprocessing import StandardScaler
import sys
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#loading the models
knn_model = pk.load(open('knn_model.pkl','rb'))

@app.route('/predictHeart',methods=['POST'])
def predict():
        try:
            data = request.get_json(force=True)
            data = {
            "age":[data['age']],
            "sex":[data['sex']],
            "cp":[data['cp']],
            "trestbps":[data['trestbps']],
            "chol":[data['chol']],
            "fbs":[data['fbs']],
            "restecg":[data['restecg']],
            "thalach":[data['thalach']],
            "exang":[data['exang']],
            "oldpeak":[data['oldpeak']],
            "slope":[data['slope']],
            "ca":[data['ca']],
            "thal":[data['thal']]
            }
            # data["age","sex","cp","testbps","chol","fbs","restecg","thalach","exang","oldpeak","slope","ca","thal"].append(63,1,3.0,145.0,233.0,1.0,0.0,150.0,0.0,2.30,0.0,0.0,1.0)                 
            df1 = pd.read_csv('dataset.csv')
            df= pd.DataFrame(data)
            df = pd.concat([df1, df[:]]).reset_index(drop = True)
            df = df.drop(['target'], axis = 1) 
            # df = df.append(df1, ignore_index=True)
        
            categorical_columns = ['sex', 'cp', 'fbs', 'restecg', 'exang', 'slope', 'ca', 'thal']
            df = pd.get_dummies(df, columns = categorical_columns)
            standardScaler = StandardScaler()
            columns_to_scale = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
            df[columns_to_scale] = standardScaler.fit_transform(df[columns_to_scale])
            pred = ""
            if knn_model.predict(df[-1:])[0] == 0:
                pred = "no"
            else:
                pred = "yes"

            
            output = {'prediction': pred} #knn_model.predict(df)[0]}
            return jsonify(output)
        except:
            return jsonify ({'error':"There is something wrong..Please check your input, some value maybe out of range !!"})


Symptoms=['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
'yellow_crust_ooze']



#loading the models

dt_model =  pk.load(open('dt_model.pkl','rb'))
df = pd.read_csv('Training.csv')[1:2][Symptoms]
@app.route('/predictDisease',methods=['POST'])
def predict2():
    try:
        data = request.get_json(force=True)['symptoms']
        if len(data) ==0:
            return jsonify({'error':'Please Select a symptom before submitting !!'})

        df.iloc[:,0:] = 0


        for j in data:
            df[j] = 1
        output = {'prediction': dt_model.predict(df)[0]}
        return jsonify(output)
    except:
        return jsonify ({'error':"There is something wrong..Try Again !!"})


if __name__ == "__main__":
    app.run(debug=True)# -*- coding: utf-8 -*-

