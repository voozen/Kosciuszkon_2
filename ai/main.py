import cvzone
import cv2
import numpy

webcam = cv2.VideoCapture(0)
while True:
    _,img = webcam.read()
    cv2.imshow("Img",img)
    cv2.waitKey(1)