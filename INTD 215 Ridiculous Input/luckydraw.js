document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const recentBox = document.querySelector('.recentdoc-box');
    const overlayWrapper = document.getElementById('doc-overlay');
    const rouletteDisplay = document.getElementById('roulette-display');
    const resultImage = document.getElementById('result-image');

    if (!recentBox || !overlayWrapper || !rouletteDisplay || !resultImage) {
        console.error('Required elements not found in the DOM');
        return;
    }

    let docs = [];
    let currentIndex = 0;
    let rouletteInterval = null;
    let autoStopTimer = null;
    let jumpTimer = null; 
    const ROULETTE_SPEED = 150;   
    const AUTO_STOP_DELAY = 3000; 

    function collectDocs() {
        const docItems = document.querySelectorAll('.recent-document, .recentdocument-other');
        const docsArray = [];
        docItems.forEach(item => {
            const labelElem = item.querySelector('.recentdocument-label');
            const imgElem = item.querySelector('.recentdocument-img');
            if (labelElem && imgElem) {
                const name = labelElem.textContent.trim();
                if (name) {
                    docsArray.push({
                        name: name,
                        imgSrc: imgElem.src
                    });
                }
            }
        });
        return docsArray;
    }

    function updateDisplay(index) {
        if (docs.length > 0) {
            const doc = docs[index];
            rouletteDisplay.textContent = `${doc.name}`;
            resultImage.src = doc.imgSrc;
            resultImage.style.display = 'block';
        } else {
            rouletteDisplay.textContent = 'documents not found';
            resultImage.style.display = 'none';
        }
    }
    if (jumpTimer) {
    clearTimeout(jumpTimer);
    jumpTimer = null;
   }
    function stopRoulette() {
    if (rouletteInterval) {
        clearInterval(rouletteInterval);
        rouletteInterval = null;
    }
    if (autoStopTimer) {
        clearTimeout(autoStopTimer);
        autoStopTimer = null;
    }

    if (docs.length > 0) {
        const doc = docs[currentIndex];
        const docName = encodeURIComponent(doc.name);
        const imgSrc = encodeURIComponent(doc.imgSrc);
        jumpTimer = setTimeout(() => {
            window.location.href = `document_1.html?doc=${docName}&img=${imgSrc}`;
        }, 1000);  
    } else {
        alert('no documents available');
    }
}
   
    function startRoulette() {
        if (rouletteInterval) clearInterval(rouletteInterval);
        if (autoStopTimer) clearTimeout(autoStopTimer);

        docs = collectDocs();
        if (docs.length === 0) {
            rouletteDisplay.textContent = 'no documents';
            resultImage.style.display = 'none';
            return;
        }

        currentIndex = Math.floor(Math.random() * docs.length);
        updateDisplay(currentIndex);

        rouletteInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % docs.length;
            updateDisplay(currentIndex);
        }, ROULETTE_SPEED);

        autoStopTimer = setTimeout(() => {
            stopRoulette();
        }, AUTO_STOP_DELAY);
    }

    function showOverlay() {
        startRoulette();
        overlayWrapper.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    recentBox.addEventListener('click', function(e) {
        const docItem = e.target.closest('.recent-document, .recentdocument-other');
        if (!docItem) return;
        e.preventDefault();
        showOverlay();
    });

    overlayWrapper.style.display = 'none';
});