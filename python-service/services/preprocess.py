import string
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS




def preprocess_text(text):
    lowercased_text = text.lower()
    cleaned_text=lowercased_text.translate(str.maketrans('','',string.punctuation))
    words= cleaned_text.split()

    filtered_words=[]

    for word in words:
        if word not in ENGLISH_STOP_WORDS:
            filtered_words.append(word)\
            
    return filtered_words