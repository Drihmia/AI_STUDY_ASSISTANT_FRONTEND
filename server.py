from flask import Flask, request, jsonify ,make_response, Response
import google.generativeai as genai
import os
import time

# Configure Google Generative AI
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

# Flask App
app = Flask(__name__)

# Store history
history = []

def generate_stream(prompt):
    """Function to stream data chunk by chunk."""
    try:
        response_chunks = model.generate_content(prompt, stream=True)
        yield prompt + '\n\n'
        for chunk in response_chunks:
            # Yield each chunk to the client
            for char in chunk.text:
                for c in char:
                    yield c
                    # yield after 0.01 seconds
                    time.sleep(0.001)

    except Exception as e:
        yield f"Error: {str(e)}"

@app.route("/generate", methods=["POST"])
def generate():
    """Handle the POST request to generate content in chunks."""
    data = request.json
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    # Create a streaming response
    return Response(generate_stream(prompt), content_type="text/plain;charset=utf-8")

@app.route("/history", methods=["GET"])
def get_history():
    return jsonify(history)

if __name__ == "__main__":
    app.run(port=5002, debug=True)
