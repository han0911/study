function showLogin() {
  document.getElementById("loginModal").classList.add("active");
  document.getElementById("signupModal").classList.remove("active");
}

function showSignup() {
  document.getElementById("signupModal").classList.add("active");
  document.getElementById("loginModal").classList.remove("active");
}

function closeModal() {
  document.getElementById("loginModal").classList.remove("active");
  document.getElementById("signupModal").classList.remove("active");
}

function switchToSignup() {
  document.getElementById("loginModal").classList.remove("active");
  document.getElementById("signupModal").classList.add("active");
}

function switchToLogin() {
  document.getElementById("signupModal").classList.remove("active");
  document.getElementById("loginModal").classList.add("active");
}

// 모달 외부 클릭 시 닫기
document.getElementById("loginModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

document.getElementById("signupModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm").value;

  // 입력값 검증
  if (!name || !email || !password || !confirmPassword) {
    alert('잘못됨')
    return;
  }

  if (password !== confirmPassword) {
    alert('잘못됨')
    return;
  }

  if (password.length < 6) {
    alert('잘못됨')
    return;
  }

  // 중복 사용자 확인
  if (users.some((u) => u.name === name)) {
    alert('잘못됨')
    return;
  }
});
