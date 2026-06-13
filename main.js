 (function() {
      // المان‌ها
      const splashScreen = document.getElementById('splashScreen');
      const mainPage = document.getElementById('mainPage');
      const bgAudio = document.getElementById('bgMusic');
      const voiceAudio = document.getElementById('voiceMessage');
      const playPauseBtn = document.getElementById('playPauseBtn');
      const voiceBtn = document.getElementById('voiceMessageBtn');
      
      // وضعیت ویس
      let isVoicePlaying = false;
      
      // توابع پخش و توقف موزیک
      function playMusic() {
        bgAudio.play().catch(e => console.log("پخش موزیک:", e));
        playPauseBtn.innerHTML = '<span>🎶</span> در حال پخش...';
        playPauseBtn.style.background = "linear-gradient(135deg, #5fcb96, #2e8b57)";
      }
      
      function pauseMusic() {
        bgAudio.pause();
        playPauseBtn.innerHTML = '<span>🎵</span> پخش موزیک';
        playPauseBtn.style.background = "linear-gradient(135deg, #ff6b8f, #ff3a6e)";
      }
      
      // تابع ورود به صفحه اصلی
      let isEntered = false;
      
      function enterMainPage() {
        if (isEntered) return;
        isEntered = true;
        
        splashScreen.classList.add('hide');
        mainPage.classList.add('show');
        
        // ریست انیمیشن کارت
        const card = document.querySelector('.card');
        if (card) {
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = 'cardGlowIn 0.8s cubic-bezier(0.34, 1.2, 0.64, 1) forwards';
          }, 10);
        }
        
        playMusic();
        startFallingEmojis();
        startCounter();
        startTypeWriter();
      }
      
      // رویدادهای ورود
      document.getElementById('enterBtn').addEventListener('click', enterMainPage);
      splashScreen.addEventListener('click', (e) => {
        if (e.target === splashScreen || e.target.closest('.splash-content')) {
          enterMainPage();
        }
      });
      
      // ========== دکمه موزیک (با قطع کردن ویس) ==========
      playPauseBtn.addEventListener('click', () => {
        // اگه ویس در حال پخش بود، قطعش کن
        if (isVoicePlaying) {
          voiceAudio.pause();
          voiceAudio.currentTime = 0;
          isVoicePlaying = false;
          voiceBtn.innerHTML = '<span>🎤</span> پیام من';
          voiceBtn.style.background = "linear-gradient(135deg, #6c63ff, #3a2e8e)";
        }
        
        if (bgAudio.paused) {
          playMusic();
        } else {
          pauseMusic();
        }
      });
      
      // ========== دکمه ویس ==========
      voiceBtn.addEventListener('click', () => {
        if (isVoicePlaying) {
          // استپ کردن ویس
          voiceAudio.pause();
          voiceAudio.currentTime = 0;
          isVoicePlaying = false;
          voiceBtn.innerHTML = '<span>🎤</span> پیام من';
          voiceBtn.style.background = "linear-gradient(135deg, #6c63ff, #3a2e8e)";
        } else {
          // قطع کردن موزیک اگه در حال پخش بود
          if (!bgAudio.paused) {
            pauseMusic();
          }
          // پخش ویس
          voiceAudio.play().catch(e => console.log("خطا در پخش ویس:", e));
          isVoicePlaying = true;
          voiceBtn.innerHTML = '<span>⏹️</span> توقف پیام';
          voiceBtn.style.background = "linear-gradient(135deg, #ff4444, #aa2222)";
        }
      });
      
      // وقتی ویس تموم شد
      voiceAudio.addEventListener('ended', () => {
        isVoicePlaying = false;
        voiceBtn.innerHTML = '<span>🎤</span> پیام من';
        voiceBtn.style.background = "linear-gradient(135deg, #6c63ff, #3a2e8e)";
      });
      
      // ========== شمارشگر زمان ==========
      function startCounter() {
        const startDate = new Date(2025, 4, 29, 0, 0, 0);
        const timerEl = document.getElementById('timerDisplay');
        
        function updateCounter() {
          const now = new Date();
          const diff = now - startDate;
          if (diff < 0) {
            timerEl.innerText = 'به زودی آغاز می‌شه عزیزم 💕';
            return;
          }
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (86400000)) / 3600000);
          const minutes = Math.floor((diff % 3600000) / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          timerEl.innerText = `${days} روز، ${hours} ساعت، ${minutes} دقیقه، ${seconds} کنار هم بودیم 😉`;
        }
        
        updateCounter();
        setInterval(updateCounter, 1000);
      }
      
      // ========== ایموجی‌های در حال سقوط ==========
      function startFallingEmojis() {
        const emojisList = ['❤️', '💖', '💗', '💓', '💕', '💞', '💘', '✨', '⭐', '🌟', '🌙', '♥️', '❣️', '💝'];
        const container = document.getElementById('fallingContainer');
        const emojiCount = 70;
        
        function createFallingEmojis() {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          for (let i = 0; i < emojiCount; i++) {
            const emoji = document.createElement('div');
            emoji.classList.add('falling-emoji');
            emoji.textContent = emojisList[Math.floor(Math.random() * emojisList.length)];
            const size = 22 + Math.random() * 26;
            emoji.style.fontSize = `${size}px`;
            emoji.style.left = `${Math.random() * 100}%`;
            const duration = 6 + Math.random() * 10;
            emoji.style.animationDuration = `${duration}s`;
            emoji.style.animationDelay = `${Math.random() * 12}s`;
            emoji.style.opacity = 0.7 + Math.random() * 0.3;
            container.appendChild(emoji);
          }
        }
        
        createFallingEmojis();
        
        setInterval(() => {
          if (container.children.length < emojiCount + 20) {
            const emoji = document.createElement('div');
            emoji.classList.add('falling-emoji');
            emoji.textContent = emojisList[Math.floor(Math.random() * emojisList.length)];
            const size = 22 + Math.random() * 26;
            emoji.style.fontSize = `${size}px`;
            emoji.style.left = `${Math.random() * 100}%`;
            const duration = 6 + Math.random() * 10;
            emoji.style.animationDuration = `${duration}s`;
            container.appendChild(emoji);
            setTimeout(() => {
              if (emoji.parentNode) emoji.remove();
            }, duration * 1000);
          }
        }, 2000);
      }
      
      // ========== عکس پروفایل ==========
      const profileImg = document.getElementById('profileImg');
      if (profileImg) {
        profileImg.onerror = () => {
          profileImg.src = './phtest.png';
        };
      }
      
      // ========== تایپ‌رایتر ==========
      function startTypeWriter() {
        const messageEl = document.getElementById('loveMessage');
        const originalText = `
        محل قرار گرفتن متن مورد نظر شما با افکت خاص و قابلیت اسکرول
        `;
        
        messageEl.style.whiteSpace = "normal";
        messageEl.style.wordBreak = "break-word";
        messageEl.style.lineHeight = "1.9";
        messageEl.innerHTML = "";
        
        let idx = 0;
        function type() {
          if (idx < originalText.length) {
            messageEl.innerHTML += originalText.charAt(idx);
            idx++;
            setTimeout(type, 35);
          }
        }
        type();
      }
    })();