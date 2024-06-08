import os
from flask import Flask
import cvzone

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import cv2
import numpy
from cvzone.ClassificationModule import Classifier

#bins
binsImgs = []
imgPaht = 'images'
pathList = os.listdir(imgPaht)
for path in pathList:
    binsImgs.append(cv2.imread(os.path.join(imgPaht,path),cv2.IMREAD_UNCHANGED))

with open('labels.txt', 'r') as file:
    labels = [label.strip()[2:] for label in file.readlines()]
print(labels)

webcam = cv2.VideoCapture(0)
classifier = Classifier('keras_model.h5','labels.txt')

app = Flask(__name__)
@app.route('/take')
def take():
    return "Taked"
while True:
    _, img = webcam.read()

    imgResize = cv2.resize(img,(454,340))
    imgBackground = cv2.imread('images/bg.png')

    predection = classifier.getPrediction(img)
    print(predection)
    print(labels[predection[1]])

    imgBackground = cvzone.overlayPNG(imgBackground,binsImgs[predection[1]],(909,127))

    imgBackground[148:148+340,159:159+454] = imgResize
    #cv2.imshow("Img", img)
    cv2.imshow("Bg",imgBackground)
    cv2.waitKey(1)
