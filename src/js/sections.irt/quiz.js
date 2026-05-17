
/* global Swiper */

(() => {
  const quiz = document.querySelector("[data-quiz]");
  if (!quiz || typeof Swiper === "undefined") return;

  const swiperEl = quiz.querySelector("[data-quiz-swiper]");
  const nextBtn = quiz.querySelector("[data-quiz-next]");
  const backBtn = quiz.querySelector("[data-quiz-back]");
  const counter = quiz.querySelector("[data-quiz-counter]");
  const dots = [...quiz.querySelectorAll(".quiz-form__dot")];
  if (!swiperEl || !nextBtn) return;

  const slides = [...swiperEl.querySelectorAll(".swiper-slide")];
  const total = slides.length;

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 24,
    autoHeight: true,
    allowTouchMove: false,
    speed: 350,
  });

  const isAnswered = (index) => {
    const slide = slides[index];
    if (!slide) return false;
    if (slide.querySelector(".quiz-card__input:checked")) return true;
    const text = slide.querySelector(".quiz-textarea__field");
    if (text) return text.value.trim().length > 0;
    return false;
  };

  const isLast = () => swiper.activeIndex === total - 1;

  function render() {
    const index = swiper.activeIndex;

    if (counter) {
      const label = slides[index].dataset.quizLabel;
      counter.textContent = label || `Вопрос ${index + 1}`;
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle("quiz-form__dot--done", i < index);
      dot.classList.toggle("quiz-form__dot--current", i === index);
    });

    const activeDot = dots[index];
    if (activeDot && counter) {
      const track = activeDot.parentElement;
      const x = activeDot.offsetLeft + activeDot.offsetWidth / 2;
      track.style.setProperty("--step-x", `${x}px`);
    }

    quiz.classList.toggle("quiz-form--has-back", index > 0);

    const isContact = !!slides[index].querySelector("[data-quiz-submit]");
    quiz.classList.toggle("quiz-form--contact", isContact);

    if (isContact) {
      nextBtn.hidden = true;
      return;
    }
    nextBtn.hidden = false;

    const answered = isAnswered(index);
    nextBtn.disabled = !answered;
    nextBtn.classList.toggle("button--disabled", !answered);
    nextBtn.textContent = isLast() ? "Завершить" : "Далее";
  }

  swiperEl.addEventListener("change", (e) => {
    if (e.target.matches(".quiz-card__input")) render();
  });

  swiperEl.addEventListener("input", (e) => {
    if (e.target.matches(".quiz-textarea__field")) render();
  });

  nextBtn.addEventListener("click", () => {
    if (!isAnswered(swiper.activeIndex)) return;
    if (isLast()) {
      quiz.classList.add("quiz-form--done");
      return;
    }
    swiper.slideNext();
  });

  if (backBtn) {
    backBtn.addEventListener("click", () => swiper.slidePrev());
  }

  swiper.on("slideChange", render);
  render();
})();
