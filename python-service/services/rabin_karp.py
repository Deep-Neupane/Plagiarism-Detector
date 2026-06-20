def rabin_karp_similarity(text1_tokens, text2_tokens, chunk_size=5):
    
    if len(text1_tokens) == 0 or len(text2_tokens) == 0:
        return 0.0

    text1_chunks = set()
    for i in range(len(text1_tokens) - chunk_size + 1):
        chunk = tuple(text1_tokens[i:i + chunk_size])
        text1_chunks.add(chunk)

    matched_count = 0
    for i in range(len(text2_tokens) - chunk_size + 1):
        chunk = tuple(text2_tokens[i:i + chunk_size])
        if chunk in text1_chunks:
            matched_count += 1
    

    total_chunks = len(text2_tokens) - chunk_size + 1
    if total_chunks == 0:
        return 0.0
    
    similarity = (matched_count / total_chunks) * 100
    return round(similarity, 2)