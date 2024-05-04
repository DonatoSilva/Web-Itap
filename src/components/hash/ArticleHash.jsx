import React, { useEffect, useRef } from 'react';

function articleHash({ id, title, img = null, description, class: customClass, children }) {
  let truncatedDescription = description;
  if (description.length > 90) {
    truncatedDescription = description.slice(0, 90) + '...';
  }

  const idRef = useRef(id).current;

  const bottons = document.querySelectorAll(".BottonDespla");
  let nextBtn;
  let prevBtn;

  bottons.forEach((btn) => {
    const isClass = btn.classList.contains("rotate-180");

    if (isClass) {
      nextBtn = btn;
    } else {
      prevBtn = btn;
    }
  })

  const navHash = document.querySelector('.navHash');
  const navAs = navHash.querySelectorAll('a');
  const navAHash = navHash.querySelector(`.${idRef}`);

  const floatTitle = document.getElementById('floating')

  useEffect(() => {

    function isElementVisible(elementId) {
      const element = document.getElementById(elementId);

      if (!element) return false;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);

      return visibleHeight / rect.height >= 0.30;
    }

    function toggetherNoMore(btn, border) {
      if (navAHash.getAttribute('href') === border.getAttribute('href')) btn.classList.add('noMore');

      if (navAHash.getAttribute('href') !== border.getAttribute('href') && btn.classList.contains('noMore')) btn.classList.remove('noMore');
    }

    function verification() {
      const last = navAs[navAs.length - 1];
      const first = navAs[0];

      if (isElementVisible(id)) {
        navAHash.classList.add('view');
        floatTitle.textContent = navAHash.textContent;
        toggetherNoMore(nextBtn, last);
        toggetherNoMore(prevBtn, first);
      } else {
        if (navAHash.classList.contains('view')) {
          navAHash.classList.remove('view')
        }
      }
    }

    window.addEventListener('scroll', verification)

    return () => {
      window.removeEventListener('scroll', verification)
    }
  }, []);

  return (
    <article id={id} className={`${customClass} mb-12`}>
      <div>
        <h3 className="text-start text-3xl font-medium">{title}</h3>
        <span className="text-slate-800 text-sm font-extralight">{truncatedDescription}</span>
        <hr className="my-3 border-gray-400" />
      </div>
      <div>
        {img && <img src={img} alt={title} className="mx-auto max-h-[320px]" />}
        {children}
      </div>
    </article>
  );
}

export default articleHash;
