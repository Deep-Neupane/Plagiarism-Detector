def combine_results(rk_score,tfidf_score):
    final_score = rk_score*0.3+tfidf_score*0.7
    return round(final_score,2)