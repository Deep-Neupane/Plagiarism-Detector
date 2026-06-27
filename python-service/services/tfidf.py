from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import torch
import numpy as np

def tfidf_similarity(text1_tokens, text2_tokens):
  
    text1 = ' '.join(text1_tokens)
    text2 = ' '.join(text2_tokens)
    
    if not text1 or not text2:
        return 0.0
    
    try:
    
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([text1, text2]).toarray()
        
     
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        tfidf_tensor = torch.tensor(tfidf_matrix, dtype=torch.float32, device=device)
        
    
        vec1 = tfidf_tensor[0:1]
        vec2 = tfidf_tensor[1:2]
        

        dot_product = torch.mm(vec1, vec2.t())
        norm1 = torch.norm(vec1, p=2, dim=1, keepdim=True)
        norm2 = torch.norm(vec2, p=2, dim=1, keepdim=True)
        
        similarity = (dot_product / (norm1 * norm2)).item()
      
        similarity_percentage = round(similarity * 100, 2)
        
        return similarity_percentage
    
    except Exception as e:
        print(f"GPU Error: {e}. Falling back to CPU.")

        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([text1, text2])
        from sklearn.metrics.pairwise import cosine_similarity as sklearn_cosine
        
        similarity = sklearn_cosine(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        similarity_percentage = round(similarity * 100, 2)
        
        return similarity_percentage