// --- 1. การจัดการเวลา (Timer) ---
const EXAM_MINUTES = 60; // ตั้งค่าเวลาสอบที่นี่
let totalSeconds = EXAM_MINUTES * 60;

const timerBox = document.getElementById('timer-box');
const timeLeftDisplay = document.getElementById('time-left');
const quizForm = document.getElementById('quiz-form');

function startTimer() {
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // แสดงผล 00:00
        timeLeftDisplay.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // เตือนเมื่อเหลือ 1 นาที
        if (totalSeconds <= 60) {
            timerBox.classList.add('timer-danger');
        }

        // เมื่อหมดเวลา
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("หมดเวลาแล้ว! ระบบจะส่งคำตอบอัตโนมัติ");

            // ปิดการบังคับทำทุกข้อ (required) เพื่อให้ส่งฟอร์มได้ทันที
            const inputs = quizForm.querySelectorAll('input[required]');
            inputs.forEach(input => input.removeAttribute('required'));

            quizForm.submit();
        }
        totalSeconds--;
    }, 1000);
}

// --- 2. การจัดการสีพื้นหลัง (Theme) ---
const bgInput = document.getElementById('bg-choice');

function initTheme() {
    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme) {
        document.body.style.backgroundColor = savedTheme;
        bgInput.value = savedTheme;
    }

    bgInput.addEventListener('input', (e) => {
        const color = e.target.value;
        document.body.style.backgroundColor = color;
        localStorage.setItem('userTheme', color);
    });
}

// เริ่มทำงานเมื่อโหลดหน้าสำเร็จ
window.onload = () => {
    startTimer();
    initTheme();
};
