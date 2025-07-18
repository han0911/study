// 사용자 데이터 저장을 위한 배열 (실제 프로젝트에서는 서버/데이터베이스 사용)
let users = JSON.parse(localStorage.getItem("users")) || [];

// DOM 요소들
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginModal = document.getElementById("loginModal"); // 로그인 모달 요소 추가
const signupModal = document.getElementById("signupModal");
const submitBtn = document.getElementById("submitBtn");
const signupSubmitBtn = document.getElementById("signupSubmitBtn");



// 로그인 폼 제출 처리
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value;

  // 입력값 검증
  if (!name || !password) {
    showMessage("모든 필드를 입력해주세요.", "error");
    return;
  }

  // 로딩 상태 표시

  // 실제 환경에서는 서버에 요청을 보내야 함
  setTimeout(() => {
    // 사용자 인증 확인
    const user = users.find((u) => u.name === name && u.password === password);
    
  }, 1000);
});

// 회원가입 폼 제출 처리
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm").value;

  // 입력값 검증
  if (!name || !email || !password || !confirmPassword) {
    showMessage("모든 필드를 입력해주세요.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("비밀번호가 일치하지 않습니다.", "error");
    return;
  }

  if (password.length < 6) {
    showMessage("비밀번호는 6자 이상이어야 합니다.", "error");
    return;
  }

  // 중복 사용자 확인
  if (users.some((u) => u.name === name)) {
    showMessage("이미 존재하는 아이디입니다.", "error");
    return;
  }

  // 로딩 상태 표시
  showLoading(signupSubmitBtn, true);

  // 실제 환경에서는 서버에 요청을 보내야 함
  setTimeout(() => {
    // 새 사용자 추가
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showMessage("회원가입이 완료되었습니다!", "success");

    // 폼 초기화 및 모달 닫기
    setTimeout(() => {
      signupForm.reset();
      closeSignup();
      showLogin(); // 회원가입 후 로그인 모달 다시 표시 (선택 사항)
    }, 1000);

    showLoading(signupSubmitBtn, false);
  }, 1000);
});


// 로그인 모달 표시 함수
function showLogin() {
  loginModal.style.display = "flex";
  document.body.style.overflow = "hidden"; // 배경 스크롤 방지

  // 다른 모달이 열려있었다면 닫기 (예: 회원가입 모달이 열린 상태에서 로그인 모달을 열 때)
  if (signupModal.style.display === "flex") {
      signupModal.style.display = "none";
      signupForm.reset(); // 회원가입 폼 초기화
  }
}

// 로그인 모달 닫기 함수
function closeLogin() {
  loginModal.style.display = "none";
  document.body.style.overflow = "auto"; // 배경 스크롤 허용
  loginForm.reset(); // 로그인 폼 초기화
}

// 회원가입 모달 표시 함수
function showSignup() {
  signupModal.style.display = "flex";
  document.body.style.overflow = "hidden"; // 배경 스크롤 방지

  // 다른 모달이 열려있었다면 닫기 (예: 로그인 모달이 열린 상태에서 회원가입 모달을 열 때)
  if (loginModal.style.display === "flex") {
      loginModal.style.display = "none";
      loginForm.reset(); // 로그인 폼 초기화
  }
}

// 회원가입 모달 닫기 함수
function closeSignup() {
  signupModal.style.display = "none";
  document.body.style.overflow = "auto"; // 배경 스크롤 허용
  signupForm.reset(); // 회원가입 폼 초기화
}


// 모달 외부 클릭 시 닫기
document.addEventListener("click", function (e) {
  if (e.target === loginModal) { // 로그인 모달 외부 클릭 시
    closeLogin();
  } else if (e.target === signupModal) { // 회원가입 모달 외부 클릭 시
    closeSignup();
  }
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (loginModal.style.display === "flex") {
        closeLogin();
    } else if (signupModal.style.display === "flex") {
        closeSignup();
    }
  }
});

// 로딩 상태 표시 함수
function showLoading(button, isLoading, customText = null) {
  if (isLoading) {
    button.classList.add("loading");
    button.disabled = true;

    // 로딩 텍스트 결정
    let loadingText = customText;
    if (!loadingText) {
      loadingText = button.id === "submitBtn" ? "로그인 중" : "가입 중";
    }

    // 점점이 애니메이션을 위한 HTML 생성
    button.innerHTML = `
            <span class="loading-text">${loadingText}</span>
            <span class="loading-dots">
                <span class="dot">.</span>
                <span class="dot">.</span>
                <span class="dot">.</span>
            </span>
        `;

    // 로딩 애니메이션 시작
    startLoadingAnimation(button);
  } else {
    button.classList.remove("loading");
    button.disabled = false;
    button.innerHTML = button.id === "submitBtn" ? "시작하기" : "가입하기";
    clearInterval(button.loadingInterval);
  }
}

// 로딩 애니메이션 시작 함수
function startLoadingAnimation(button) {
  const dots = button.querySelectorAll(".dot");
  let currentDot = 0;

  // 초기 상태 설정
  dots.forEach((dot) => (dot.style.opacity = "0.3"));

  // 점점이 애니메이션
  button.loadingInterval = setInterval(() => {
    // 모든 점을 흐리게
    dots.forEach((dot) => (dot.style.opacity = "0.3"));

    // 현재 점을 밝게
    dots[currentDot].style.opacity = "1";

    // 다음 점으로 이동
    currentDot = (currentDot + 1) % dots.length;
  }, 500); // 0.5초마다 점 변경
}

// 메시지 표시 함수
function showMessage(message, type = "info") {
  // 기존 메시지 제거
  const existingMessage = document.querySelector(".message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // 메시지 요소 생성
  const messageDiv = document.createElement("div");
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;

  // 메시지 스타일 설정
  messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    `;

  // 타입별 색상 설정
  switch (type) {
    case "success":
      messageDiv.style.background = "linear-gradient(135deg, #00511E, #007A2E)";
      break;
    case "error":
      messageDiv.style.background = "linear-gradient(135deg, #dc2626, #ef4444)";
      break;
    case "info":
      messageDiv.style.background = "linear-gradient(135deg, #0891b2, #06b6d4)";
      break;
  }

  // 페이지에 추가
  document.body.appendChild(messageDiv);

  // 3초 후 제거
  setTimeout(() => {
    if (messageDiv && messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 3000);
}

// 애니메이션 스타일 추가 (이미 CSS 파일에 있으므로 여기서는 제거해도 무방)
// 다만, 동적으로 메시지 생성 시에는 필요할 수 있습니다.
// 현재는 dgswlogin.css에 @keyframes slideInRight, fadeOut 가 없으므로 여기에 유지합니다.
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .message {
        transition: all 0.3s ease;
    }
    
    .message:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
    }
    
    /* 로딩 상태 스타일 */
    .btn.loading {
        opacity: 0.8;
        cursor: not-allowed;
        position: relative;
    }
    
    .loading-text {
        display: inline-block;
        margin-right: 5px;
    }
    
    .loading-dots {
        display: inline-block;
        font-weight: bold;
        font-size: 1.2em;
        letter-spacing: 2px;
    }
    
    .loading-dots .dot {
        opacity: 0.3;
        transition: opacity 0.3s ease;
        display: inline-block;
    }
    
    /* 추가 로딩 효과 */
    .btn.loading::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        animation: shimmer 2s infinite;
        pointer-events: none;
    }
    
    /* 여기서 @keyframes shimmer 는 modal-form::before에 이미 정의되어 있고, 
       여기서 한 번 더 정의하면 충돌이 날 수 있습니다. 
       modal-form::before의 shimmer를 재활용하도록 할 것이므로, 
       아래의 shimmer keyframes는 제거합니다. */
    /* @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    } */
`;
document.head.appendChild(style);

// 입력 필드 실시간 검증
document
  .getElementById("signup-password")
  .addEventListener("input", function () {
    const password = this.value;
    const confirmPassword = document.getElementById("signup-confirm").value;

    if (password.length > 0 && password.length < 6) {
      this.style.borderColor = "#dc2626";
    } else {
      this.style.borderColor = "#e5e7eb";
    }

    if (confirmPassword.length > 0 && password !== confirmPassword) {
      document.getElementById("signup-confirm").style.borderColor = "#dc2626";
    } else {
      document.getElementById("signup-confirm").style.borderColor = "#e5e7eb";
    }
  });

document
  .getElementById("signup-confirm")
  .addEventListener("input", function () {
    const password = document.getElementById("signup-password").value;
    const confirmPassword = this.value;

    if (confirmPassword.length > 0 && password !== confirmPassword) {
      this.style.borderColor = "#dc2626";
    } else {
      this.style.borderColor = "#e5e7eb";
    }
  });

// 개발자 도구용 헬퍼 함수들은 이제 showLogin/closeLogin/showSignup/closeSignup으로 대체됩니다.
// 기존 showLoginModal, closeModal 함수는 더 이상 필요 없습니다.