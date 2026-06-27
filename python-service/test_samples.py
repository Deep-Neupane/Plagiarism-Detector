from services.preprocess import preprocess_text
from services.rabin_karp import rabin_karp_similarity
from services.tfidf import tfidf_similarity


with open('../backend/samples/file1.txt', 'r') as f:
    file1_content = f.read()

with open('../backend/samples/file2.txt', 'r') as f:
    file2_content = f.read()

with open('../backend/samples/file3.txt', 'r') as f:
    file3_content = f.read()


tokens1 = preprocess_text(file1_content)
tokens2 = preprocess_text(file2_content)
tokens3 = preprocess_text(file3_content)

print(f"File 1 tokens: {len(tokens1)}")
print(f"File 2 tokens: {len(tokens2)}")
print(f"File 3 tokens: {len(tokens3)}")


similarity_1_2 = tfidf_similarity(tokens1, tokens2)
similarity_1_3 = rabin_karp_similarity(tokens1, tokens3)
similarity_2_3 = tfidf_similarity(tokens2, tokens3)

print(f"\nFile1 vs File2: {similarity_1_2}%")
print(f"File1 vs File3: {similarity_1_3}%")
print(f"File2 vs File3: {similarity_2_3}%")

