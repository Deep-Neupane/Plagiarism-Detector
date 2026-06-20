from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def tfidf_similarity(text1_tokens, text2_tokens):


    text1 = ' '.join(text1_tokens)
    text2 = ' '.join(text2_tokens)
    
    if not text1 or not text2:
        return 0.0
    
   
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([text1, text2])
    

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    
   
    similarity_percentage = round(similarity * 100, 2)
    
    return similarity_percentage