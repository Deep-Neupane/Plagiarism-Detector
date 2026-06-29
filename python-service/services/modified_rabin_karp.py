def mrk(text1_tokens, text2_tokens, chunk_size=5):
    
    
    if len(text1_tokens) < chunk_size or len(text2_tokens) < chunk_size:
        return []
    
    text1_chunks = {}
    
    for i in range(len(text1_tokens) - chunk_size + 1):
        chunk_dicts = text1_tokens[i:i + chunk_size]
        chunk_words = tuple(d['token'] for d in chunk_dicts)
        
        start_pos = chunk_dicts[0]['start_char']
        end_pos = chunk_dicts[-1]['end_char']
        
        if chunk_words not in text1_chunks:
            text1_chunks[chunk_words] = []
        text1_chunks[chunk_words].append({
            'start_char': start_pos,
            'end_char': end_pos
        })
    
    matches = []
    
    for i in range(len(text2_tokens) - chunk_size + 1):
        chunk_dicts = text2_tokens[i:i + chunk_size]
        chunk_words = tuple(d['token'] for d in chunk_dicts)
        
        if chunk_words in text1_chunks:
            t2_start = chunk_dicts[0]['start_char']
            t2_end = chunk_dicts[-1]['end_char']
            
            for t1_pos in text1_chunks[chunk_words]:
                matches.append({
                    'matched_text': ' '.join(chunk_words),
                    'start_char_file1': t1_pos['start_char'],
                    'end_char_file1': t1_pos['end_char'],
                    'start_char_file2': t2_start,
                    'end_char_file2': t2_end
                })
    
    return matches