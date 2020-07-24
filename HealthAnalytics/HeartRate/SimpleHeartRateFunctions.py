# Created by Deepa Jayasankar
# inputs
heartRate = [[59,2],[60,24],[52,36],[105,40],[52,54],[58,59]] #heart rates in one 2D array
average = 64 #average heart rate
lowRate = 40 #low heart rate
highRate = 100 #high heart rate

# functions
def highHR(heartRate, highRate):
  size = len(heartRate)
  count = 0
  for i in range(size):
    value = heartRate[i][0]
    if(value > highRate):
      return("If the patient is not exercising, this heart rate is too high.")
      count = count + 1
  if(count == 0):
    return("The patient's heart rate did not go above the given baseline.")

def lowHR(heartRate, lowRate):
  size = len(heartRate)
  count = 0
  for i in range(size):
    value = heartRate[i][0]
    if(value < lowRate):
      return("The patient has a heart rate that is too low.")
      count = count + 1
  if(count ==0):
    return("The patient's heart did not fall below the given baseline.")

def averageHR(heartRate):
  size = len(heartRate)
  count = 0
  sum = 0
  for i in range(size):
    value = heartRate[i][0]
    sum = sum + value
  average = sum / size
  return "The patient's heart rate was at an average of %d bpm." % average

def constantLowHR(average, lowRate):
  count = 0
  if(average < lowRate):
    count = count + 1
    return("Heart rate is on average low.")
  else:
    return("The heart rate is not low on average.")
