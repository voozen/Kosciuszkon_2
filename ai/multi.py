from flask import Flask, jsonify
import cv2
import os
import threading
import cvzone
from cvzone.ClassificationModule import Classifier
from collections import Counter

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

app = Flask(__name__)

# Inicjalizacja modelu i innych zasobów
webcam = cv2.VideoCapture(0)
classifier = Classifier('keras_model.h5', 'labels.txt')
binsImgs = []
imgPaht = 'images'
pathList = os.listdir(imgPaht)
for path in pathList:
    binsImgs.append(cv2.imread(os.path.join(imgPaht, path), cv2.IMREAD_UNCHANGED))
with open('labels.txt', 'r') as file:
    labels = [label.strip()[2:] for label in file.readlines()]

global_variable = 0

def webcamAi():
    while True:
        _, img = webcam.read()
        imgResize = cv2.resize(img, (454, 340))
        imgBackground = cv2.imread('images/bg.png')

        prediction = classifier.getPrediction(img)
        #print(prediction)
        print(labels[prediction[1]])

        imgBackground = cvzone.overlayPNG(imgBackground, binsImgs[prediction[1]], (909, 127))
        imgBackground[148:148 + 340, 159:159 + 454] = imgResize
        cv2.imshow("Bg", imgBackground)
        cv2.waitKey(1)

def take_10_predictions():
    predictions = []
    for _ in range(10):
        _, img = webcam.read()
        prediction = classifier.getPrediction(img)
        predictions.append(labels[prediction[1]])
        print(predictions)
    return predictions

@app.route('/take')
def take():
    predictions = take_10_predictions()
    typeOfBin = Counter(predictions).most_common(1)[0][0]
    return jsonify(typeOfBin)

if __name__ == "__main__":
    webcam_thread = threading.Thread(target=webcamAi)
    webcam_thread.start()
    app.run()
