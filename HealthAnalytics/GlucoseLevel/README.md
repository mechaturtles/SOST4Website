# SOST4Website

# Instructions:

Code was written using python in Google Colab, for ease of use the user may follow the Google Colab link to run the code. Scroll down the page and click the arrow "play button" as you scroll past blocks of code to intialize and run each block. The lower blocks of code must be ran after the earlier blocks as they are dependent on eachother.

# Inputs:

This function intakes data from a continuous glucose monitor (e.g. Dexcom G6) like Estimated Glucose Value (EGVs), and events (e.g. exercise, carb intake, insulin administration, etc...).

# Outputs:

The Exercise report delivers the average and standard deviation of EGVs for a period after exercise takes place. Allowing patients and providers aware of any trends in post-exercise hypoglycecmia.

The Insulin report delivers the amount of fast and long acting insulin administered over the time period observed. Better informing patients and providers of the individual's insulin needs over time and when prescription may need to be refilled.

The Hypoglycemia alert delivers an alert to providers and patients when the patient's EGVs reaches a critical threshold and remains there past a certain benchmark. The function may also alert in the reverse case (hyperglycemia) albeit this is less critical to patient's immediate health.

The carbohydrate report delivers the sum of carbohydrates the patient has consumed over the reported time period. Giving providers  insight into the impact of their patient's diet on their health.
