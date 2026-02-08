from flask import Flask, render_template, request
from questions import questions

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', all_sets=questions)

@app.route('/quiz/<int:set_id>')
def quiz(set_id):
    selected_set = next((s for s in questions if s['set_id'] == set_id), None)
    if selected_set:
        return render_template('quiz.html', quiz_set=selected_set)
    return "ไม่พบชุดข้อสอบนี้", 404

@app.route('/submit', methods=['POST'])
def submit():
    set_id = int(request.form.get('set_id'))
    selected_set = next((s for s in questions if s['set_id'] == set_id), None)
    
    if not selected_set:
        return "เกิดข้อผิดพลาดในการดึงข้อมูล", 400

    score = 0
    total = len(selected_set['items'])
    results = []

    for item in selected_set['items']:
        user_ans = request.form.get(f"q_{item['id']}")
        is_correct = (user_ans == item['ans'])
        if is_correct:
            score += 1
        
        results.append({
            'q': item['q'],
            'user_ans': user_ans,
            'correct_ans': item['ans'],
            'is_correct': is_correct
        })

    # คำนวณเกณฑ์ผ่าน (60%)
    percentage = (score / total) * 100
    is_passed = percentage >= 60
    status = "ผ่านเกณฑ์" if is_passed else "ไม่ผ่านเกณฑ์"

    return render_template('result.html', 
                           score=score, 
                           total=total, 
                           results=results, 
                           status=status, 
                           is_passed=is_passed)

if __name__ == '__main__':
    app.run(debug=True)