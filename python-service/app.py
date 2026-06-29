from flask import Flask, request, jsonify
from flask_cors import CORS
from services.preprocess import preprocess_text
from services.rabin_karp import rabin_karp_similarity
from services.tfidf import tfidf_similarity
from services.combine_results import combine_results
from services.preprocess_for_matched import preprocess
from services.modified_rabin_karp import mrk

app = Flask(__name__)
CORS(app)






@app.route('/api/detect', methods=['POST'])
def detect_plagiarism():
    try:
        data=request.json
        files=data.get('files',[])

        if len(files)<2:
            return jsonify({'error': 'Need at least 2 files'}), 400
        
        preprocessed=[]
        for file in files:
            tokens=preprocess_text(file['content'])
            preprocessed.append({
                'filename':file['filename'],
                'tokens':tokens
            })
        
        results=[]
        for i in range(len(preprocessed)):
            for j in range(i+1,len(preprocessed)):
                file1=preprocessed[i]
                file2=preprocessed[j]

                rk_score=rabin_karp_similarity(file1['tokens'],file2['tokens'],chunk_size=3)
                tfidf_score=tfidf_similarity(file1['tokens'],file2['tokens'])

                final_score=combine_results(rk_score,tfidf_score)

                results.append({
                    'file1': file1['filename'],
                    'file2': file2['filename'],
                    'rabin_karp_percentage': rk_score,
                    'tfidf_percentage': tfidf_score,
                    'plagiarism_percentage': final_score
                })
        return jsonify({
            'success': True,
            'total_files': len(files),
            'comparisons': len(results),
            'results': results
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    

@app.route('/api/match',methods=['POST'])
def match():
    try:
        data=request.json
        text1=data.get("text1","")
        text2=data.get("text2","")
        token1,token1_data = preprocess(text1)
        token2,token2_data = preprocess(text2)
        positions = mrk(token1,token2)

        return jsonify({
            'success':True,
            'positions':positions
        })
        

        
        
    except Exception as e:
        return jsonify({'error':str(e)}),500



if __name__ == '__main__':
    app.run(port=5001, debug=True)