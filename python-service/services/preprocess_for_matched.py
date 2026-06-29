import string
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

def preprocess(text):
    all_tokens_with_positions = []
    current_token = ""
    token_start = 0
    
    for i, char in enumerate(text):
        if char.isspace() or char in string.punctuation:
            if current_token:  
                all_tokens_with_positions.append({
                    'token': current_token.lower(),
                    'start_char': token_start,
                    'end_char': i,
                    'is_stopword': current_token.lower() in ENGLISH_STOP_WORDS
                })
                current_token = ""
        else:
            if not current_token: 
                token_start = i
            current_token += char
    
    if current_token:
        all_tokens_with_positions.append({
            'token': current_token.lower(),
            'start_char': token_start,
            'end_char': len(text),
            'is_stopword': current_token.lower() in ENGLISH_STOP_WORDS
        })
    
    tokens = [
        t for t in all_tokens_with_positions 
        if not t['is_stopword']
    ]
    
    return tokens, all_tokens_with_positions